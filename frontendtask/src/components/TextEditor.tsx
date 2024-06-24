// src/components/TextEditor.tsx
"use client"
import React from 'react';

interface TextEditorProps {
    content: string;
    onChange: (newValue: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ content, onChange }) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value);
    };

    return (
        <div>
            <textarea
                value={content}
                onChange={handleInputChange}
                className="w-full h-96 p-2 border rounded"
            />
        </div>
    );
};

export default TextEditor;
