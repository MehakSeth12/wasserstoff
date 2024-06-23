// src/components/NewFileModal.tsx
import { useState } from "react";

interface NewFileModalProps {
    onClose: () => void;
}

const NewFileModal: React.FC<NewFileModalProps> = ({ onClose }) => {
    const [filename, setFilename] = useState('');
    const [content, setContent] = useState('');

    const handleSave = async () => {
        const response = await fetch('/api/create-file', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ filename, content }),
        });

        if (response.ok) {
            onClose();
        } else {
            console.error('Failed to create file');
        }
    };

    return (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded shadow-lg w-1/3">
                <h2 className="text-lg mb-4">Create New File</h2>
                <div className="mb-4">
                    <label className="block mb-2">Filename</label>
                    <input
                        type="text"
                        value={filename}
                        onChange={(e) => setFilename(e.target.value)}
                        className="w-full p-2 border rounded text-black"
                        placeholder="Enter filename (e.g., file.txt)"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-2 border rounded text-black"
                        rows={4}
                        placeholder="Enter file content"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewFileModal;
