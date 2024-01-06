import { authConfig } from '@/configs/auth.config';
import NextAuth, { NextAuthResult } from 'next-auth'

const nextAuthResult: NextAuthResult = NextAuth(authConfig);

export const GET = nextAuthResult.handlers.GET;
export const POST = nextAuthResult.handlers.POST;