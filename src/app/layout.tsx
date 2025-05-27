import Sidebar from "@/components/Sidebar";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">{children}</main>
      </body>
    </html>
  );
}
