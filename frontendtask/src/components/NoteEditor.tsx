// src/components/NoteEditor.tsx
"use client"
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

interface NoteEditorProps {
    content: string;
    onChange: (newValue: string) => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ content, onChange }) => {
    const handleEditorChange = (content: string) => {
        onChange(content);
    };

    return (
        <ReactQuill
            value={content}
            onChange={handleEditorChange}
            theme="snow"
            style={{ height: '700px', marginBottom: '50px' }}
        />
    );
};

export default NoteEditor;
