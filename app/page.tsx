"use client";

import { useRef, useState, useEffect } from "react";
import Panel from "./ui/panel";
import { Contestant } from "./lib/definitions";
import Ranking from "./ui/ranking";

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
  const [rankingSize, setRankingSize] = useState(10)

  const rankingRef = useRef<HTMLDivElement | null>(null);
  
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  function checkOverflow(el: HTMLElement | null) {
    if (!el) {
      console.error("Element is not defined");
      return false; // or handle the case as needed
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

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setRankingSize(10)
    if (rankingRef.current) {
      const overflowExists = checkOverflow(rankingRef.current);
      if (overflowExists) {
        console.log("Overflow detected");
        setRankingSize(n => n-1)
      } else {
        console.log("No overflow detected");
      }
    }
  }, [contestants, windowSize]); // Run effect when contestants change or window size changes

  return (
    <div className="w-full h-full p-10 2xl:flex m-auto">
      <div className="lg:grid grid-cols-2 grid-rows-2 2xl:w-3/5 sm:h-full 2xl:gap-10 md:gap-5 m-auto">
        <Panel>Fiszki</Panel>
        <Panel>Konkurs</Panel>
        <Panel>Ćwiczenie</Panel>
        <Panel>Konkurs ogólny</Panel>
      </div>
      <div
        ref={rankingRef}
        className="text-6xl text-white rounded-3xl p-10 bg-gradient-to-r from-slate-900 to-slate-950 2xl:w-1/3 m-auto h-full max-2xl:m-10"
      >
        Ranking
        <Ranking contestants={contestants} size={rankingSize}/>
      </div>
    </div>
  );
}
