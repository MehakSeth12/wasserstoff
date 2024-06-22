
import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

interface FileInfo {
    name: string;
    type: 'directory' | 'file';
}

export async function getStaticProps(): Promise<{ props: { files: FileInfo[] } }> {
    const appDir = `${process.cwd()}/public/files`;
    const files = await getFiles(appDir);

    return {
        props: { files },
    };
}

async function getFiles(dir: string): Promise<FileInfo[]> {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    const files: FileInfo[] = [];

    for (const dirent of dirents) {
        const fullPath = `${dir}/${dirent.name}`;
        if (dirent.isDirectory()) {
            files.push({ name: dirent.name, type: 'directory' });
            files.push(...await getFiles(fullPath));
        } else {
            files.push({ name: dirent.name, type: 'file' });
        }
    }

    return files;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const details = await getStaticProps();
    console.log(details);
    res.status(200).json(details);
}

export default handler;
