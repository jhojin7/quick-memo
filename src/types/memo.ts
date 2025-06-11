export interface Memo {
  id: string;
  content: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  color: string;
}

export type ViewMode = 'landing' | 'grid';