'use client'

import Image from "next/image";
import {useEffect, useState} from "react";
import {useSubscription} from "@apollo/client";
import {VIEW_ALL_QUESTIONS, VIEW_ANSWERS_BY_CANDIDATE_EMAIL} from "@/graphql";
import {Loader2} from "lucide-react";

export const Results = () => {
    const [userDetails, setUserDetails] = useState({
        firstname: "",
        lastname: "",
        email: "",
        contact: ""
    });

    const [score, setScore] = useState(0);

    useEffect(() => {
        const storedData = sessionStorage.getItem('userDetails');
        if (storedData) {
            setUserDetails(JSON.parse(storedData));
        }
    }, []);

    const {data: questionsData, loading: questionsDataLoading} = useSubscription(VIEW_ALL_QUESTIONS);
    const {data: answerData, loading: answerDataLoading} = useSubscription(VIEW_ANSWERS_BY_CANDIDATE_EMAIL, {
        variables: {_eq: userDetails.email},
        skip: !userDetails.email,
    });

    useEffect(() => {
        if (!questionsData || !answerData) return;

        const questions = questionsData?.question
        const answers = answerData?.answers

        let correctCount = 0;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        answers.forEach((answer: { question_id: any; answer: string; }) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const matchedQuestion = questions.find((q: { id: any; }) => q.id === answer.question_id);
            if (matchedQuestion && matchedQuestion.correct_answer.trim().toLowerCase() === answer.answer.trim().toLowerCase()) {
                correctCount++;
            }
        });

        setScore(correctCount);
    }, [questionsData, answerData]);

    return (
        <div>
            <div className="w-full flex items-center justify-center mx-auto">
                <Image src="/images/logo/west-london-logo.png" alt="west london - ielsts" width={1000} height={1000}
                       className="w-48 h-auto"/>
            </div>
            <div className="w-full bg-white rounded shadow p-4 mt-4">
                <h2 className="text-xl font-semibold capitalize">
                    Welcome, {userDetails?.firstname} {userDetails?.lastname}
                </h2>
                <p>You have successfully completed the placement test.</p>
                <p className="text-sm flex items-center">
                    You have scored: <span className="font-semibold text-xl mx-2">
                        {questionsDataLoading || answerDataLoading ? (
                            <Loader2 className="animate-spin h-5 w-5 mr-1"/>
                        ) : score}
                    </span>/50
                </p>
            </div>
        </div>
    );
};