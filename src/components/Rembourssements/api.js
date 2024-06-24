import React from 'react';
import CommentSection from './CommentSection';

const app = () => {
  const commentsUrl = 'http://localhost:8000/api/v1/chargebacks/comments'; // Remplacez par l'URL correcte de votre API
  const currentUserId = '1'; // Remplacez par l'ID de l'utilisateur actuel

  return (
    <div className="App">
      <CommentSection commentsUrl={commentsUrl} currentUserId={currentUserId} />
    </div>
  );
};

export default app;
