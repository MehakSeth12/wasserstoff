
import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

interface GetParameters {
    filename?: string;
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { filename } = req.query as GetParameters; // Type assertion for clarity

    // Handle cases where parameters are missing
    if (!filename) {
        res.status(400).json({ message: 'Missing required parameters' });
        return;
    }

    try {

    const filePath = `${process.cwd()}/public/files/` + filename;

    const message = await fs.readFile(filePath, 'utf-8'); // Read as UTF-8 encoded text
    
    res.status(200).json({ message });
    }catch(error){
        res.status(500).json({ message: 'Error reading file' });
    }
}

