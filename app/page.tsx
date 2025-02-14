"use client";

import { useState } from "react";
import Panel from "./ui/panel";
import { Contestant } from "./lib/definitions";
import Ranking from "./ui/ranking";

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

  const [rankingSize] = useState(10);

  return (
    <div className="w-full h-full p-10 xl:flex m-auto">
      <div className="lg:grid grid-cols-2 grid-rows-2 2xl:w-3/5 sm:h-full 2xl:gap-10 md:gap-5 m-auto">
        <Panel link="/fiszki">Fiszki</Panel>
        <Panel link="/konkurslokalny">Konkurs</Panel>
        <Panel link="/cwiczenie">Ćwiczenie</Panel>
        <Panel link="/konkurs">Konkurs ogólny</Panel>
      </div>
      <div
        className="text-3xl text-white rounded-3xl p-10 bg-gradient-to-r from-slate-900 to-slate-950 2xl:w-1/3 m-auto max-2xl:m-10 overflow-hidden h-full"
      >
        Ranking
        <Ranking contestants={contestants} size={rankingSize} />
      </div>
    </div>
  );
}
/**
 * <div
        className="text-3xl text-white rounded-3xl p-10 bg-gradient-to-r from-slate-900 to-slate-950 2xl:w-1/3 m-auto max-2xl:m-10 overflow-hidden h-full"
      >
        Ranking
        <Ranking contestants={contestants} size={rankingSize} />
      </div>
 */
