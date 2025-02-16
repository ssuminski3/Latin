"use client";

import { useRef, useState, useEffect } from "react";
import '@/app/globals.css';
//import Question from "@/app/ui/question";

export default function Home() {
    // Timer state
    const [timeLeft, setTimeLeft] = useState(10); // Set initial time in seconds (e.g., 10 seconds)
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Start the timer
        timerRef.current = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        // Cleanup timer on component unmount
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    // Function to reset the timer (optional)
    const resetTimer = () => {
        setTimeLeft(10); // Reset to initial time
    };

    return (
        <div className="w-full h-full p-10 m-auto flex justify-center items-center ">
            <div className="2xl:w-2/5 m-auto text-center">
                <div className="max-lg:m-10 text-3xl sm:text-6xl text-white rounded-3xl p-10 sm:p-20 bg-gradient-to-r from-slate-900 to-slate-950">

                    {/* Display the timer */}
                    <div className="text-2xl text-red-500 mb-5">
                        Time left: {timeLeft}s
                    </div>
                    
                    {/*<Question />*/}

                    <button 
                        className="bg-green-800 p-5 m-10 rounded-3xl w-4/6"
                        onClick={resetTimer} // Optional: resets the timer
                        disabled={timeLeft === 0} // Disable button if time is up
                    >
                        Dalej
                    </button>
                </div>
            </div>
        </div>
    );
}
