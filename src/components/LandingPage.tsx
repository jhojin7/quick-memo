import React, { useState, useRef, useEffect } from 'react';
import { PenTool, Grid3X3, Sparkles, Zap } from 'lucide-react';
import { useMemos } from '../hooks/useMemos';
import { ViewMode } from '../types/memo';

interface LandingPageProps {
  onViewChange: (mode: ViewMode) => void;
}

export function LandingPage({ onViewChange }: LandingPageProps) {
  const [content, setContent] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const { addMemo, memos } = useMemos();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-focus the textarea when component mounts
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsCreating(true);
    await new Promise(resolve => setTimeout(resolve, 300)); // Small delay for animation
    
    addMemo(content);
    setContent('');
    setIsCreating(false);
    
    // Show success feedback and refocus
    const button = document.getElementById('create-memo-btn');
    if (button) {
      button.classList.add('animate-pulse');
      setTimeout(() => {
        button.classList.remove('animate-pulse');
        // Refocus textarea after saving
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }, 600);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-5"></div>
        <div className="relative px-6 py-8">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                <PenTool className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">QuickMemo</h1>
                <p className="text-sm text-gray-600">Capture thoughts instantly</p>
              </div>
            </div>
            
            <button
              onClick={() => onViewChange('grid')}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Grid3X3 className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700 font-medium">View All ({memos.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Sparkles className="w-8 h-8 text-indigo-500" />
            <h2 className="text-4xl font-bold text-gray-900">Quick & Simple</h2>
            <Sparkles className="w-8 h-8 text-purple-500" />
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Jot down your thoughts, ideas, and reminders instantly. No friction, just pure focus on what matters.
          </p>
        </div>

        {/* Memo Creation Form */}
        <form onSubmit={handleSubmit} className="relative">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl">
            <div className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <div className="flex-1"></div>
                <Zap className="w-5 h-5 text-gray-400" />
              </div>
              
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="What's on your mind? Start typing..."
                className="w-full h-48 resize-none border-0 text-lg text-gray-800 placeholder-gray-400 focus:outline-none leading-relaxed"
                style={{ fontFamily: 'inherit' }}
              />
            </div>
            
            <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center space-x-1">
                  <kbd className="px-2 py-1 bg-white border border-gray-200 rounded text-xs">⌘</kbd>
                  <span>+</span>
                  <kbd className="px-2 py-1 bg-white border border-gray-200 rounded text-xs">Enter</kbd>
                  <span>to save</span>
                </span>
              </div>
              
              <button
                id="create-memo-btn"
                type="submit"
                disabled={!content.trim() || isCreating}
                className={`
                  flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200
                  ${content.trim() && !isCreating
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-xl hover:from-indigo-600 hover:to-purple-700 transform hover:-translate-y-0.5'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                {isCreating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <PenTool className="w-4 h-4" />
                    <span>Save Memo</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Recent Activity */}
        {memos.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900">Recent Activity</h3>
              <button
                onClick={() => onViewChange('grid')}
                className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200"
              >
                View all →
              </button>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {memos.slice(0, 3).map((memo) => (
                <div
                  key={memo.id}
                  className={`${memo.color} p-6 rounded-xl border-2 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer transform hover:-translate-y-1`}
                  onClick={() => onViewChange('grid')}
                >
                  <h4 className="font-semibold text-gray-800 mb-2 truncate">{memo.title}</h4>
                  <p className="text-gray-600 text-sm line-clamp-3">{memo.content}</p>
                  <div className="mt-4 text-xs text-gray-500">
                    {memo.createdAt.toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}