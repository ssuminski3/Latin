import React from "react";
import { Contestant } from "../lib/definitions";

type RankingProps = {
  contestants: Contestant[];
  size: number;
};

export default function Ranking({ contestants, size }: RankingProps) {
  // Sort contestants by score and slice to the size
  const sortedContestants = [...contestants]
    .sort((a, b) => b.score - a.score)
    .slice(0, size);

  return (
    <div className=" w-full max-lg:m-10 text-3xl sm:text-2xl text-white sm:p-20">
      <div>
        {sortedContestants.map((contestant, index) => {
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
            <div key={index}>
              <div className={`pa flex justify-between p-1 ${placeColor}`}>
                <span>{index + 1}.</span>
                <span>{contestant.name}</span>
                <span>{contestant.score}</span>
              </div>
              {index < sortedContestants.length - 1 && (
                <hr className="border-t border-gray-600 my-2" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
