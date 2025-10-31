import "./globals.css";
import Navbar from "./components/navbar";

export const metadata = {
  title: "E-Commerce App",
  description: "Next.js assignment project by Jeevlin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
