import React, { useState } from 'react';
import { CommentSection } from 'react-comments-section';
import 'react-comments-section/dist/index.css';

const AdvancedCommentComponent = ({ comments = [], user = {}, handleCreateComment }) => {
  const [data] = useState(comments);

  const handleSubmit = (comment) => {
    const values = {
      message: comment.text
    };
    handleCreateComment(values);
  };

  const handleEdit = (comment) => {
    console.log(comment, 'comment..');
  };
  const handleReply = (comment) => {
    console.log(comment, 'comment..');
  };
  const handleDelete = (comment) => {
    console.log(comment, 'comment..');
  };

  return (
    <div style={{ width: '100%' }}>
      <CommentSection
        onEditAction={handleEdit}
        onReplyAction={handleReply}
        onDeleteAction={handleDelete}
        onSubmitAction={handleSubmit}
        currentUser={{
          currentUserId: user.id || '',
          currentUserImg: user.img || '',
          currentUserProfile: user.email || '',
          currentUserFullName: user.username || 'Anonymous'
        }}
        hrStyle={{ border: '0.5px solid #ff0072' }}
        commentData={data}
        logIn={{
          loginLink: 'http://localhost:3001/',
          signupLink: 'http://localhost:3001/'
        }}
        customImg={user.img}
        inputStyle={{ border: '1px solid rgb(208, 208, 208)' }}
        formStyle={{ backgroundColor: 'white' }}
        submitBtnStyle={{
          border: '1px solid black',
          backgroundColor: 'black',
          padding: '7px 15px'
        }}
        cancelBtnStyle={{
          border: '1px solid gray',
          backgroundColor: 'gray',
          color: 'white',
          padding: '7px 15px'
        }}
        advancedInput={true}
        replyInputStyle={{ borderBottom: '1px solid black', color: 'black' }}
      />
    </div>
  );
};

export default AdvancedCommentComponent;
