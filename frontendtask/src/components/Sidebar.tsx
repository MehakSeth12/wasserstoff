"use client"
import { useEffect, useState } from "react";

export default function Sidebar() {
    const [fileStructure, setFileStructure] = useState([]);

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

    return (
        <aside className="w-64 bg-gray-800 text-white p-4">
            <nav>
                <ul>
                    {fileStructure && fileStructure.length > 0 && fileStructure.map((item:any, index) => {
                        return <li key={"side_" + index} className="mb-4">
                            {item.name} {item.type}
                        </li>
                    })}

                    <li className="mb-4">
                        About
                    </li>
                    <li className="mb-4">
                        Services
                    </li>
                    <li className="mb-4">

                    </li>
                </ul>
            </nav>
        </aside>
    )
}