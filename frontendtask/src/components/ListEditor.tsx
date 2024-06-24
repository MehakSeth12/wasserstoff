// src/components/ListEditor.tsx
"use client"
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface ListItem {
    id: string;
    content: string;
}

interface ListEditorProps {
    content: string;
    onChange: (newValue: string) => void;
}

const ListEditor: React.FC<ListEditorProps> = ({ content, onChange }) => {
    const initialItems: ListItem[] = content.split('\n').map((item, index) => ({
        id: `item-${index}`,
        content: item.trim(), // Trim to remove extra whitespace
    }));

    const [items, setItems] = useState<ListItem[]>(initialItems);

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const newItems = Array.from(items);
        const [reorderedItem] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, reorderedItem);
        setItems(newItems);
        onChange(newItems.map(item => item.content).join('\n'));
    };

    const handleInputChange = (index: number, newContent: string) => {
        const newItems = items.map((item, i) => (i === index ? { ...item, content: newContent.trim() } : item));
        setItems(newItems);
        onChange(newItems.map(item => item.content).join('\n'));
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="bg-gray-100 p-4 rounded">
                        {items.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="p-2 mb-2 border rounded bg-white flex items-center justify-between"
                                    >
                                        <input
                                            type="text"
                                            value={item.content}
                                            onChange={(e) => handleInputChange(index, e.target.value)}
                                            className="flex-grow p-2 border rounded"
                                        />
                                        <span {...provided.dragHandleProps} className="ml-2 cursor-move">
                                            &#x2630; {/* Unicode for drag handle */}
                                        </span>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default ListEditor;
