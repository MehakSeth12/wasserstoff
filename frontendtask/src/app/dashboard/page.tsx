// src/app/dashboard/Page.tsx
"use client"
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useEffect, useState } from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import NoteEditor from '../../components/NoteEditor';
import ListEditor from '../../components/ListEditor';
import ReadmeViewer from '../../components/ReadmeViewer';
import TextEditor from '../../components/TextEditor'; // Import the TextEditor component

export default function Dashboard() {
    const selectedFile = useSelector((state: RootState) => state.selectedFile.selectedFile);
    const [fileContent, setFileContent] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            if (selectedFile && selectedFile !== "") {
                const response = await fetch('/api/get-file-content?filename=' + selectedFile);
                const data = await response.json();
                if (typeof (data.message) !== "undefined") {
                    setFileContent(data.message);
                }
            }
        };

        fetchData();
    }, [selectedFile]);

    const handleOnChange = (newValue: string) => {
        setFileContent(newValue);
    };

    const saveFile = () => {
        if (selectedFile && selectedFile !== "") {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "filename": selectedFile,
                "content": fileContent
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow" as RequestRedirect
            };

            fetch("/api/create-file", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.error(error));
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
            {selectedFile?.endsWith('.note') ? (
                <NoteEditor content={fileContent} onChange={handleOnChange} />
            ) : selectedFile?.endsWith('.ed') ? (
                <AceEditor
                    mode="java"
                    defaultValue={fileContent}
                    value={fileContent}
                    onChange={handleOnChange}
                    theme="monokai"
                    style={{ width: "100%", height: "700px" }}
                />
            ) : selectedFile?.endsWith('.it') ? (
                <ListEditor content={fileContent} onChange={handleOnChange} />
            ) : selectedFile?.endsWith('.readme') ? (
                <ReadmeViewer content={fileContent} />
            ) : selectedFile?.endsWith('.txt') ? (
                <TextEditor content={fileContent} onChange={handleOnChange} />
            ) : null}
        </div>
    );
}
