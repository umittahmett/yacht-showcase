import { Provider as JotaiProvider } from "jotai";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <JotaiProvider>{children}</JotaiProvider>
    </div>
  );
}
