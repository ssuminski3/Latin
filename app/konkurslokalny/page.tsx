"use client";

import { useState } from "react";
import '@/app/globals.css'
import Panel from "../ui/panel";


export default function Home() {
    const [poprawny, setPoprawny] = useState(true)
    const odpowiedzi: string[] = [
        "Ona", "On", "Ono", "vf", "jff", "hid", "jf", "hduof", "ff", "oik"
    ]
    return (
        <div className="w-full h-full p-10 m-auto flex justify-center items-center ">
            <div className="2xl:w-3/5 m-auto text-center">
                <div className="lg:grid grid-cols-2 grid-rows-2 2xl:gap-10 md:gap-5 m-auto">
                    <Panel>Zorganizuj pokój</Panel>
                    <Panel>Dołącz do konkursu</Panel>
                </div>
            </div>
        </div>
    );
}
