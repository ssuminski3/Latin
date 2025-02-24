"use client";

import { useState, useEffect } from "react";
import '@/app/globals.css';
import Question from "../ui/question";
import { getFillerWords, getWord } from "../lib/get_data";
import { WordType } from "../lib/definitions";
import LoadingSpinner from "../ui/loadingSpinner";

export default function Home() {
    const [poprawny, setPoprawny] = useState<boolean | null>(null);
    const [goodAns, setGoodAns] = useState<WordType>();
    const [youAns, setYouAns] = useState("");
    const [odpowiedzi, setOdpowiedzi] = useState<string[]>([]);
    const [next, setNext] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    function shuffleArray(array: string[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const onAnswer = (selected: string) => {
        setYouAns(selected);
    }

    const checkAns = () => {
        setPoprawny(youAns == goodAns?.latin);
    }

    useEffect(() => {
        const fetchWords = async () => {
            setIsLoading(true);
            try {
                const goodA = await getWord();
                setGoodAns(goodA);
                const fetchedFiller: Array<{ latin: string }> = await getFillerWords(goodA);
                const latinWords: string[] = fetchedFiller.map(item => item.latin);
                latinWords.push(goodA.latin);
                setOdpowiedzi(shuffleArray(latinWords));
            } catch (error) {
                console.error("Error fetching words:", error);
            } finally {
                setIsLoading(false);
            }
        };
        setPoprawny(null);
        fetchWords();
    }, [next]);

    

    return (
        <div className="w-full h-screen p-1 m-auto flex justify-center items-center">
            <div className="m-auto text-center w-full max-w-2xl">
                <div className="lg:m-10 md:text-xl lg:text-3xl text-white rounded-3xl p-10 bg-gradient-to-r from-slate-900 to-slate-950">
                    {isLoading ? (
                        <LoadingSpinner />
                    ) : (
                        <>
                            <Question odpowiedzi={odpowiedzi} onAnswer={onAnswer} question={goodAns?.polish} />
                            {
                                (poprawny !== null) ? (
                                    <div>
                                        <p
                                            className={`lg:text-2xl md:text-lg lg:max-h-[50px] md:max-h-[100px] flex items-center justify-center ${poprawny
                                                ? 'text-lime-500'
                                                : 'text-red-600'
                                                }`}
                                        >
                                            {poprawny
                                                ? "Poprawna odpowiedź"
                                                : "Zła odpowiedź. Poprawna odpowiedź to: " + goodAns?.latin}
                                        </p>
                                        <button className="bg-green-800 p-1 m-5 rounded-3xl w-4/6 items-center" onClick={() => setNext(!next)}>Dalej</button>
                                    </div>
                                ) : <button className="bg-green-800 p-1 m-5 rounded-3xl w-4/6" onClick={checkAns}>Sprawdź</button>
                            }
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}