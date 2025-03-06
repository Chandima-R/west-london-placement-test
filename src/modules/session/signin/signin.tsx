'use client'

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Loader2} from "lucide-react";
import {useState} from "react";
import Image from "next/image";

export const Signin = () => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => setLoading(false), 2000); // Simulating API call
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-200 via-gray-100 to-white p-6">
            <Card className="w-full max-w-md p-6 rounded-2xl shadow-lg bg-white text-gray-900 border border-gray-200">
                <CardHeader className="text-center">
                    <div className={'w-full items-center justify-center flex'}>
                        <Image src="/images/logo/west-london-logo.png" alt="west london - ielsts" width={1000}
                               height={1000}
                               className="w-48 h-auto "/>
                    </div>

                    <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
                    <p className="-mt-2 text-sm text-gray-600">Welcome back! Please sign in to continue.</p>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label htmlFor="email" className="text-gray-700">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="mt-2 bg-gray-50 border-gray-300 text-gray-900 rounded-xs"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="password" className="text-gray-700">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                className="mt-2 bg-gray-50 border-gray-300 text-gray-900"
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-blue-950 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center"
                        >
                            {loading ? <Loader2 className="animate-spin h-5 w-5"/> : "Sign In"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}