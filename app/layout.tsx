import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });

export const metadata:Metadata={title:"Aegis Claims Intelligence Center",description:"Explainable multi-line P&C claims analytics, triage, reserve and leakage intelligence.",icons:{icon:"/aegis-favicon.png",shortcut:"/aegis-favicon.png",apple:"/aegis-logo.png"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" data-app="claims"><body className={`${inter.variable} ${spaceGrotesk.variable}`}>{children}</body></html>}
