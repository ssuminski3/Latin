"use client";

import { useState } from "react";

export default function Home() {
    const [name] = useState("");
    const [numQuestions, setNumQuestions] = useState(0);
    const [timePerQuestion, setTimePerQuestion] = useState("");
    const [totalTime, setTotalTime] = useState("");
    const [isTotalTime, setIsTotalTime] = useState(true);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Implement the logic to handle form submission, like starting the quiz or saving settings
        console.log("Name:", name);
        console.log("Number of Questions:", numQuestions);
        if (isTotalTime) {
            console.log("Total Time:", totalTime, "seconds");
        } else {
            console.log("Time per Question:", timePerQuestion, "seconds");
        }
    };


    return (
        <div className="w-full h-full p-10 m-auto flex justify-center items-center">
            <div className="2xl:w-2/5 m-auto text-center">
                <form
                    onSubmit={handleFormSubmit}
                    className="max-lg:m-10 text-3xl sm:text-6xl text-white rounded-3xl p-10 sm:p-20 bg-gradient-to-r from-slate-900 to-slate-950"
                >
                    <label className="block text-white text-2xl mt-5">
                        Liczba pytań:
                    </label>
                    <input
                        type="number"
                        value={numQuestions}
                        onChange={(e) => {
                            const value = Number(e.target.value);
                            if (value >= 0) {
                                setNumQuestions(value);
                            } else {
                                setNumQuestions(0);
                            }
                        }}
                        className="bg-slate-500 m-5 rounded-3xl p-3 text-lg w-4/5"
                        placeholder="Wprowadź liczbę pytań"
                        required
                        min="0"
                    />

                    <div className="mt-5 mb-5">
                        <label className="block text-white text-2xl">
                            Ustaw czas:
                        </label>
                        <div className="flex justify-center items-center mt-2">
                            <label className="mr-5 text-xl">
                                <input
                                    type="radio"
                                    checked={isTotalTime}
                                    onChange={() => setIsTotalTime(true)}
                                    className="mr-2"
                                />
                                Całkowity czas
                            </label>
                            <label className="ml-5 text-xl">
                                <input
                                    type="radio"
                                    checked={!isTotalTime}
                                    onChange={() => setIsTotalTime(false)}
                                    className="mr-2"
                                />
                                Czas na pytanie
                            </label>
                        </div>
                    </div>

                    {isTotalTime ? (
                        <input
                            type="number"
                            value={totalTime}
                            onChange={(e) => setTotalTime(e.target.value)}
                            className="bg-slate-500 m-5 rounded-3xl p-3 text-lg w-4/5"
                            placeholder="Wprowadź całkowity czas w sekundach"
                            required
                        />
                    ) : (
                        <input
                            type="number"
                            value={timePerQuestion}
                            onChange={(e) => setTimePerQuestion(e.target.value)}
                            className="bg-slate-500 m-5 rounded-3xl p-3 text-lg w-4/5"
                            placeholder="Wprowadź czas na pytanie w sekundach"
                            required
                        />
                    )}

                    <button
                        type="submit"
                        className="bg-green-800 p-5 m-10 rounded-3xl w-4/6 text-2xl"
                    >
                        Wyświetl kod do dołączenia
                    </button>
                </form>
            </div>
        </div>
    );
}
