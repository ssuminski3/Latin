// app/layout.tsx
import { ScoreProvider } from "../context/scoreContext"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="bg h-screen">
        <ScoreProvider>{children}</ScoreProvider>
      </body>
    </html>
  );
}
