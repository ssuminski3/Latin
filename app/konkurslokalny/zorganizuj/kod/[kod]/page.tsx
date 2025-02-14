"use client";

import { useState, useEffect } from "react";
import { Contestant } from "@/app/lib/definitions";
import Ranking from "@/app/ui/ranking";

export default function Home() {
  const [contestants] = useState<Contestant[]>([
    { name: "Alice", score: 95 },
    { name: "Bob", score: 85 },
    { name: "Charlie", score: 90 },
    { name: "Diana", score: 88 },
    { name: "Eve", score: 80 },
    { name: "Frank", score: 92 },
    { name: "Grace", score: 78 },
    { name: "Hannah", score: 84 },
    { name: "Ivy", score: 76 },
    { name: "Jack", score: 91 },
  ]);

  // Timer state
  const [timeLeft, setTimeLeft] = useState(60); // Timer starts at 60 seconds

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId); // Clear interval on component unmount
    }
  }, [timeLeft]);

  return (
    <div className="w-full h-full p-10 2xl:flex m-auto">
      <div
        className="text-6xl 2xl:w-3/5 text-white rounded-3xl p-10 bg-gradient-to-r from-slate-900 to-slate-950 m-auto h-full max-2xl:m-10"
      >
        <div>Ranking</div>
        <Ranking contestants={contestants} />
        <div className="text-6xl mt-5 w-full text-center">
          {timeLeft > 0 ? `Time left: ${timeLeft}s` : "Time's up!"}
        </div>
      </div>
    </div>
  );
}
