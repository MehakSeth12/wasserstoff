// src/app/dashboard/Page.tsx
"use client"
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function Dashboard() {
    const selectedFile = useSelector((state: RootState) => state.selectedFile.selectedFile);

    return (
        <div>
            <p>Dashboard Page</p>
            {selectedFile && <p>Selected File: {selectedFile}</p>}
        </div>
    );
}
