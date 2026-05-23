import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestion {
  id: string;
  text: string;
  difficulty: 'easy' | 'medium' | 'hard';
  marks: number;
  type: 'mcq' | 'short_answer' | 'long_answer' | 'true_false' | 'fill_blank';
  options?: string[];
  answer?: string;
}

export interface ISection {
  title: string;
  instruction: string;
  questions: IQuestion[];
}

export interface IGeneratedPaper {
  schoolName: string;
  subject: string;
  className: string;
  totalMarks: number;
  duration: number;
  sections: ISection[];
  answerKey?: ISection[];
}

export interface IAssignment extends Document {
  title: string;
  subject: string;
  className: string;
  dueDate: Date;
  questionTypes: string[];
  totalQuestions: number;
  totalMarks: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
  additionalInstructions?: string;
  fileContent?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  generatedPaper?: IGeneratedPaper;
  jobId?: string;
  error?: string;
  createdAt: Date;
  updatedAt: Date;
}

const QuestionSchema = new Schema<IQuestion>({
  id: { type: String, required: true },
  text: { type: String, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  marks: { type: Number, required: true },
  type: { type: String, enum: ['mcq', 'short_answer', 'long_answer', 'true_false', 'fill_blank'], required: true },
  options: [String],
  answer: String,
});

const SectionSchema = new Schema<ISection>({
  title: { type: String, required: true },
  instruction: { type: String, required: true },
  questions: [QuestionSchema],
});

const AssignmentSchema = new Schema<IAssignment>(
  {
    title: { type: String, required: true },
    subject: { type: String, required: true },
    className: { type: String, required: true },
    dueDate: { type: Date, required: true },
    questionTypes: [{ type: String }],
    totalQuestions: { type: Number, required: true, min: 1 },
    totalMarks: { type: Number, required: true, min: 1 },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard', 'mixed'], default: 'mixed' },
    additionalInstructions: String,
    fileContent: String,
    status: { type: String, enum: ['pending', 'processing', 'completed', 'failed'], default: 'pending' },
    generatedPaper: {
      schoolName: String,
      subject: String,
      className: String,
      totalMarks: Number,
      duration: Number,
      sections: [SectionSchema],
      answerKey: [SectionSchema],
    },
    jobId: String,
    error: String,
  },
  { timestamps: true }
);

export default mongoose.model<IAssignment>('Assignment', AssignmentSchema);
