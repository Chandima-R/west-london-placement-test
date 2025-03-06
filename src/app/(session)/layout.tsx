import "../globals.css";
import {Providers} from "@/modules/shared/provider";


export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <Providers>
            <body className="w-full mx-auto">{children}</body>
        </Providers>
        </html>
    );
}