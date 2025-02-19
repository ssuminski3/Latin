import Link from "next/link";

interface PanelProps {
  children: React.ReactNode;
  link: string;
}

export default function Panel({ children, link }: PanelProps) {
  return (
    <Link href={link} className="">
      <div className="block text-center items-center max-lg:m-10 sm:text-3xl text-xl text-white rounded-3xl sm:p-20 p-10 bg-gradient-to-r from-slate-900 to-slate-950 h-full">
        {children}
      </div>
    </Link>
  );
}