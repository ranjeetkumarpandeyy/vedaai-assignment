import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Assignment from '../models/Assignment';
import { assignmentQueue } from '../lib/queue';
import { redisClient } from '../lib/queue';

export const createAssignment = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      title, subject, className, dueDate, questionTypes,
      totalQuestions, totalMarks, difficulty, additionalInstructions,
    } = req.body;

    let fileContent: string | undefined;
    if (req.file) {
      fileContent = req.file.buffer.toString('utf-8');
    }

    const assignment = new Assignment({
      title,
      subject,
      className,
      dueDate: new Date(dueDate),
      questionTypes: Array.isArray(questionTypes) ? questionTypes : [questionTypes],
      totalQuestions: parseInt(totalQuestions),
      totalMarks: parseInt(totalMarks),
      difficulty: difficulty || 'mixed',
      additionalInstructions,
      fileContent,
      status: 'pending',
    });

    await assignment.save();

    // Add to queue
    const job = await assignmentQueue.add(
      'generate',
      { assignmentId: assignment._id.toString() },
      { jobId: `assignment-${assignment._id}` }
    );

    await Assignment.findByIdAndUpdate(assignment._id, { jobId: job.id });

    return res.status(201).json({
      success: true,
      assignment: {
        _id: assignment._id,
        title: assignment.title,
        subject: assignment.subject,
        status: assignment.status,
        createdAt: assignment.createdAt,
      },
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAssignments = async (req: Request, res: Response) => {
  try {
    const assignments = await Assignment.find()
      .select('-generatedPaper -fileContent')
      .sort({ createdAt: -1 })
      .limit(50);

    return res.json({ success: true, assignments });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAssignment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check cache first
    const cached = await redisClient.get(`assignment:${id}:paper`);

    const assignment = await Assignment.findById(id).select('-fileContent');
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    if (cached && assignment.status === 'completed') {
      assignment.generatedPaper = JSON.parse(cached);
    }

    return res.json({ success: true, assignment });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const regenerateAssignment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const assignment = await Assignment.findById(id);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    await Assignment.findByIdAndUpdate(id, {
      status: 'pending',
      generatedPaper: undefined,
      error: undefined,
    });

    // Delete cache
    await redisClient.del(`assignment:${id}:paper`);

    const job = await assignmentQueue.add(
      'generate',
      { assignmentId: id },
      { jobId: `assignment-${id}-regen-${Date.now()}` }
    );

    return res.json({ success: true, jobId: job.id });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteAssignment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Assignment.findByIdAndDelete(id);
    await redisClient.del(`assignment:${id}:paper`);
    return res.json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
