import type { Metadata } from "next";
import "./globals.css";

export const metadata:Metadata={title:"Aegis Claims Intelligence Center",description:"Explainable multi-line P&C claims analytics, triage, reserve and leakage intelligence.",icons:{icon:"/aegis-favicon.png",shortcut:"/aegis-favicon.png",apple:"/aegis-logo.png"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
