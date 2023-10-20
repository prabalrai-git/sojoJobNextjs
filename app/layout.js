import "./globals.css";
import { Inter } from "next/font/google";
import "react-multi-carousel/lib/styles.css";

export const metadata = {
  title: "SOJOJOB",
  description: "SojoJob",
};
import "bootstrap/dist/css/bootstrap.min.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
