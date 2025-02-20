"use client"

import { Suspense, useEffect, useState } from "react";
import { useScore } from "@/app/context/scoreContext";
import Link from "next/link";
import { addOrUpdateRanking, getComparison } from "@/app/lib/get_data";
import { useRouter, useSearchParams } from "next/navigation";
import { validateToken } from "@/app/lib/tokenUtils"; // Server function
import LoadingSpinner from "@/app/ui/loadingSpinner";

export default function Home() {
    const { score } = useScore();
    const [percentage, setPercentage] = useState(0);
    const [isValid, setIsValid] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");;
    useEffect(() => {
        const insert = async () => {
            await addOrUpdateRanking(score);
            setPercentage(await getComparison(score));
        }
        insert();
    }, []); // Empty dependency array means it runs only once when component mounts

    function getColor(percentage: number) {
        if (percentage > 75) {
            return "text-green-400";
        } else if (percentage > 35) {
            return "text-amber-400";
        } else {
            return "text-red-600";
        }
    }

    useEffect(() => {
        if (!token) {
            router.replace("/");
            return;
        }

        async function checkToken() {
            const valid = await validateToken(token); // Calls the server function
            if (valid) {
                setIsValid(true);
            } else {
                router.replace("/");
            }
        }

        checkToken();
    }, [token, router]);

    return (
        <Suspense fallback={<LoadingSpinner />}>
            <div className="w-full h-screen p-1 m-auto flex justify-center items-center">
                <div className="m-auto text-center w-full max-w-2xl">
                    <div className="lg:m-10 md:text-xl lg:text-3xl text-white rounded-3xl p-10 bg-gradient-to-r from-slate-900 to-slate-950">
                        {(isValid === false) ? (
                            <LoadingSpinner />
                        ) : (
                            <>
                                Twój wynik to: <br />
                                <p className="md:text-9xl text-5xl m-10">{score}</p>
                                <p>Gratulacje! Masz taki sam lub lepszy wynik niż <b className={getColor(percentage)}>{percentage}%</b> osób, które brały udział</p>
                                <Link href='/' prefetch={false}>
                                    <button className="bg-green-800 p-1 m-10 rounded-3xl w-4/6">
                                        Wróć na stronę główną
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Suspense>
    );
}
