'use client'

import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {signOut, useSession} from "next-auth/react";

import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {ChevronDown} from "lucide-react";

export const Navbar = () => {
    const {data: session} = useSession();
    const pathname = usePathname();
    const route = pathname.split("/")[2];
    console.log(route);

    const email = session?.user?.email;

    return (
        <div
            className="w-full fixed top-0 left-0 right-0 z-50 bg-white h-16 border-b flex items-center justify-center shadow">
            <div
                className="w-full max-w-7xl mx-auto bg-white h-16 border-b flex items-center justify-between py-2 px-4">
                <div className="h-full flex gap-4 items-center">
                    <Link href="/dashboard/candidates" className="h-full">
                        <Image
                            src="/images/logo/west-london-logo.png"
                            alt="west london - ielsts"
                            width={1000}
                            height={1000}
                            className="h-full w-auto"
                        />
                    </Link>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/dashboard/candidates"
                            className={`text-sm font-semibold hover:text-blue-800 ${
                                pathname.includes("/dashboard/candidates") ? "text-blue-800 underline" : ""
                            }`}
                        >
                            Candidates
                        </Link>
                        <Link
                            href="/dashboard/questions"
                            className={`text-sm font-semibold hover:text-blue-800 ${
                                pathname.includes("/dashboard/questions") ? "text-blue-800 underline" : ""
                            }`}
                        >
                            Questions
                        </Link>
                    </div>
                </div>

                <div className="h-full">
                    {session && session.user && (
                        <Dialog>
                            <DialogTrigger asChild className="cursor-pointer">
                                <div className="flex items-center gap-2">
                                    <Image
                                        src={`https://avatar.vercel.sh/${email}?rounded=60?text`}
                                        alt="ismaththa hotel user logo"
                                        width={500}
                                        height={500}
                                        className="rounded-full h-full w-12"
                                    />
                                    <ChevronDown className="h-6 w-6"/>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Logout Confirmation</DialogTitle>
                                    <DialogDescription>Are you sure you want to log out?</DialogDescription>
                                </DialogHeader>

                                <DialogFooter>
                                    <Button
                                        className="h-10 bg-blue-950 hover:bg-blue-800 text-white font-semibold py-3 rounded-xs transition-all flex items-center justify-center"
                                        onClick={() => signOut()}
                                    >
                                        Sign out
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>
            </div>
        </div>
    );
};