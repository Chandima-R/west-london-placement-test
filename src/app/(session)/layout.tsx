import type {Metadata} from "next";
import "../globals.css";
import {Providers} from "@/modules/shared/provider";
import {ToastContainer} from "react-toastify";

export const metadata: Metadata = {
    title: "West London - IELTS | Signin",
    description: `Ace Your IELTS with Expert Guidance!
    Take the first step toward your foreign dream with West London IELTS Lab!
    Looking to achieve your dream IELTS score?
    Join West London IELTS Lab for top-notch training led by Dr. Udeni Rosa with 20+ years of experience!`,
    icons: {
        icon: "/images/logo/west-london-logo.png",
    },
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <ToastContainer/>
        <Providers>
            <body className={`antialiased`}>
            {children}
            </body>
        </Providers>
        </html>
    );
}