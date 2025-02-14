import React, { useEffect, useRef, useState } from "react";
import { Contestant } from "../lib/definitions";

type RankingProps = {
  contestants: Contestant[];
};

export default function Ranking({ contestants }: RankingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [maxItems, setMaxItems] = useState(10);

  // Sort contestants and take top 10
  const sortedContestants = [...contestants].sort((a, b) => b.score - a.score);
  const topTen = sortedContestants.slice(0, 10);

  useEffect(() => {
    if (!containerRef.current || !rowRef.current) return;

    const updateMaxItems = () => {
      const containerHeight = containerRef.current!.getBoundingClientRect().height;
      const rowHeight = rowRef.current!.getBoundingClientRect().height;
      if (rowHeight > 0) {
        // Calculate how many full rows fit inside the container
        const itemsThatFit = Math.floor(containerHeight / rowHeight);
        setMaxItems(Math.min(itemsThatFit, 10));
      }
    };

    // Initial calculation
    updateMaxItems();

    // Recalculate when the container size changes
    const resizeObserver = new ResizeObserver(() => {
      updateMaxItems();
    });
    resizeObserver.observe(containerRef.current);

    window.addEventListener("resize", updateMaxItems);

    return () => {
      window.removeEventListener("resize", updateMaxItems);
      resizeObserver.disconnect();
    };
  }, [contestants]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full text-3xl text-white overflow-hidden"
    >
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
          <div key={contestant.name} ref={index === 0 ? rowRef : null}>
            <div className={`flex justify-between p-1 ${placeColor}`}>
              <span>{index + 1}.</span>
              <span>{contestant.name}</span>
              <span>{contestant.score}</span>
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
