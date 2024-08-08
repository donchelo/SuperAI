import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

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

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('/api/comments');
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, []);

  const addComment = async (comment: Comment) => {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
      });
      if (response.ok) {
        const newComment = await response.json();
        setComments((prevComments) => [...prevComments, newComment]);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const updateComment = async (id: number, updatedComment: Partial<Comment>) => {
    try {
      const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedComment),
      });
      if (response.ok) {
        const updated = await response.json();
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === id ? { ...comment, ...updatedComment } : comment
          )
        );
      }
    } catch (error) {
      console.error('Error updating comment:', error);
    }
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
