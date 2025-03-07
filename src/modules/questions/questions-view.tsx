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
import {useMutation} from "@apollo/client";
import {ADD_QUESTION} from "@/graphql";

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

    const [insertQuestion] = useMutation(ADD_QUESTION)


    async function onSubmit(data: z.infer<typeof FormSchema>) {
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
            form.reset()
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <div className={'flex items-start justify-between'}>
                <h2 className={'font-semibold text-md'}>Questions</h2>
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
                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full  space-y-4">
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
                                            className="w-auto h-10 border border-blue-950 text-blue-950 hover:bg-blue-950  bg-transparent  cursor-pointer hover:text-white hover:border-blue-800 transition-all font-semibold py-3 rounded-xs flex items-center justify-center"
                                    >Add Question</Button>
                                </div>
                            </form>
                        </Form>
                    </DialogContent>

                </Dialog>
            </div>
        </div>
    )
}