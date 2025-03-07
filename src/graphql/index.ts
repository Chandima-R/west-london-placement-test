import {gql} from "@apollo/client";

export const ADD_NEW_CANDIDATE = gql`
    mutation addNewCandidate($contact_number: String, $created_at: String, $email: String, $firstname: String, $lastname: String) {
        insert_candidate(objects: {contact_number: $contact_number, created_at: $created_at, email: $email, firstname: $firstname, lastname: $lastname}) {
            affected_rows
        }
    }
`

export const VIEW_ALL_CANDIDATES = gql`
    subscription viewAllCandidates {
        candidate {
            contact_number
            created_at
            email
            firstname
            id
            lastname
        }
    }
`

export const ADD_QUESTION = gql`
    mutation addQuestion($question: String, $correct_answer: String, $answer_two: String, $answer_three: String, $answer_one: String, $created_at: String) {
        insert_question(objects: {answer_one: $answer_one, question: $question, correct_answer: $correct_answer, answer_two: $answer_two, answer_three: $answer_three, created_at: $created_at}) {
            affected_rows
        }
    }
`

export const VIEW_ALL_QUESTIONS = gql`
    subscription viewAllQuestions {
        question {
            answer_one
            answer_three
            answer_two
            correct_answer
            created_at
            id
            question
        }
    }
`


export const ADD_ANSWER = gql`
    mutation addAnswer($answer: String, $question_id: uuid, $candidate_email: String) {
        insert_answers(objects: {answer: $answer, question_id: $question_id, candidate_email: $candidate_email}) {
            affected_rows
        }
    }
`

export const VIEW_ANSWERS_BY_CANDIDATE_EMAIL = gql`
    subscription viewAnswerByCandidateEmail($_eq: String) {
        answers(where: {candidate_email: {_eq: $_eq}}) {
            answer
            candidate_email
            id
            question_id
        }
    }
`

export const VIEW_ALL_ANSWERS = gql`
    subscription MySubscription
    {
        answers
        {
            answer
            candidate_email
            id
            question_id
        }
    }
`