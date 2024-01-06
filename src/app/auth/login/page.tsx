"use client";

import LoginForm from "@/components/auth/login-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
	const router = useRouter();
	const { data: session } = useSession();

	if (session) {
		router.push("/");
		return;
	}

	return (
		<div className='flex justify-center items-center'>
			<LoginForm className='w-[90%] min-w-[320px] max-w-[500px] p-5 rounded-lg bg-white shadow-lg' />
		</div>
	);
};

export default Login;
