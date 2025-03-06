"use client";

import {ApolloProvider} from "@apollo/client";
import {SessionProvider} from "next-auth/react";
import {ReactNode} from "react";
import client from "@/utils/apollo-client";

interface ProvidersProps {
    children: ReactNode;
}

export const Providers = ({children}: ProvidersProps) => {
    return (
        <>
            <ApolloProvider client={client}>
                <SessionProvider>{children}</SessionProvider>
            </ApolloProvider>
        </>
    );
};