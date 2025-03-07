'use client'

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {useState} from "react";
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {InputField} from "@/modules/shared/text-input";
import {Loader2} from "lucide-react";
import {motion} from "motion/react"
import {useMutation} from "@apollo/client";
import {ADD_NEW_CANDIDATE} from "@/graphql";
import {useRouter} from "next/navigation";

const FormSchema = z.object({
    firstname: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    lastname: z.string().min(2, {
        message: "Last name must be at least 2 characters.",
    }),
    email: z.string().email().min(5, {
        message: "Email must be at least 5 characters.",
    }),
    contact: z.string().min(10, {
        message: "Contact number must be at least 10 digits.",
    }),
});

export const Register = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            contact: ""
        },
    });

    const [insert_candidate] = useMutation(ADD_NEW_CANDIDATE);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async function onSubmit(data: any) {
        setLoading(true);
        try {
            await insert_candidate({
                variables: {
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                    contact_number: data.contact,
                    created_at: new Date().toISOString(),
                }
            });

            sessionStorage.setItem('userDetails', JSON.stringify(data));
            sessionStorage.setItem('user_progress', 'details_completed');
            router.push('/questions');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <motion.div
                initial={{y: -50, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{duration: 0.5, ease: "easeOut"}}
            >
                <Card
                    className="w-full max-w-5xl p-6 rounded-2xl shadow-lg bg-white text-gray-900 border border-gray-200">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold">Register</CardTitle>
                        <p className="-mt-2 text-sm text-gray-600">
                            Before starting the evaluation, please register here.
                        </p>
                    </CardHeader>

                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <InputField
                                    name="firstname"
                                    label="First Name"
                                    placeholder="John"
                                    control={form.control}
                                    required
                                />
                                <InputField
                                    name="lastname"
                                    label="Last Name"
                                    placeholder="Doe"
                                    control={form.control}
                                    required
                                />
                                <InputField
                                    name="email"
                                    label="Email"
                                    placeholder="someone@example.com"
                                    control={form.control}
                                    required
                                />
                                <InputField
                                    name="contact"
                                    label="Contact Number"
                                    placeholder="1234567890"
                                    control={form.control}
                                    required
                                />
                                <Button
                                    disabled={loading}
                                    type="submit"
                                    className="w-full h-10 bg-blue-950 hover:bg-blue-800 text-white font-semibold py-3 rounded-xs transition-all flex items-center justify-center"
                                >
                                    {loading ? <Loader2 className="animate-spin h-5 w-5"/> : "Sign Up"}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};