import React, { useState, useEffect } from 'react';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import { styles } from '../../styles';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const RichTextEditor = ({ name, onContentChange }) => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  useEffect(() => {
    const contentHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    onContentChange(contentHtml);
  }, [editorState, onContentChange]);

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  return (
    <div
      className={`bg-${styles.primary} dark:bg-${styles.white}-900 text-${styles.secondary} dark:text-${styles.primary} rounded-lg shadow-md p-4`}
    >
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
        placeholder="Write something here..."
      />
      <textarea
        disabled
        name={name}
        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        className={`mt-2 block w-full bg-${styles.main}-100 dark:bg-${styles.main}-800 text-sm text-${styles.main}-800 dark:text-${styles.main}-200 rounded-md border border-${styles.main}-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-2 px-3`}
      ></textarea>
    </div>
  );
};

export default RichTextEditor;
