//import { LessonSection } from "./types";

interface NestError {
  response: {
    data: {
      message: string;
    };
  };
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  fullName?: string;
  role: string; // UserRole
  gender: string; //Gender
  birthDate: Date;
  introduction?: string;
}

interface Lesson {
  _id: string;
  title: string;
  introduction;
  description: string;
}

interface LessonComment {
  _id: string;
  writer: User;
  lesson: Lesson | string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface TestQuestion {
  _id: string;
  lesson: Lesson | string;
  question: string;
  meaning: string;
  options: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface TestQuestionResult {
  _id: string;
  lesson: Lesson | string;
  user: User | string;
  questionNumber: number;
  score: number;
  createdAt: Date;
  updatedAt: Date;
}

interface Window {
  ethereum: any;
}

//NOTE: 以下はver2で追加した型

interface LessonTest {
  section: LessonSection;
  unit: number;
  questions: Array<LessonTestQuestion>;
}

interface LessonTestQuestion {
  id: number;
  orderText?: string;
  answerForView?: string;
  question: string;
  answer: string;
  datas: Array<{
    data: {
      word: string;
      dummy?: boolean;
    };
  }>;
}

interface LessonTestResult {
  _id: string;
  section: LessonSection;
  unit: number;
  score: number;
  user: User;
  misses: Array<number>;
  createdAt: Date;
  updatedAt: Date;
}
