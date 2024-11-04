"use client";

import Image from "next/image";

export default function Home() {
    const userNames: string[] = ["Anna", "Piotr", "Kasia", "Marek", "Zofia", "Anna", "Piotr", "Kasia", "Marek", "Zofia", "Anna", "Piotr", "Kasia", "Marek", "Zofia", "Anna", "Piotr", "Kasia", "Marek", "Zofia", "Anna", "Piotr", "Kasia", "Marek", "Zofia", "Anna", "Piotr", "Kasia", "Marek", "Zofia", "Anna", "Piotr", "Kasia", "Marek", "Zofia", "Anna", "Piotr", "Kasia", "Marek", "Zofia", "Anna", "Piotr", "Kasia", "Marek", "Zofia", "Anna", "Piotr", "Kasia", "Marek", "Zofia", "Anna", "Piotr", "Kasia", "Marek", "Zofia", "Anna", "Piotr", "Kasia", "Marek", "Zofia", "Anna", "Piotr", "Kasia", "Marek", "Zofia", "Anna", "Piotr", "Kasia", "Marek", "Zofia", "Anna", "Piotr", "Kasia", "Marek", "Zofia", "Anna", "Piotr", "Kasia", "Marek", "Zofia", "Anna", "Piotr", "Kasia", "Marek", "Zofia", "Anna", "Piotr", "Kasia", "Marek", "Zofia", "Anna", "Piotr", "Kasia", "Marek", "Zofia", "Anna", "Piotr", "Kasia", "Marek", "Zofia", "Anna", "Piotr", "Kasia", "Marek", "Zofia", "Anna", "Piotr", "Kasia", "Marek", "Zofia", "Anna", "Piotr", "Kasia", "Marek", "Zofia", "Anna", "Piotr", "Kasia", "Marek", "Zofia", "Anna", "Piotr", "Kasia", "Marek", "Zofia", "Anna", "Piotr", "Kasia", "Marek", "Zofia", "Anna", "Piotr", "Kasia", "Marek", "Zofia", "Anna", "Piotr", "Kasia", "Marek", "Zofia", "Anna", "Piotr", "Kasia", "Marek", "Zofia", "Anna", "Piotr", "Kasia", "Marek", "Zofia", ]
    return (
        <div className="w-full h-full p-10 m-auto flex-1 justify-center items-center text-center">
            <div className="flex h-3/4">
                <div className="2xl:w-2/5 m-auto text-center">
                    <div className="max-lg:m-10 text-3xl sm:text-6xl text-white rounded-3xl p-10 sm:p-20 bg-gradient-to-r from-slate-900 to-slate-950">
                        Kod: <br />
                        <p className="text-9xl m-10">MXS76</p>
                        Kod QR:
                        <Image alt="kod qr" src="" width={200} height={200} />
                    </div>
                </div>
                <div className="2xl:w-2/5 m-auto text-center">
                    <div className="max-lg:m-10 text-3xl sm:text-6xl text-white rounded-3xl p-10 sm:p-20 bg-gradient-to-r from-slate-900 to-slate-950">
                        Lista uczestników:
                        <div className="grid grid-cols-4 m-5 gap-4 h-96 overflow-y-auto">
                            {userNames.map((name, index) => (
                                <p key={index}>{name},</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <button className="bg-green-800 p-5 m-10 rounded-3xl w-4/6 text-white text-6xl">Rozpocznij</button>
        </div>
    );
}
