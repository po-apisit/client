import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@fontsource/roboto/700.css';
import ReduxProvider from "@/utils/common/ReduxProvider";
import StyledThemeProvider from "@/utils/common/StyledThemeProvider";
import LayoutProvider from "@/utils/common/LayoutProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "รวบข้อมูล POV-PRO",
  description: "rov-pro.com เว็บรวบรวมข้อมูลเกี่ยวกับเกมส์ ROV",
  keywords:["rov","rov-pro","เกม"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <StyledThemeProvider>
            <LayoutProvider>
              {children}
            </LayoutProvider>
          </StyledThemeProvider>
        </ReduxProvider>
        </body>
    </html>
  );
}
