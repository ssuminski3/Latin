"use client";

import { useRef, useState, useEffect } from "react";
import { Contestant } from "@/app/lib/definitions";
import Ranking from "@/app/ui/ranking";

export default function Home() {
  const [contestants, setContestants] = useState<Contestant[]>([
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
  const [rankingSize, setRankingSize] = useState(10);
  const rankingRef = useRef<HTMLDivElement | null>(null);

  // Timer state
  const [timeLeft, setTimeLeft] = useState(60); // Timer starts at 60 seconds

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  function checkOverflow(el: HTMLElement | null) {
    if (!el) {
      console.error("Element is not defined");
      return false;
    }

    const curOverflow = el.style.overflow;

    if (!curOverflow || curOverflow === "visible") {
      el.style.overflow = "hidden";
    }

    const isOverflowing =
      el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;

    el.style.overflow = curOverflow;

    return isOverflowing;
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setRankingSize(10);
    if (rankingRef.current) {
      const overflowExists = checkOverflow(rankingRef.current);
      if (overflowExists) {
        console.log("Overflow detected");
        setRankingSize((n) => n - 1);
      } else {
        console.log("No overflow detected");
      }
    }
  }, [contestants, windowSize]);

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
        ref={rankingRef}
        className="text-6xl 2xl:w-3/5 text-white rounded-3xl p-10 bg-gradient-to-r from-slate-900 to-slate-950 m-auto h-full max-2xl:m-10"
      >
        <div>Ranking</div>
        <Ranking contestants={contestants} size={rankingSize} />
        <div className="text-6xl mt-5 w-full text-center">
          {timeLeft > 0 ? `Time left: ${timeLeft}s` : "Time's up!"}
        </div>
      </div>
    </div>
  );
}
