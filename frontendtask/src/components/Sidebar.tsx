// src/components/Sidebar.tsx
"use client"
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { setSelectedFile } from '../store/selectedFileSlice';

export default function Sidebar() {
    const [fileStructure, setFileStructure] = useState([]);
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

    return (
        <aside className="w-64 bg-gray-800 text-white p-4">
            <nav>
                <ul>
                    {fileStructure && fileStructure.length > 0 && fileStructure.map((item: any, index) => {
                        return (
                            <li
                                key={"side_" + index}
                                className="mb-4 cursor-pointer"
                                onClick={() => handleFileClick(item.name)}
                            >
                                {item.name} {item.type}
                            </li>
                        );
                    })}
                    <li className="mb-4">About</li>
                    <li className="mb-4">Services</li>
                </ul>
            </nav>
        </aside>
    );
}
