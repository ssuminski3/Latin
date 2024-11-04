
export default function Panel({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
          <div className="  max-lg:m-10 text-3xl sm:text-6xl text-white rounded-3xl p-10 sm:p-20 bg-gradient-to-r from-slate-900 to-slate-950">
            {children}
          </div>
    );
  }