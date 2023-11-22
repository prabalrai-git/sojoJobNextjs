"use state";
import "./globals.css";
import { Inter } from "next/font/google";
import "react-multi-carousel/lib/styles.css";

export const metadata = {
  title: "SOJOJOB",
  description: "SojoJob",
};
import "bootstrap/dist/css/bootstrap.min.css";
import StyledComponentsRegistry from "@/StyledComponentsRegistry";
import { Providers } from "@/helpers/Provider";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </Providers>
      </body>
    </html>
  );
}
