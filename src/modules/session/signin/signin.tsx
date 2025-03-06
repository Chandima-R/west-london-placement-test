'use client'

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {useState} from "react";
import Image from "next/image";
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {InputField} from "@/modules/shared/text-input";
import {PasswordInput} from "@/modules/shared/password-input";
import {Loader2} from "lucide-react";

const FormSchema = z.object({
    email: z.string().email().min(5, {
        message: "Email must be at least 5 characters.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
});

export const Signin = () => {
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        setLoading(true);
        console.log(data)
        setTimeout(() => setLoading(false), 5000);
    }

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
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <InputField
                                name="email"
                                label="Email"
                                placeholder="someone@example.com"
                                control={form.control}
                                required
                            />
                            <PasswordInput
                                name="password"
                                label="Password"
                                placeholder="password"
                                control={form.control}
                                required
                            />
                            <Button
                                type="submit"
                                className="w-full h-10 bg-blue-950 hover:bg-blue-800 text-white font-semibold py-3 rounded-xs transition-all flex items-center justify-center"
                            >
                                {loading ? <Loader2 className="animate-spin h-5 w-5"/> : "Sign In"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}