import React from 'react';
import { Contestant } from "../lib/definitions";

// Define props type for the Ranking component
type RankingProps = {
    contestants: Contestant[];
    size: number
};

export default function Ranking({ contestants, size }: RankingProps) {
    // Sort contestants by score in descending order and limit to 5
    const sortedContestants = [...contestants]
        .sort((a, b) => b.score - a.score)
        .slice(0, size); // Get only the top 5 contestants
//36 + 8 = 44
    return (
        <div className="max-lg:m-10 text-3xl sm:text-6xl text-white sm:p-20">
            <div>
                {sortedContestants.map((contestant, index) => {
                    let placeColor = ""; // Default color
                    switch (index) {
                        case 0: // First place
                            placeColor = "bg-yellow-500 rounded-2xl"; // Gold color
                            break;
                        case 1: // Second place
                            placeColor = "bg-gray-400 rounded-2xl"; // Silver color
                            break;
                        case 2: // Third place
                            placeColor = "bg-amber-500 rounded-2xl"; // Bronze color
                            break;
                        default: // Fourth and fifth places
                            placeColor = "text-white"; // Default color for others
                    }

                    return (
                        <div key={index}>
                            <div className={`flex justify-between p-2 ${placeColor}`}>
                                <span>{index + 1}.</span> {/* Display place */}
                                <span>{contestant.name}</span> {/* Display name */}
                                <span>{contestant.score}</span> {/* Display score */}
                            </div>
                            {/* Line separator */}
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