export interface Question {
  id: string;
  title: string;
  description: string;
  complexity: string;
  categories: string[];
}

export const emptyQuestion: Question = {
  id: "",
  title: "",
  description: "",
  complexity: "",
  categories: []
}
