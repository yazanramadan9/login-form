import { Credentials } from "@/types";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthConfig } from 'next-auth';
import { login } from "@/client-api/auth.api";

export const authConfig: NextAuthConfig = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                },
                password: {
                    label: "Password",
                    type: "text",
                },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password)
                    return null;

                const { username, password } = credentials;

                const res = await login({ username, password } as Credentials);
                // const res = {
                //     status: 200,
                //     data: {
                //         id: "123",
                //         username,
                //         password,
                //     },
                //     statusText: "OK"
                // };

                // if (res.status === 401) {

                //     return null;
                // }
                return res.data;
            }
        })
    ],
    callbacks: {
        async redirect({ url, baseUrl }) {
            return baseUrl;
        },
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token
            }
            return token;
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            session.user = token as any;
            return session;
        }
    }
};