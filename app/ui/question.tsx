"use client";

import '@/app/globals.css'
import { useState } from 'react';

interface QuestionProps {
    odpowiedzi: string[];
    onAnswer?: (selected: string) => void;
    question?: string;
}

export default function Question({ odpowiedzi, onAnswer, question }: QuestionProps) {
    const [selected, setSelected] = useState<string>('');

    const handleChange = (answer: string) => {
        setSelected(answer);
        onAnswer?.(answer);
    };

    return (
        <div>
            <p>{question}</p>
            <div className="text-left contain w-full">
                {odpowiedzi.map((e: string, index: number) => (
                    <label className="contain m-10" key={e + index}>
                        <p className="text-xl">{e}</p>
                        <input 
                            type="radio" 
                            name="radio" 
                            checked={selected === e}
                            onChange={() => handleChange(e)}
                        />
                        <span className="checkmark"></span>
                    </label>
                ))}
            </div>
        </div>
    );
}
