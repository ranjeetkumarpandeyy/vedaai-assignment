import axios from 'axios';
import { IGeneratedPaper } from '../models/Assignment';

interface GenerationParams {
  title: string;
  subject: string;
  className: string;
  questionTypes: string[];
  totalQuestions: number;
  totalMarks: number;
  difficulty: string;
  additionalInstructions?: string;
  fileContent?: string;
}

const buildPrompt = (params: GenerationParams): string => {
  const {
    title, subject, className, questionTypes, totalQuestions,
    totalMarks, difficulty, additionalInstructions, fileContent,
  } = params;

  return `You are an expert educator creating a formal exam question paper.

Assignment Details:
- Title: ${title}
- Subject: ${subject}
- Class: ${className}
- Question Types: ${questionTypes.join(', ')}
- Total Questions: ${totalQuestions}
- Total Marks: ${totalMarks}
- Difficulty: ${difficulty}
${additionalInstructions ? `- Additional Instructions: ${additionalInstructions}` : ''}
${fileContent ? `\nReference Content:\n${fileContent.substring(0, 3000)}` : ''}

Generate a complete, well-structured exam paper. Return ONLY valid JSON (no markdown, no extra text) in this exact format:
{
  "schoolName": "Delhi Public School",
  "subject": "${subject}",
  "className": "${className}",
  "totalMarks": ${totalMarks},
  "duration": 60,
  "sections": [
    {
      "title": "Section A",
      "instruction": "Attempt all questions. Each question carries 1 mark.",
      "questions": [
        {
          "id": "A1",
          "text": "Question text here",
          "difficulty": "easy",
          "marks": 1,
          "type": "mcq",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "answer": "Option A"
        }
      ]
    }
  ],
  "answerKey": [
    {
      "title": "Answer Key - Section A",
      "instruction": "Model answers",
      "questions": [
        {
          "id": "A1",
          "text": "Question text here",
          "difficulty": "easy",
          "marks": 1,
          "type": "mcq",
          "answer": "Option A"
        }
      ]
    }
  ]
}

Rules:
1. Distribute questions across sections logically (Section A: objective, Section B: short answer, Section C: long answer)
2. Mark distribution must total exactly ${totalMarks} marks
3. Use exactly ${totalQuestions} questions
4. Mix difficulty levels appropriately for "${difficulty}" setting
5. Make questions academically rigorous and appropriate for ${className}
6. Include only question types from: ${questionTypes.join(', ')}`;
};

export const generateQuestionPaper = async (params: GenerationParams): Promise<IGeneratedPaper> => {
  const prompt = buildPrompt(params);
  const provider = process.env.AI_PROVIDER || 'anthropic';

  let responseText: string;

  if (provider === 'anthropic') {
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-opus-4-5',
        max_tokens: 4096,
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json',
        },
      }
    );
    responseText = response.data.content[0].text;
  } else {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4-turbo-preview',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    responseText = response.data.choices[0].message.content;
  }

  // Clean and parse JSON
  const cleaned = responseText.replace(/```json\n?|\n?```/g, '').trim();
  const paper: IGeneratedPaper = JSON.parse(cleaned);

  return paper;
};
