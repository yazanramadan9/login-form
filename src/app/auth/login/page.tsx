"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import * as AuthApi from "../../../frontend/api/auth.service";
import { Credentials } from "@/frontend/types";
import { useState } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
	const [loginErrorMsg, setLoginErrorMsg] = useState<string>("");
	const router = useRouter();

	// Use useFormik hook to manage form state and submission
	const formik = useFormik<Credentials>({
		initialValues: {
			username: "",
			password: "",
		},
		validationSchema: Yup.object({
			username: Yup.string().required("Username is required"),
			password: Yup.string()
				.min(6, "Password must be at least 6 characters")
				.required("Password is required"),
		}),
		onSubmit: async (values) => {
			// Use Formik's setSubmitting to handle loading state
			try {
				await mutate(values);
			} finally {
				// Set submitting to false after form submission (whether successful or not)
				formik.setSubmitting(false);
			}
		},
	});

	const { mutate, isLoading } = useMutation({
		mutationKey: "USER_LOGIN",
		mutationFn: AuthApi.login,
		onSuccess: (res) => {
			setLoginErrorMsg("");
			// Go to homepage
			router.push("/");
		},
		onError: (err: AxiosError) => {
			// Handle failed mutation
			setLoginErrorMsg(err.message);
		},
		retry: 3, // Retry the mutation up to 3 times
	});

	return (
		<div className='min-h-screen flex justify-center items-center bg-slate-100'>
			<div className='w-[90%] min-w-[320px] max-w-[500px] p-5 rounded-lg bg-white shadow'>
				<h1 className='mb-5 text-center text-3xl font-bold'>Login</h1>
				{!!loginErrorMsg && (
					<div className='mb-5 p-3 bg-rose-50 text-rose-500'>
						{loginErrorMsg}
					</div>
				)}
				<form onSubmit={formik.handleSubmit}>
					<div className='flex flex-col py-2'>
						<label htmlFor='username'>Username</label>
						<input
							type='text'
							{...formik.getFieldProps("username")}
							placeholder='Username'
							className={`mb-1 p-2 rounded outline-0 border ${
								formik.errors.username &&
								formik.touched.username
									? "border-rose-400 border-[2px]"
									: ""
							}`}
						/>
						{formik.errors.username && formik.touched.username && (
							<div className='text-sm text-rose-400'>
								{formik.errors.username}
							</div>
						)}
					</div>
					<div className='flex flex-col py-2'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							{...formik.getFieldProps("password")}
							placeholder='Password'
							className={`mb-1 p-2 rounded outline-0 border ${
								formik.errors.password &&
								formik.touched.password
									? "border-rose-400 border-[2px]"
									: ""
							}`}
						/>
						{formik.errors.password && formik.touched.password && (
							<div className='text-sm text-rose-400'>
								{formik.errors.password}
							</div>
						)}
					</div>
					<div className='flex justify-end pe-3 h-10 pb-2'>
						{(isLoading || formik.isSubmitting) && (
							<span className='inline-flex items-center'>
								loading...
							</span>
						)}
					</div>
					<div className='flex justify-end'>
						<button
							type='submit'
							className={`px-5 py-3 rounded-lg bg-green-300 hover:bg-green-400 ${
								isLoading ||
								formik.isSubmitting ||
								!formik.isValid
									? "opacity-50 cursor-not-allowed hover:bg-green-300"
									: "opacity-100"
							}`}>
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
