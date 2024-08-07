import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface Comment {
  id: number;
  type: 'sugerencia' | 'bug';
  feedback: string;
  rating?: number | null;
  urgent?: boolean;
  status: 'abierto' | 'cerrado';
}

interface CommentContextProps {
  comments: Comment[];
  addComment: (comment: Comment) => void;
  updateComment: (id: number, updatedComment: Partial<Comment>) => void;
}

interface CommentProviderProps {
  children: ReactNode;
}

const CommentContext = createContext<CommentContextProps | undefined>(undefined);

export const CommentProvider: React.FC<CommentProviderProps> = ({ children }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const addComment = (comment: Comment) => {
    setComments((prevComments) => [...prevComments, comment]);
  };

  const updateComment = (id: number, updatedComment: Partial<Comment>) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id ? { ...comment, ...updatedComment } : comment
      )
    );
  };

  return (
    <CommentContext.Provider value={{ comments, addComment, updateComment }}>
      {children}
    </CommentContext.Provider>
  );
};

export const useComments = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error('useComments must be used within a CommentProvider');
  }
  return context;
};
