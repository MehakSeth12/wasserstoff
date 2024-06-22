
import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

interface WriteFileRequest {
    filename: string;
    content: string;
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' }); // Only allow POST requests
    }


    try {
        const data = await req.body; // Parse request body (assuming JSON)
        const { filename, content } = data as WriteFileRequest; // Type assertion for clarity

        if (!filename) {
            return res.status(400).json({ message: 'Missing required content' }); // Check for content
        }

        if (!content) {
            return res.status(400).json({ message: 'Missing required content' }); // Check for content
        }

        const filePath = `${process.cwd()}/public/files/` + filename;

        await fs.writeFile(filePath, content, 'utf-8'); // Write content to file

        res.status(200).json({ message: 'File written successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error writing file' }); // Generic error
    }
}

