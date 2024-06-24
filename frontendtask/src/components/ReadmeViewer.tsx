// src/components/ReadmeViewer.tsx
import React from 'react';
import Markdown from 'markdown-to-jsx';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';


interface ReadmeViewerProps {
    content: string;
}

const ReadmeViewer: React.FC<ReadmeViewerProps> = ({ content }) => {
    return (
        <div>
            <Markdown
                options={{
                    overrides: {
                        code: {
                            component: ({ className, children }: any) => {
                                const language = className ? className.split('-')[1] : '';
                                return (
                                    <SyntaxHighlighter language={language} style={okaidia}>
                                        {children}
                                    </SyntaxHighlighter>
                                );
                            },
                        },
                    },
                }}
            >
                {content}
            </Markdown>
        </div>
    );
};

export default ReadmeViewer;
