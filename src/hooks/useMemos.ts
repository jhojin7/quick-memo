import { useState, useEffect } from 'react';
import { Memo } from '../types/memo';

const STORAGE_KEY = 'memo-app-memos';

const MEMO_COLORS = [
  'bg-yellow-100 border-yellow-200',
  'bg-blue-100 border-blue-200',
  'bg-green-100 border-green-200',
  'bg-purple-100 border-purple-200',
  'bg-pink-100 border-pink-200',
  'bg-indigo-100 border-indigo-200',
];

export function useMemos() {
  const [memos, setMemos] = useState<Memo[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const memosWithDates = parsed.map((memo: any) => ({
          ...memo,
          createdAt: new Date(memo.createdAt),
          updatedAt: new Date(memo.updatedAt),
        }));
        setMemos(memosWithDates);
      } catch (error) {
        console.error('Failed to parse stored memos:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memos));
  }, [memos]);

  const addMemo = (content: string, title: string = '') => {
    const newMemo: Memo = {
      id: crypto.randomUUID(),
      content,
      title: title || content.split('\n')[0].substring(0, 50) || 'Untitled',
      createdAt: new Date(),
      updatedAt: new Date(),
      color: MEMO_COLORS[Math.floor(Math.random() * MEMO_COLORS.length)],
    };
    setMemos(prev => [newMemo, ...prev]);
    return newMemo;
  };

  const updateMemo = (id: string, updates: Partial<Pick<Memo, 'content' | 'title'>>) => {
    setMemos(prev => prev.map(memo => 
      memo.id === id 
        ? { 
            ...memo, 
            ...updates, 
            title: updates.title || updates.content?.split('\n')[0].substring(0, 50) || memo.title,
            updatedAt: new Date() 
          }
        : memo
    ));
  };

  const deleteMemo = (id: string) => {
    setMemos(prev => prev.filter(memo => memo.id !== id));
  };

  const searchMemos = (query: string) => {
    if (!query.trim()) return memos;
    const lowercaseQuery = query.toLowerCase();
    return memos.filter(memo =>
      memo.title.toLowerCase().includes(lowercaseQuery) ||
      memo.content.toLowerCase().includes(lowercaseQuery)
    );
  };

  return {
    memos,
    addMemo,
    updateMemo,
    deleteMemo,
    searchMemos,
  };
}