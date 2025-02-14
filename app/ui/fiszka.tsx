import { useState } from "react";

type FiszkaParams = {
    verse: string;
    reverse: string;
};

export default function Fiszka({ verse, reverse }: FiszkaParams) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="m-auto perspective-1000 w-3/4 h-[20rem] mt-10 mb-10">
            <div
                onClick={() => setIsFlipped(!isFlipped)}
                onKeyDown={(e) => e.key === 'Enter' && setIsFlipped(!isFlipped)}
                role="button"
                tabIndex={0}
                className={`
                    relative w-full h-full transition-transform duration-700 transform-style-3d cursor-pointer
                    ${isFlipped ? 'rotate-y-180' : ''}
                `}
            >
                {/* Front of card */}
                <div className={`
                    absolute w-full h-full backface-hidden
                    flex justify-center items-center 
                    text-3xl sm:text-6xl text-white rounded-3xl p-10 sm:p-20 
                    bg-gradient-to-r from-slate-900 to-slate-950
                    transition-all duration-700
                `}>
                    {verse}
                </div>

                {/* Back of card */}
                <div className={`
                    absolute w-full h-full backface-hidden rotate-y-180
                    flex justify-center items-center 
                    text-3xl sm:text-6xl text-white rounded-3xl p-10 sm:p-20 
                    bg-gradient-to-r from-slate-950 to-slate-900
                    transition-all duration-700
                `}>
                    {reverse}
                </div>
            </div>

            <style jsx>{`
                .perspective-1000 {
                    perspective: 1000px;
                }
                
                .transform-style-3d {
                    transform-style: preserve-3d;
                }
                
                .backface-hidden {
                    backface-visibility: hidden;
                }
                
                .rotate-y-180 {
                    transform: rotateY(180deg);
                }
            `}</style>
        </div>
    );
}
