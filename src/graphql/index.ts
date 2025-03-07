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