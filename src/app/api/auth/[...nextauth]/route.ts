import * as process from "process";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { gql } from "@apollo/client";
import apolloClient from "@/utils/apollo-client";

interface User {
    id: string;
    email: string;
    password_hash: string;
}

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials): Promise<User | null> {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    const { data } = await apolloClient.query({
                        query: gql`
                            query GetUser($_eq: String) {
                                user(where: { email: { _eq: $_eq } }) {
                                    email
                                    password_hash
                                    id
                                }
                            }
                        `,
                        variables: { _eq: credentials.email },
                    });

                    const user = data?.user[0];

                    if (!user || !user.password_hash) {
                        return null;
                    }

                    const passwordsMatch = await bcrypt.compare(
                        credentials.password,
                        user.password_hash
                    );

                    if (!passwordsMatch) {
                        return null;
                    }

                    return {
                        id: user.id,
                        email: user.email,
                        password_hash: user.password_hash,
                    };
                } catch (error) {
                    console.error("Authorization error:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token }) {
            return token;
        },

        async session({ session }) {
            return session;
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60,
    },
    pages: {
        signIn: "/signin",
        error: "/auth/error",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };