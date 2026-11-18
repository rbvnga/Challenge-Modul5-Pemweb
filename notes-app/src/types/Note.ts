export interface Note {
  id: number;
  title: string;
  content: string;
  category: string;
  done: boolean;
}

export const CATEGORIES = ["Kuliah", "Pribadi", "Kerja"];