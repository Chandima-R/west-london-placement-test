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