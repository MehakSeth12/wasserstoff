// src/app/dashboard/Page.tsx
"use client"
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useEffect, useState } from 'react';



export default function Dashboard() {
    const selectedFile = useSelector((state: RootState) => state.selectedFile.selectedFile);
    const [fileContent, setFileContent] = useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFileContent(event.target.value); // Update state with new content
    };

    useEffect(() => {
        const fetchData = async () => {
            if (selectedFile && selectedFile != "") {
                const response = await fetch('/api/get-file-content?filename=' + selectedFile);
                const data = await response.json();
                console.log(data);
                if (typeof (data.message) !== "undefined") {
                    console.log("Reached here...")
                    setFileContent(data.message);
                }
            }
        };

        fetchData();
    }, [selectedFile]);

    return (
        <div>
            <p>Dashboard Page</p>
            {selectedFile && <p>Selected File: {selectedFile}</p>}
            <textarea style={{width:"100%",border:"1px solid black",padding:"10px"}} value={fileContent} onChange={handleInputChange}/>
        </div>
    );
}
