import React, { useRef, useState } from "react";
import { Contestant } from "../lib/definitions";

type RankingProps = {
  contestants: Contestant[];
};

export default function Ranking({ contestants }: RankingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [maxItems] = useState(10);

  // Sort contestants and take top 10
  const sortedContestants = [...contestants].sort((a, b) => b.score - a.score);
  const topTen = sortedContestants.slice(0, 10);

  return (
    <div
      ref={containerRef}
      className="w-full h-full text-lg text-white overflow-hidden"
    >
      <div className="flex justify-between p-1 text-sm">
        <span className="w-1/3">Miejsce</span>
        <span className="w-1/3">Wynik</span>
        <span className="w-1/3">Ososby z tym samym wynikiem</span>
      </div>
      <hr className="border-t border-gray-600 my-1" />
      {topTen.slice(0, maxItems).map((contestant, index) => {
        let placeColor = "";
        switch (index) {
          case 0:
            placeColor = "bg-yellow-500 rounded-2xl"; // Gold
            break;
          case 1:
            placeColor = "bg-gray-400 rounded-2xl"; // Silver
            break;
          case 2:
            placeColor = "bg-amber-500 rounded-2xl"; // Bronze
            break;
          default:
            placeColor = "text-white";
        }

        return (
          <div key={contestant.score} ref={index === 0 ? rowRef : null}>
            <div className={`flex justify-between p-2 ${placeColor}`}>
              <span className="w-1/3">{index + 1}.</span>
              <span className="w-1/3">{contestant.score}</span>
              <span className="w-1/3">{contestant.num_people}</span>
            </div>
            {index < topTen.slice(0, maxItems).length - 1 && (
              <hr className="border-t border-gray-600 my-1" />
            )}
          </div>
        );
      })}
    </div>
  );
}