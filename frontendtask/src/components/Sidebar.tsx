// src/components/Sidebar.tsx
"use client"
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { setSelectedFile } from '../store/selectedFileSlice';
import NewFileModal from './NewFileModal'; // Import the new modal component

export default function Sidebar() {
    const [fileStructure, setFileStructure] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/get-file');
            const data = await response.json();
            if (data) {
                if (data.props && data.props.files) {
                    setFileStructure(data.props.files);
                }
            }
            console.log(data);
        };

        fetchData();
    }, []);

    const handleFileClick = (fileName: string) => {
        dispatch(setSelectedFile(fileName));
    };

    const handleNewFileClick = () => {
        setIsModalOpen(true);
    };

    return (
        <aside className="w-64 bg-gray-800 text-white p-4">
            <nav>
                <ul>
                    <li className="mb-4">List of Files</li>
                    {fileStructure && fileStructure.length > 0 && fileStructure.map((item: any, index) => {
                        return (
                            <li
                                key={"side_" + index}
                                className="pl-2 mb-4 cursor-pointer"
                                onClick={() => handleFileClick(item.name)}
                            >
                                {item.name}
                            </li>
                        );
                    })}
                    <li>
                        <button
                            onClick={handleNewFileClick}
                            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Create New File
                        </button>
                    </li>
                </ul>
            </nav>
            {isModalOpen && <NewFileModal onClose={() => setIsModalOpen(false)} />}
        </aside>
    );
}
