import { Worker, Job } from 'bullmq';
import { redisConnection } from '../lib/queue';
import { generateQuestionPaper } from '../services/aiService';
import Assignment from '../models/Assignment';
import { notifyAssignmentUpdate } from '../lib/websocket';
import { redisClient } from '../lib/queue';

export const startWorker = () => {
  const worker = new Worker(
    'assignment-generation',
    async (job: Job) => {
      const { assignmentId } = job.data;

      console.log(`Processing job ${job.id} for assignment ${assignmentId}`);

      // Update status to processing
      await Assignment.findByIdAndUpdate(assignmentId, { status: 'processing', jobId: job.id });
      notifyAssignmentUpdate(assignmentId, { status: 'processing', progress: 10 });

      // Fetch assignment
      const assignment = await Assignment.findById(assignmentId);
      if (!assignment) throw new Error('Assignment not found');

      notifyAssignmentUpdate(assignmentId, { status: 'processing', progress: 30, message: 'Generating questions...' });

      // Generate paper
      const generatedPaper = await generateQuestionPaper({
        title: assignment.title,
        subject: assignment.subject,
        className: assignment.className,
        questionTypes: assignment.questionTypes,
        totalQuestions: assignment.totalQuestions,
        totalMarks: assignment.totalMarks,
        difficulty: assignment.difficulty,
        additionalInstructions: assignment.additionalInstructions,
        fileContent: assignment.fileContent,
      });

      notifyAssignmentUpdate(assignmentId, { status: 'processing', progress: 80, message: 'Saving results...' });

      // Save result
      await Assignment.findByIdAndUpdate(assignmentId, {
        status: 'completed',
        generatedPaper,
      });

      // Cache result in Redis
      await redisClient.setEx(
        `assignment:${assignmentId}:paper`,
        3600,
        JSON.stringify(generatedPaper)
      );

      notifyAssignmentUpdate(assignmentId, {
        status: 'completed',
        progress: 100,
        message: 'Question paper ready!',
      });

      return { success: true, assignmentId };
    },
    {
      connection: redisConnection,
      concurrency: 3,
    }
  );

  worker.on('completed', (job) => {
    console.log(`Job ${job.id} completed`);
  });

  worker.on('failed', async (job, err) => {
    console.error(`Job ${job?.id} failed:`, err.message);
    if (job?.data?.assignmentId) {
      await Assignment.findByIdAndUpdate(job.data.assignmentId, {
        status: 'failed',
        error: err.message,
      });
      notifyAssignmentUpdate(job.data.assignmentId, {
        status: 'failed',
        error: err.message,
      });
    }
  });

  console.log('Worker started');
  return worker;
};
