"use client";

import { useState, useEffect } from "react";
import Panel from "./ui/panel";
import { Contestant } from "./lib/definitions";
import Ranking from "./ui/ranking";
import { getRanking } from "./lib/get_data";

export default function Home() {
  // Define the initial state for contestants
  const [contestants, setContestants] = useState<Contestant[]>([]);

  useEffect(() => {
      const fetchRanking = async () => {
        const con = await getRanking();
        setContestants(con);
      };
      fetchRanking();
    }, []);

  return (
    <div className="w-full h-full p-10 xl:flex m-auto">
      {/* Grid layout for panels and ranking */}
      <div className="lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-auto gap-5 w-full h-full">
        {/* Panels */}
        <Panel link="/fiszki">Fiszki</Panel>
        <Panel link="/konkurslokalny">Konkurs</Panel>
        <Panel link="/cwiczenie">Ćwiczenie</Panel>
        <Panel link="/konkurs">Konkurs ogólny</Panel>

        {/* Ranking - spans 2 rows on larger screens, moves under panels on smaller screens */}
        <div
          className="lg:col-start-3 lg:row-start-1 lg:row-span-2 text-3xl text-white rounded-3xl p-10 bg-gradient-to-r from-slate-900 to-slate-950 overflow-hidden"
        >
          <h2 className="mb-5">Ranking</h2>
          <Ranking contestants={contestants} />
        </div>
      </div>
    </div>
  );
}