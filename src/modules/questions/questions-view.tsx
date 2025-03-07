'use client'

import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Form,} from "@/components/ui/form"
import {TextAreaInput} from "@/modules/shared/text-area-input";
import {InputField} from "@/modules/shared/text-input";
import {useMutation, useSubscription} from "@apollo/client";
import {ADD_QUESTION, VIEW_ALL_QUESTIONS} from "@/graphql";
import {toast} from 'react-toastify';
import {useState} from "react";
import {Loader2} from "lucide-react";
import {Loader} from "@/modules/shared/loader";

const FormSchema = z.object({
    question: z.string().nonempty({
        message: "Question is required.",
    }),
    correct_answer: z.string().nonempty({
        message: "Correct answer is required.",
    }),
    answer1: z.string().nonempty({
        message: "Answer 1 is required.",
    }),
    answer2: z.string().nonempty({
        message: "Answer 2 is required.",
    }),
    answer3: z.string().nonempty({
        message: "Answer 3 is required.",
    }),
});

export const QuestionsView = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            question: "",
            correct_answer: "",
            answer1: "",
            answer2: "",
            answer3: "",
        },
    })
    const [loading, setLoading] = useState(false);
    const [insertQuestion] = useMutation(ADD_QUESTION)

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setLoading(true);
        try {
            await insertQuestion({
                variables: {
                    question: data.question,
                    correct_answer: data.correct_answer,
                    answer_one: data.answer1,
                    answer_two: data.answer2,
                    answer_three: data.answer3,
                    created_at: new Date(),
                }
            })
            setTimeout(() => setLoading(false), 5000);

            form.reset()

            toast.success("Question added successfully!", {
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        } catch (err) {
            console.error(err)
            toast.error("Failed to add question. Please try again.", {
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } finally {
            setLoading(false);
        }
    }

    const {data: questionsData, loading: questionsDataLoading} = useSubscription(VIEW_ALL_QUESTIONS)

    return (
        <div>
            <div className={'flex items-start justify-between'}>
                <h2 className={'font-semibold text-md'}>Questions List</h2>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            size={'sm'}
                            className="w-auto h-10 bg-blue-950 hover:bg-blue-800 text-white font-semibold py-3 rounded-xs transition-all flex items-center justify-center"
                        >
                            Add Question
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[1000px]">
                        <DialogHeader>
                            <DialogTitle>Add Question</DialogTitle>
                            <DialogDescription>
                                Enter the question and provide four possible answers.
                            </DialogDescription>
                        </DialogHeader>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                                <div className={'flex items-start justify-between gap-4'}>
                                    <div className={'w-full'}>
                                        <TextAreaInput control={form.control} label={'Question'} name={'question'}
                                                       placeholder={"Place the question here.."} required={true}/>
                                    </div>
                                    <div className={'w-full flex flex-col gap-4'}>
                                        <InputField name={'correct_answer'} label={'Correct Answer'}
                                                    placeholder={'Correct Answer'}
                                                    control={form.control} required={true}/>
                                        <InputField name={'answer1'} label={'Answer 1'} placeholder={'Answer 1'}
                                                    control={form.control} required={true}/>
                                        <InputField name={'answer2'} label={'Answer 2'} placeholder={'Answer 2'}
                                                    control={form.control} required={true}/>
                                        <InputField name={'answer3'} label={'Answer 3'} placeholder={'Answer 3'}
                                                    control={form.control} required={true}/>
                                    </div>
                                </div>
                                <div className={'w-full flex justify-end'}>
                                    <Button type="submit"
                                            disabled={loading}
                                            className="w-auto h-10 border border-blue-950 text-blue-950 hover:bg-blue-950 bg-transparent cursor-pointer hover:text-white hover:border-blue-800 transition-all font-semibold py-3 rounded-xs flex items-center justify-center"
                                    >{
                                        loading ? (
                                                <>
                                                    <Loader2 className="animate-spin h-5 w-5"/>
                                                    <span>Adding Question</span></>
                                            )
                                            : 'Add Question'
                                    }</Button>
                                </div>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>

            {
                questionsDataLoading ? <Loader/> : (
                    <div className={'grid grid-cols-5 gap-4 mt-4'}>
                        {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            questionsData?.question?.map((question: any, index: number) => {
                                return (
                                    <div key={index} className={'shadow rounded-xs p-2'}>
                                        <p className={'text-xs'}><span>{index + 1}. </span>{question.question}</p>

                                        <div className={'flex flex-col gap-2 mt-2'}>
                                            {[
                                                {label: 'a', text: question.correct_answer},
                                                {label: 'b', text: question.answer_one},
                                                {label: 'c', text: question.answer_two},
                                                {label: 'd', text: question.answer_three},
                                            ]
                                                .sort(() => Math.random() - 0.5)
                                                .map((answer, index) => (
                                                    <p key={index} className={'text-xs'}>
                                                        {String.fromCharCode(97 + index)}. {answer.text}
                                                    </p>
                                                ))}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }

        </div>
    )
}