"use client";

import { useState } from "react";
import '@/app/globals.css'
import Question from "../ui/question";

export default function Home() {
    const [poprawny, setPoprawny] = useState(true)
    const odpowiedzi: string[] = [
        "Ona", "On", "Ono", "vf", "jff", "hid", "jf", "hduof", "ff", "oik"
    ]
    return (
        <div className="w-full h-full p-10 m-auto flex justify-center items-center ">
            <div className="2xl:w-2/5 m-auto text-center">
                <div className="max-lg:m-10 text-3xl sm:text-6xl text-white rounded-3xl p-10 sm:p-20 bg-gradient-to-r from-slate-900 to-slate-950">
                    <Question />
                    <p className={`text-2xl ${poprawny ? 'text-lime-500' : 'text-red-600'}`}>
                        {poprawny !== null
                            ? (poprawny ? "Poprawna odpowiedź" : "Zła odpowiedź. Poprawna odpowiedź to: ")
                            : null
                        }
                    </p>

                    <button className="bg-green-800 p-5 m-10 rounded-3xl w-4/6">Dalej</button>
                </div>
            </div>
        </div>
    );
}
