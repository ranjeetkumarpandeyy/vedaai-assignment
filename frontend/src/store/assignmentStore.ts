import { create } from 'zustand';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface Question {
  id: string;
  text: string;
  difficulty: 'easy' | 'medium' | 'hard';
  marks: number;
  type: string;
  options?: string[];
  answer?: string;
}

export interface Section {
  title: string;
  instruction: string;
  questions: Question[];
}

export interface GeneratedPaper {
  schoolName: string;
  subject: string;
  className: string;
  totalMarks: number;
  duration: number;
  sections: Section[];
  answerKey?: Section[];
}

export interface Assignment {
  _id: string;
  title: string;
  subject: string;
  className: string;
  dueDate: string;
  questionTypes: string[];
  totalQuestions: number;
  totalMarks: number;
  difficulty: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  generatedPaper?: GeneratedPaper;
  error?: string;
  createdAt: string;
}

export interface CreateAssignmentData {
  title: string;
  subject: string;
  className: string;
  dueDate: string;
  questionTypes: string[];
  totalQuestions: number;
  totalMarks: number;
  difficulty: string;
  additionalInstructions?: string;
  file?: File;
}

interface AssignmentState {
  assignments: Assignment[];
  currentAssignment: Assignment | null;
  loading: boolean;
  creating: boolean;
  error: string | null;
  wsProgress: number;
  wsMessage: string;
  fetchAssignments: () => Promise<void>;
  fetchAssignment: (id: string) => Promise<void>;
  createAssignment: (data: CreateAssignmentData) => Promise<Assignment>;
  regenerateAssignment: (id: string) => Promise<void>;
  deleteAssignment: (id: string) => Promise<void>;
  updateAssignmentStatus: (id: string, status: string, data?: Partial<Assignment>) => void;
  setWsProgress: (progress: number, message?: string) => void;
  clearError: () => void;
}

export const useAssignmentStore = create<AssignmentState>((set, get) => ({
  assignments: [],
  currentAssignment: null,
  loading: false,
  creating: false,
  error: null,
  wsProgress: 0,
  wsMessage: '',

  fetchAssignments: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get(`${API_URL}/api/assignments`);
      set({ assignments: data.assignments, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  fetchAssignment: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get(`${API_URL}/api/assignments/${id}`);
      set({ currentAssignment: data.assignment, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  createAssignment: async (formData: CreateAssignmentData) => {
    set({ creating: true, error: null });
    try {
      const fd = new FormData();
      fd.append('title', formData.title);
      fd.append('subject', formData.subject);
      fd.append('className', formData.className);
      fd.append('dueDate', formData.dueDate);
      formData.questionTypes.forEach((qt) => fd.append('questionTypes', qt));
      fd.append('totalQuestions', formData.totalQuestions.toString());
      fd.append('totalMarks', formData.totalMarks.toString());
      fd.append('difficulty', formData.difficulty);
      if (formData.additionalInstructions) {
        fd.append('additionalInstructions', formData.additionalInstructions);
      }
      if (formData.file) {
        fd.append('file', formData.file);
      }

      const { data } = await axios.post(`${API_URL}/api/assignments`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { assignments } = get();
      set({
        assignments: [data.assignment, ...assignments],
        creating: false,
      });

      return data.assignment;
    } catch (err: any) {
      set({ error: err.response?.data?.error || err.message, creating: false });
      throw err;
    }
  },

  regenerateAssignment: async (id: string) => {
    try {
      await axios.post(`${API_URL}/api/assignments/${id}/regenerate`);
      get().updateAssignmentStatus(id, 'pending');
      set({ wsProgress: 0, wsMessage: '' });
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  deleteAssignment: async (id: string) => {
    try {
      await axios.delete(`${API_URL}/api/assignments/${id}`);
      const { assignments } = get();
      set({ assignments: assignments.filter((a) => a._id !== id) });
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  updateAssignmentStatus: (id: string, status: string, data?: Partial<Assignment>) => {
    const { assignments, currentAssignment } = get();
    set({
      assignments: assignments.map((a) =>
        a._id === id ? { ...a, status: status as Assignment['status'], ...data } : a
      ),
      currentAssignment:
        currentAssignment?._id === id
          ? { ...currentAssignment, status: status as Assignment['status'], ...data }
          : currentAssignment,
    });
  },

  setWsProgress: (progress: number, message = '') => {
    set({ wsProgress: progress, wsMessage: message });
  },

  clearError: () => set({ error: null }),
}));
