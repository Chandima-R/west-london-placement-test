'use client'

import {useEffect, useState} from "react";
import {useSubscription} from "@apollo/client";
import {VIEW_ALL_ANSWERS, VIEW_ALL_CANDIDATES, VIEW_ALL_QUESTIONS} from "@/graphql";
import {DataTable} from "@/modules/shared/data-table";
import {DataTableFunction} from "@/lib/data-table-functions";
import {ColumnDef} from "@tanstack/react-table";

type Candidate = {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    contact_number: string;
    score?: number;
};

export const getColumns = (): ColumnDef<Candidate>[] => {
    return [
        {
            accessorKey: "id",
            header: "Candidate",
            cell: ({row}) => {
                const {firstname, lastname} = row.original;
                return (
                    <p className="text-blue-900 hover:underline font-semibold cursor-pointer capitalize">
                        {firstname} {lastname}
                    </p>
                );
            },
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "contact_number",
            header: "Contact number",
        },
        {
            accessorKey: "score",
            header: "Score ( /50)",
            cell: ({row}) => <p className="font-bold">{row.original.score ?? "N/A"}</p>,
        },
    ];
};

export const CandidateDataTable = () => {
    const columns = getColumns();

    const {data: candidateData, loading: candidateDataLoading} = useSubscription(VIEW_ALL_CANDIDATES);

    const {data: questionsData} = useSubscription(VIEW_ALL_QUESTIONS);

    const {data: answersData} = useSubscription(VIEW_ALL_ANSWERS);

    const [candidatesWithScores, setCandidatesWithScores] = useState<Candidate[]>([]);

    useEffect(() => {
        if (!candidateData || !questionsData || !answersData) return;

        const candidates = candidateData?.candidate || [];
        const questions = questionsData?.question || [];
        const answers = answersData?.answers || [];

        const calculateScores = () => {
            return candidates.map((candidate: { email: string; }) => {
                const candidateAnswers = answers.filter((answer: {
                    candidate_email: string;
                }) => answer.candidate_email === candidate.email);

                let correctCount = 0;
                candidateAnswers.forEach((answer: { question_id: string; answer: string; }) => {
                    const matchedQuestion = questions.find((q: { id: string; }) => q.id === answer.question_id);
                    if (matchedQuestion && matchedQuestion.correct_answer.trim().toLowerCase() === answer.answer.trim().toLowerCase()) {
                        correctCount++;
                    }
                });

                return {...candidate, score: correctCount};
            });
        };

        setCandidatesWithScores(calculateScores());
    }, [candidateData, questionsData, answersData]);

    const {table, pageIndex} = DataTableFunction({
        columns,
        tableData: candidatesWithScores,
    });

    return (
        <div className="container mx-auto bg-white rounded-sm shadow p-4 border">
            <DataTable
                columns={columns}
                loading={candidateDataLoading}
                pageIndex={pageIndex}
                table={table}
                searchFilter={'email'}
            />
        </div>
    );
};