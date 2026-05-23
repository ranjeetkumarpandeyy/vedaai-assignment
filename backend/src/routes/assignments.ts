import { Router } from 'express';
import { body } from 'express-validator';
import multer from 'multer';
import {
  createAssignment,
  getAssignments,
  getAssignment,
  regenerateAssignment,
  deleteAssignment,
} from '../controllers/assignmentController';

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype === 'text/plain') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and text files allowed'));
    }
  },
});

const createValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('subject').notEmpty().withMessage('Subject is required'),
  body('className').notEmpty().withMessage('Class is required'),
  body('dueDate').isISO8601().withMessage('Valid due date required'),
  body('questionTypes').notEmpty().withMessage('Question types required'),
  body('totalQuestions').isInt({ min: 1, max: 100 }).withMessage('Questions must be 1-100'),
  body('totalMarks').isInt({ min: 1, max: 500 }).withMessage('Marks must be 1-500'),
];

router.get('/', getAssignments);
router.post('/', upload.single('file'), createValidation, createAssignment);
router.get('/:id', getAssignment);
router.post('/:id/regenerate', regenerateAssignment);
router.delete('/:id', deleteAssignment);

export default router;
