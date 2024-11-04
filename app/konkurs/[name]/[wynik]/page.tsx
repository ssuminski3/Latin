"use client";

import { useRef, useState, useEffect } from "react";

export default function Home() {
    return (
        <div className="w-full h-full p-10 m-auto flex justify-center items-center ">
            <div className="2xl:w-2/5 m-auto text-center">
                <div className="  max-lg:m-10 text-3xl sm:text-6xl text-white rounded-3xl p-10 sm:p-20 bg-gradient-to-r from-slate-900 to-slate-950">
                    Twój wynik to: <br></br>
                    <p className="text-9xl m-10">56</p>
                    Gratulacje!
                </div>
            </div>
        </div>
    );
}
