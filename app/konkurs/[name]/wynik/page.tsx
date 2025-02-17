"use client";
import { useScore } from "@/app/context/scoreContext";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { insertNewRanking } from "@/app/lib/get_data";
import { useEffect } from "react";
export default function Home() {
    const { score } = useScore();
    const pathname = usePathname();
    const name = pathname.split("/")[2];

    useEffect(() => {
        const insert = async () => {
            await insertNewRanking({ score, name });
            console.log(name)
        }
        insert()
    }, []); // Empty dependency array means it runs only once when component mounts

    return (
        <div className="w-full h-full p-10 m-auto flex justify-center items-center">
            <div className="2xl:w-2/5 m-auto text-center">
                <div className="  max-lg:m-10 text-3xl sm:text-6xl text-white rounded-3xl p-10 sm:p-20 bg-gradient-to-r from-slate-900 to-slate-950">
                    Twój wynik to: <br></br>
                    <p className="text-9xl m-10">{score}</p>
                    Gratulacje!
                    <Link href='/' prefetch={false}>
                        <button className="bg-green-800 p-1 m-10 rounded-3xl w-4/6">
                            Wróć na stronę główną
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}