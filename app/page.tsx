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
    <div className="w-full h-full p-5 flex flex-col xl:flex-row gap-5">
      {/* Panels in a single column */}
      <div className="flex flex-col gap-8 h-full w-full xl:w-1/3">
        <Panel link="/fiszki">Fiszki</Panel>
        <Panel link="/cwiczenie">Ćwiczenie</Panel>
        <Panel link="/konkurs">Konkurs</Panel>
      </div>

      {/* Ranking - takes full height on large screens */}
      <div className="xl:flex-1 text-3xl text-white rounded-3xl p-5 bg-gradient-to-r from-slate-900 to-slate-950 h-fit">
        <h2 className="mb-5">Ranking</h2>
        <Ranking contestants={contestants} />
      </div>
    </div>

  );
}