import NavBar from "@/components/NavBar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SOJOJOB",
  description: "SojoJob",
};
import "bootstrap/dist/css/bootstrap.min.css";
export default function RootLayout({ children }) {
  console.log(children, "this childresn");

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
