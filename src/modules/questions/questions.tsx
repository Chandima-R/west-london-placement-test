'use client'

import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Image from "next/image";
import {useMutation, useSubscription} from "@apollo/client";
import {ADD_ANSWER, VIEW_ALL_QUESTIONS} from "@/graphql";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import {useRouter} from "next/navigation";
import {Loader} from "@/modules/shared/loader";
import {toast} from "react-toastify";
import {Loader2} from "lucide-react";

export const Questions = () => {
    const [userDetails, setUserDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        contact: ""
    });
    const [answers, setAnswers] = useState<{ [questionId: string]: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const [timeLeft, setTimeLeft] = useState(30 * 60);

    useEffect(() => {
        const storedData = sessionStorage.getItem('userDetails');
        if (storedData) {
            setUserDetails(JSON.parse(storedData));
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const [activeTab, setActiveTab] = useState("page1");
    const tabs = ["page1", "page2", "page3", "page4", "page5"];

    const handleNext = () => {
        const currentIndex = tabs.indexOf(activeTab);
        if (currentIndex < tabs.length - 1) {
            setActiveTab(tabs[currentIndex + 1]);
        }
    };

    const handlePrevious = () => {
        const currentIndex = tabs.indexOf(activeTab);
        if (currentIndex > 0) {
            setActiveTab(tabs[currentIndex - 1]);
        }
    };

    const handleAnswerChange = (questionId: string, answer: string) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };

    const [insert_answer] = useMutation(ADD_ANSWER);

    const handleSubmit = async () => {
        setIsLoading(true);

        try {
            for (const [questionId, answer] of Object.entries(answers)) {
                await insert_answer({
                    variables: {
                        candidate_email: userDetails?.email,
                        question_id: questionId,
                        answer: answer,
                    }
                });
            }

            toast.success("You have successfully completed your placement test. You will be redirected to the results screen shortly.", {
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            router.push('/results');
        } catch (error) {
            console.error("Error submitting answers:", error);
            toast.error("An error occurred while submitting your answers. Please try again.");
        } finally {
            setIsLoading(false); // Stop loading
        }
    };


    const {data: questionsData, loading: questionsDataLoading} = useSubscription(VIEW_ALL_QUESTIONS);

    const questions = questionsData?.question;
    const page1_questions = questions?.slice(0, 10);
    const page2_questions = questions?.slice(10, 20)
    const page3_questions = questions?.slice(20, 30)
    const page4_questions = questions?.slice(30, 40)
    const page5_questions = questions?.slice(40, 50)

    return (
        <div>
            <div className={'w-full flex items-center justify-center mx-auto relative'}>
                <Image src="/images/logo/west-london-logo.png" alt="west london - ielsts" width={1000} height={1000}
                       className="w-48 h-auto "/>
                <div className="text-center text-xl font-semibold text-red-600 absolute right-2 top-4">
                    <p className={'flex flex-col'}>
                        Time Left: <span className={'text-4xl'}>
                    {formatTime(timeLeft)}
                </span>
                    </p>
                </div>
            </div>

            <div>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="page1">Questions 1-10</TabsTrigger>
                        <TabsTrigger value="page2">Questions 11-20</TabsTrigger>
                        <TabsTrigger value="page3">Questions 21-30</TabsTrigger>
                        <TabsTrigger value="page4">Questions 31-40</TabsTrigger>
                        <TabsTrigger value="page5">Questions 41-50</TabsTrigger>
                    </TabsList>

                    {
                        questionsDataLoading ? <Loader/> : (
                            <>
                                <TabsContent value={'page1'}>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Page 1 <span
                                                className={'font-normal text-sm'}>(Questions 1 - 10)</span></CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            <div className="space-y-4">
                                                {page1_questions?.map((ques: {
                                                    id: string,
                                                    question: string,
                                                    correct_answer: string,
                                                    answer_one: string,
                                                    answer_two: string,
                                                    answer_three: string
                                                }, index: number) => (
                                                    <div key={ques.id} className={'w-full rounded-xs shadow p-4'}>
                                                        <p>{index + 1}. {ques.question}</p>

                                                        <RadioGroup
                                                            value={answers[ques.id] || ""}
                                                            onValueChange={(answer) => handleAnswerChange(ques.id, answer)}
                                                        >
                                                            <div
                                                                className="flex gap-10 space-y-2 font-normal !text-xs mt-2">
                                                                {[
                                                                    {label: "a", text: ques.correct_answer},
                                                                    {label: "b", text: ques.answer_one},
                                                                    {label: "c", text: ques.answer_two},
                                                                    {label: "d", text: ques.answer_three},
                                                                ].map((answer, index) => (
                                                                    <div key={index}
                                                                         className="flex items-center justify-center gap-2">
                                                                        <RadioGroupItem value={answer.text}
                                                                                        id={`option-${index}`}/>
                                                                        <Label className={'!text-sm !font-normal'}
                                                                               htmlFor={`option-${index}`}>
                                                                            {answer.text}
                                                                        </Label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </RadioGroup>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                        <CardFooter className={`flex ${1 > 0 ? 'justify-between' : 'justify-end'}`}>
                                            <Button className={'rounded-xs h-10'} variant="outline"
                                                    disabled={activeTab === "page1"}
                                                    onClick={handlePrevious}>
                                                Previous
                                            </Button>

                                            {activeTab !== tabs[tabs.length - 1] ? (
                                                <Button className={'rounded-xs h-10'} variant="outline"
                                                        onClick={handleNext}>
                                                    Next
                                                </Button>
                                            ) : (
                                                <Button
                                                    disabled={isLoading}
                                                    className="h-10 bg-blue-950 hover:bg-blue-800 text-white font-semibold py-3 rounded-xs transition-all flex items-center justify-center"
                                                    onClick={handleSubmit}
                                                >
                                                    {isLoading ?
                                                        <>
                                                            <Loader2 className="animate-spin h-5 w-5 mr-2"/>
                                                            <span>Submitting</span>
                                                        </> : (
                                                            'Submit Answers'
                                                        )}
                                                </Button>
                                            )}
                                        </CardFooter>
                                    </Card>
                                </TabsContent>

                                <TabsContent value={'page2'}>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Page 2 <span
                                                className={'font-normal text-sm'}>(Questions 11 - 20)</span></CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            <div className="space-y-4">
                                                {page2_questions?.map((ques: {
                                                    id: string,
                                                    question: string,
                                                    correct_answer: string,
                                                    answer_one: string,
                                                    answer_two: string,
                                                    answer_three: string
                                                }, index: number) => (
                                                    <div key={ques.id} className={'w-full rounded-xs shadow p-4'}>
                                                        <p>{index + 11}. {ques.question}</p>

                                                        <RadioGroup
                                                            value={answers[ques.id] || ""}
                                                            onValueChange={(answer) => handleAnswerChange(ques.id, answer)}
                                                        >
                                                            <div
                                                                className="flex gap-10 space-y-2 font-normal !text-xs mt-2">
                                                                {[
                                                                    {label: "a", text: ques.correct_answer},
                                                                    {label: "b", text: ques.answer_one},
                                                                    {label: "c", text: ques.answer_two},
                                                                    {label: "d", text: ques.answer_three},
                                                                ].map((answer, index) => (
                                                                    <div key={index}
                                                                         className="flex items-center justify-center gap-2">
                                                                        <RadioGroupItem value={answer.text}
                                                                                        id={`option-${index}`}/>
                                                                        <Label className={'!text-sm !font-normal'}
                                                                               htmlFor={`option-${index}`}>
                                                                            {answer.text}
                                                                        </Label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </RadioGroup>

                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                        <CardFooter className={`flex ${1 > 0 ? 'justify-between' : 'justify-end'}`}>
                                            <Button className={'rounded-xs h-10'} variant="outline"
                                                    disabled={activeTab === "page1"}
                                                    onClick={handlePrevious}>
                                                Previous
                                            </Button>

                                            {activeTab !== tabs[tabs.length - 1] ? (
                                                <Button className={'rounded-xs h-10'} variant="outline"
                                                        onClick={handleNext}>
                                                    Next
                                                </Button>
                                            ) : (
                                                <Button
                                                    disabled={isLoading}
                                                    className="h-10 bg-blue-950 hover:bg-blue-800 text-white font-semibold py-3 rounded-xs transition-all flex items-center justify-center"
                                                    onClick={handleSubmit}
                                                >
                                                    {isLoading ?
                                                        <>
                                                            <Loader2 className="animate-spin h-5 w-5 mr-2"/>
                                                            <span>Submitting</span>
                                                        </> : (
                                                            'Submit Answers'
                                                        )}
                                                </Button>
                                            )}
                                        </CardFooter>
                                    </Card>
                                </TabsContent>

                                <TabsContent value={'page3'}>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Page 3 <span
                                                className={'font-normal text-sm'}>(Questions 21 - 30)</span></CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            <div className="space-y-4">
                                                {page3_questions?.map((ques: {
                                                    id: string,
                                                    question: string,
                                                    correct_answer: string,
                                                    answer_one: string,
                                                    answer_two: string,
                                                    answer_three: string
                                                }, index: number) => (
                                                    <div key={ques.id} className={'w-full rounded-xs shadow p-4'}>
                                                        <p>{index + 21}. {ques.question}</p>

                                                        <RadioGroup
                                                            value={answers[ques.id] || ""}
                                                            onValueChange={(answer) => handleAnswerChange(ques.id, answer)}
                                                        >
                                                            <div
                                                                className="flex gap-10 space-y-2 font-normal !text-xs mt-2">
                                                                {[
                                                                    {label: "a", text: ques.correct_answer},
                                                                    {label: "b", text: ques.answer_one},
                                                                    {label: "c", text: ques.answer_two},
                                                                    {label: "d", text: ques.answer_three},
                                                                ].map((answer, index) => (
                                                                    <div key={index}
                                                                         className="flex items-center justify-center gap-2">
                                                                        <RadioGroupItem value={answer.text}
                                                                                        id={`option-${index}`}/>
                                                                        <Label className={'!text-sm !font-normal'}
                                                                               htmlFor={`option-${index}`}>
                                                                            {answer.text}
                                                                        </Label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </RadioGroup>

                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                        <CardFooter className={`flex ${1 > 0 ? 'justify-between' : 'justify-end'}`}>
                                            <Button className={'rounded-xs h-10'} variant="outline"
                                                    disabled={activeTab === "page1"}
                                                    onClick={handlePrevious}>
                                                Previous
                                            </Button>

                                            {activeTab !== tabs[tabs.length - 1] ? (
                                                <Button className={'rounded-xs h-10'} variant="outline"
                                                        onClick={handleNext}>
                                                    Next
                                                </Button>
                                            ) : (
                                                <Button
                                                    disabled={isLoading}
                                                    className="h-10 bg-blue-950 hover:bg-blue-800 text-white font-semibold py-3 rounded-xs transition-all flex items-center justify-center"
                                                    onClick={handleSubmit}
                                                >
                                                    {isLoading ?
                                                        <>
                                                            <Loader2 className="animate-spin h-5 w-5 mr-2"/>
                                                            <span>Submitting</span>
                                                        </> : (
                                                            'Submit Answers'
                                                        )}
                                                </Button>
                                            )}
                                        </CardFooter>
                                    </Card>
                                </TabsContent>

                                <TabsContent value={'page4'}>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Page 4 <span
                                                className={'font-normal text-sm'}>(Questions 31 - 40)</span></CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            <div className="space-y-4">
                                                {page4_questions?.map((ques: {
                                                    id: string,
                                                    question: string,
                                                    correct_answer: string,
                                                    answer_one: string,
                                                    answer_two: string,
                                                    answer_three: string
                                                }, index: number) => (
                                                    <div key={ques.id} className={'w-full rounded-xs shadow p-4'}>
                                                        <p>{index + 31}. {ques.question}</p>

                                                        <RadioGroup
                                                            value={answers[ques.id] || ""}
                                                            onValueChange={(answer) => handleAnswerChange(ques.id, answer)}
                                                        >
                                                            <div
                                                                className="flex gap-10 space-y-2 font-normal !text-xs mt-2">
                                                                {[
                                                                    {label: "a", text: ques.correct_answer},
                                                                    {label: "b", text: ques.answer_one},
                                                                    {label: "c", text: ques.answer_two},
                                                                    {label: "d", text: ques.answer_three},
                                                                ].map((answer, index) => (
                                                                    <div key={index}
                                                                         className="flex items-center justify-center gap-2">
                                                                        <RadioGroupItem value={answer.text}
                                                                                        id={`option-${index}`}/>
                                                                        <Label className={'!text-sm !font-normal'}
                                                                               htmlFor={`option-${index}`}>
                                                                            {answer.text}
                                                                        </Label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </RadioGroup>

                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                        <CardFooter className={`flex ${1 > 0 ? 'justify-between' : 'justify-end'}`}>
                                            <Button className={'rounded-xs h-10'} variant="outline"
                                                    disabled={activeTab === "page1"}
                                                    onClick={handlePrevious}>
                                                Previous
                                            </Button>

                                            {activeTab !== tabs[tabs.length - 1] ? (
                                                <Button className={'rounded-xs h-10'} variant="outline"
                                                        onClick={handleNext}>
                                                    Next
                                                </Button>
                                            ) : (
                                                <Button
                                                    disabled={isLoading}
                                                    className="h-10 bg-blue-950 hover:bg-blue-800 text-white font-semibold py-3 rounded-xs transition-all flex items-center justify-center"
                                                    onClick={handleSubmit}
                                                >
                                                    {isLoading ?
                                                        <>
                                                            <Loader2 className="animate-spin h-5 w-5 mr-2"/>
                                                            <span>Submitting</span>
                                                        </> : (
                                                            'Submit Answers'
                                                        )}
                                                </Button>
                                            )}
                                        </CardFooter>
                                    </Card>
                                </TabsContent>

                                <TabsContent value={'page5'}>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Page 5 <span
                                                className={'font-normal text-sm'}>(Questions 41 - 50)</span></CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            <div className="space-y-4">
                                                {page5_questions?.map((ques: {
                                                    id: string,
                                                    question: string,
                                                    correct_answer: string,
                                                    answer_one: string,
                                                    answer_two: string,
                                                    answer_three: string
                                                }, index: number) => (
                                                    <div key={ques.id} className={'w-full rounded-xs shadow p-4'}>
                                                        <p>{index + 41}. {ques.question}</p>

                                                        <RadioGroup
                                                            value={answers[ques.id] || ""}
                                                            onValueChange={(answer) => handleAnswerChange(ques.id, answer)}
                                                        >
                                                            <div
                                                                className="flex gap-10 space-y-2 font-normal !text-xs mt-2">
                                                                {[
                                                                    {label: "a", text: ques.correct_answer},
                                                                    {label: "b", text: ques.answer_one},
                                                                    {label: "c", text: ques.answer_two},
                                                                    {label: "d", text: ques.answer_three},
                                                                ].map((answer, index) => (
                                                                    <div key={index}
                                                                         className="flex items-center justify-center gap-2">
                                                                        <RadioGroupItem value={answer.text}
                                                                                        id={`option-${index}`}/>
                                                                        <Label className={'!text-sm !font-normal'}
                                                                               htmlFor={`option-${index}`}>
                                                                            {answer.text}
                                                                        </Label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </RadioGroup>

                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                        <CardFooter className={`flex ${1 > 0 ? 'justify-between' : 'justify-end'}`}>
                                            <Button className={'rounded-xs h-10'} variant="outline"
                                                    disabled={activeTab === "page1"}
                                                    onClick={handlePrevious}>
                                                Previous
                                            </Button>

                                            {activeTab !== tabs[tabs.length - 1] ? (
                                                <Button className={'rounded-xs h-10'} variant="outline"
                                                        onClick={handleNext}>
                                                    Next
                                                </Button>
                                            ) : (
                                                <Button
                                                    disabled={isLoading}
                                                    className="h-10 bg-blue-950 hover:bg-blue-800 text-white font-semibold py-3 rounded-xs transition-all flex items-center justify-center"
                                                    onClick={handleSubmit}
                                                >
                                                    {isLoading ?
                                                        <>
                                                            <Loader2 className="animate-spin h-5 w-5 mr-2"/>
                                                            <span>Submitting</span>
                                                        </> : (
                                                            'Submit Answers'
                                                        )}
                                                </Button>
                                            )}
                                        </CardFooter>
                                    </Card>
                                </TabsContent>
                            </>
                        )
                    }
                </Tabs>
            </div>
        </div>
    );
};