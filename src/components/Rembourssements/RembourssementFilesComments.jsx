import React, { useState, useEffect } from 'react';
import axios from '../Axios';
import PropTypes from 'prop-types';
import { Menu, MenuItem, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import './RembourssementFilesComments.css'; // Ensure the path to the CSS file is correct

const CommentSection = ({ rembourssementId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedComment, setSelectedComment] = useState(null);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/rembourssement/${rembourssementId}/comments/`);
      setComments(response.data);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
      setErrorMessage('Failed to fetch comments');
    }
  };

  const handleAddComment = async () => {
    if (!newComment) return;

    try {
      await axios.post(
        `http://localhost:8000/api/v1/rembourssement/${rembourssementId}/comments/`,
        { text: newComment, rembourssement: rembourssementId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          }
        }
      );
      setNewComment('');
      fetchComments();
    } catch (error) {
      console.error('Failed to add comment:', error);
      setErrorMessage('Failed to add comment');
    }
  };

  const handleEditComment = async (comment) => {
    try {
      await axios.put(
        `http://localhost:8000/api/v1/rembourssement/comments/${comment.id}/`,
        { text: comment.text },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          }
        }
      );
      setEditingComment(null);
      fetchComments();
    } catch (error) {
      console.error('Failed to edit comment:', error);
      setErrorMessage('Failed to edit comment');
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/rembourssement/comments/${commentId}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        }
      });
      fetchComments();
    } catch (error) {
      console.error('Failed to delete comment:', error);
      setErrorMessage('Failed to delete comment');
    }
  };

  const handleLikeComment = async (commentId) => {
    try {
      const comment = comments.find(comment => comment.id === commentId);
      const newLikes = comment.likes === 0 ? 1 : 0;

      await axios.post(
        `http://localhost:8000/api/v1/comments/${commentId}/like/`,
        { likes: newLikes },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          }
        }
      );
      // Update the local state to reflect the new like count
      setComments(comments.map(comment =>
        comment.id === commentId ? { ...comment, likes: newLikes } : comment
      ));
    } catch (error) {
      console.error('Failed to like comment:', error);
    }
  };

  const startEditing = (comment) => {
    setEditingComment(comment);
    setNewComment(comment.text);
    setAnchorEl(null); // Close the menu
  };

  const cancelEditing = () => {
    setEditingComment(null);
    setNewComment('');
  };

  const handleMenuClick = (event, comment) => {
    setAnchorEl(event.currentTarget);
    setSelectedComment(comment);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedComment(null);
  };

  useEffect(() => {
    fetchComments();
  }, [rembourssementId]);

  return (
    <div className="comment-section">
      <h3 className="h33">Commentaires</h3>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <div className="comment-input">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Vos avis !"
        />
        <button onClick={editingComment ? () => handleEditComment({ ...editingComment, text: newComment }) : handleAddComment}>
          {editingComment ? 'Mettre à jour' : 'Poster'}
        </button>
        {editingComment && <button onClick={cancelEditing}>Annuler</button>}
      </div>
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <div className="comment-text">
              <strong>{comment.first_name} {comment.last_name}</strong>: {comment.text}
              <div className="comment-date">Published on: {new Date(comment.created_at).toLocaleString()}</div>
            </div>
            <div className="comment-actions">
              <IconButton onClick={() => handleLikeComment(comment.id)}>
                <ThumbUpIcon className="like-icon"/>
              </IconButton>
              <span>{comment.likes}</span> {/* Display the number of likes */}
              <IconButton onClick={(event) => handleMenuClick(event, comment)}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl && selectedComment === comment)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => startEditing(comment)}>Modifier</MenuItem>
                <MenuItem onClick={() => handleDeleteComment(comment.id)}>Supprimer</MenuItem>
              </Menu>
            </div>
            {comment.replies && comment.replies.length > 0 && (
              <div className="replies">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="comment reply">
                    <div className="comment-text">
                      <strong>{reply.first_name} {reply.last_name}</strong>: {reply.text}
                      <div className="comment-date">Published on: {new Date(reply.created_at).toLocaleString()}</div>
                    </div>
                    <div className="comment-actions">
                      <IconButton onClick={() => handleLikeComment(reply.id)}>
                        <ThumbUpIcon className="like-icon"/>
                      </IconButton>
                      <span>{reply.likes}</span> {/* Display the number of likes */}
                      <IconButton onClick={(event) => handleMenuClick(event, reply)}>
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl && selectedComment === reply)}
                        onClose={handleMenuClose}
                      >
                        <MenuItem onClick={() => startEditing(reply)}>Modifier</MenuItem>
                        <MenuItem onClick={() => handleDeleteComment(reply.id)}>Supprimer</MenuItem>
                      </Menu>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

CommentSection.propTypes = {
  rembourssementId: PropTypes.string.isRequired,
};

export default CommentSection;
