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
  return (
    <html lang="en" style={{ height: "100%", boxSizing: "border-box" }}>
      <body
        style={{
          minHeight: "100%",
          position: "relative",
          boxSizing: "inherit",
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ flexGrow: 1, minHeight: "3300px" }}>
            <NavBar />
            {children}
          </div>
        </div>
        <div className="tw-absolute tw-right-0 tw-left-0 tw-bottom-0 tw-w-full">
          <Footer />
        </div>
      </body>
    </html>
  );
}
