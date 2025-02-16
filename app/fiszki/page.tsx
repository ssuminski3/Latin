"use client";

import Fiszka from "../ui/fiszka";
import ProgressBar from "../ui/progressBar";
import { getAllWordsRandom } from '../lib/get_data';
import { useEffect, useState } from "react";
import { WordType } from "../lib/definitions";

export default function Home() {
    const [words, setWords] = useState<WordType[]>([]); // All words
    const [good, setGood] = useState<number[]>([]);
    const [ok, setOk] = useState<number[]>([]);
    const [bad, setBad] = useState<number[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchWords = async () => {
            try {
                const fetchedWords = await getAllWordsRandom();
                setWords(fetchedWords);
            } catch (error) {
                console.error("Error fetching words:", error);
            }
        };

        fetchWords();
    }, []);

    const handleWordResponse = (response: 'good' | 'ok' | 'bad') => {
        switch (response) {
            case 'good':
                setGood(prev => [...prev.filter(item => item !== currentIndex), currentIndex]);
                setOk(prev => prev.filter(item => item !== currentIndex));
                setBad(prev => prev.filter(item => item !== currentIndex));
                break;
            case 'ok':
                setOk(prev => [...prev.filter(item => item !== currentIndex), currentIndex]);
                setGood(prev => prev.filter(item => item !== currentIndex));
                setBad(prev => prev.filter(item => item !== currentIndex));
                break;
            case 'bad':
                setBad(prev => [...prev.filter(item => item !== currentIndex), currentIndex]);
                setGood(prev => prev.filter(item => item !== currentIndex));
                setOk(prev => prev.filter(item => item !== currentIndex));
                break;
        }

        setCurrentIndex(prevIndex => {
            if (prevIndex >= words.length - 1) {
                return 0;
            }
            return prevIndex + 1;
        });
    };

    // Don't render until words are loaded
    if (words.length === 0) {
        return <div>Loading...</div>;
    }

    const currentWord = words[currentIndex];
    const rand = Math.round(Math.random()*100)%2 == 1
    return (
        <div className="w-full h-screen p-4 sm:p-6 md:p-8 lg:p-10 m-auto">
            <div className="w-full sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-2/5 m-auto text-center h-full">
                <ProgressBar good={good.length} ok={ok.length} bad={bad.length} />
                <Fiszka verse={rand?currentWord.latin:currentWord.polish} reverse={!rand?currentWord.latin:currentWord.polish} />
                <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-2 justify-center mt-6">
                    <button
                        onClick={() => handleWordResponse('good')}
                        className="text-white text-lg sm:text-xl bg-green-600 p-2 rounded-3xl w-full sm:w-1/3"
                    >
                        Zapamiętany
                    </button>
                    <button
                        onClick={() => handleWordResponse('ok')}
                        className="text-white text-lg sm:text-xl bg-yellow-600 p-2 rounded-3xl w-full sm:w-1/3"
                    >
                        Muszę poćwiczyć
                    </button>
                    <button
                        onClick={() => handleWordResponse('bad')}
                        className="text-white text-lg sm:text-xl bg-red-600 p-2 rounded-3xl w-full sm:w-1/3"
                    >
                        Nie Zapamiętany
                    </button>
                </div>
            </div>
        </div>
    );
}