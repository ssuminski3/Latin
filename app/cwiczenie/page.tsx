"use client";

import { useState } from "react";
import '@/app/globals.css';
import Question from "../ui/question";

export default function Home() {
    const [poprawny] = useState<boolean | null>(true); // Initialize as null
    //const odpowiedzi: string[] = ["Ona", "On", "Ono", "vf", "jff"];

    return (
        <div className="w-full h-full p-1 m-auto flex justify-center items-center">
            <div className="m-auto text-center w-full max-w-2xl"> {/* Fixed max-width */}
                <div className="max-lg:m-10 text-3xl text-white rounded-3xl p-10 bg-gradient-to-r from-slate-900 to-slate-950">
                    <Question />
                    <p
                        className={`p-10 text-2xl min-h-[100px] flex items-center justify-center ${ // Fixed height for text container
                            poprawny === null
                                ? 'text-transparent' // Hide text when null
                                : poprawny
                                ? 'text-lime-500'
                                : 'text-red-600'
                        }`}
                    >
                        {poprawny !== null
                            ? poprawny
                                ? "Poprawna odpowiedź"
                                : "Zła odpowiedź. Poprawna odpowiedź to: "
                            : " " // Placeholder to maintain space
                        }
                    </p>

                    <button className="bg-green-800 p-1 m-10 rounded-3xl w-4/6">Dalej</button>
                </div>
            </div>
        </div>
    );
}