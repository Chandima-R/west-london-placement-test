import type {Metadata} from "next";
import {Arimo} from "next/font/google";
import "../globals.css";
import {Providers} from "@/modules/shared/provider";
import {ToastContainer} from "react-toastify";

const arimo = Arimo({
    variable: "--font-arimo-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "West London - IELTS",
    description: "Ace Your IELTS with Expert Guidance!\n" +
        "Take the first step toward your foreign dream with West London IELTS Lab!\n" +
        "Looking to achieve your dream IELTS score?\n" +
        "Join West London IELTS Lab for top-notch training led by Dr. Udeni Rosa with 20+ years of experience!",
    icons: {
        icon: '/images/logo/west-london-logo.png',
    }
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${arimo.variable} antialiased`}
        >
        <ToastContainer/>
        <Providers>
            <div className={'bg-gradient-to-br from-gray-200 via-gray-100 to-white p-6 min-h-screen h-full'}>
                {children}
            </div>
        </Providers>
        </body>
        </html>
    );
}