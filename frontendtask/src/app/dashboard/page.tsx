// src/app/dashboard/Page.tsx
"use client"
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useEffect, useState } from 'react';

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";



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

    const handleOnChange = (newValue: string) => {
        setFileContent(newValue);
    }



    const saveFile = () => {

        if (selectedFile && selectedFile != "") {
            // Define types for the request options
            type RequestOptions = {
                method: string;
                headers: Headers;
                body: string;
                redirect: RequestRedirect;
            };

            // Create headers with type annotations
            const myHeaders: Headers = new Headers();
            myHeaders.append("Content-Type", "application/json");

            // Define the payload
            const raw: string = JSON.stringify({
                "filename": selectedFile,
                "content": fileContent
            });

            // Define request options with type annotations
            const requestOptions: RequestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow" as RequestRedirect
            };

            // Perform the fetch request
            fetch("/api/create-file", requestOptions)
                .then((response: Response) => response.text())
                .then((result: string) => console.log(result))
                .catch((error: any) => console.error(error));

        }
    };

    return (
        <div>
            <p>Dashboard Page</p>
            {selectedFile && <p>Selected File: {selectedFile}</p>}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={saveFile}>
                Save
            </button>
            <p>&nbsp;</p>
            {/* <textarea style={{width:"100%",border:"1px solid black",padding:"10px"}} value={fileContent} onChange={handleInputChange}/> */}
            <AceEditor mode="java" defaultValue={fileContent} value={fileContent} onChange={handleOnChange} theme="monokai"
                style={{ width: "100%", height: "700px" }} />
        </div>
    );
}
