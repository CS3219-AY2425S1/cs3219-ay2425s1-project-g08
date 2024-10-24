import { Category } from "./Category";

export interface Question {
  id: string;
  title: string;
  description: string;
  complexity: string;
  // categories: string[];
  categories: Category[];
}

export const emptyQuestion: Question = {
  id: "",
  title: "",
  description: "",
  complexity: "",
  categories: [],
};
