"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Credentials } from "@/types";
import { useState } from "react";
import { signIn } from "next-auth/react";
import LoadingSpinner from "../shared/loading-spinner";

interface Props {
	className?: string;
}

const LoginForm = ({ className = "" }: Props) => {
	const [loginErrorMsg, setLoginErrorMsg] = useState<string>("");

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
			try {
				const res = await signIn("credentials", {
					redirectTo: "/",
					...values,
				});

				if (res?.error) {
					setLoginErrorMsg(res.error);
				} else {
					setLoginErrorMsg("");
				}
			} finally {
				// Set submitting to false after form submission (whether successful or not)
				formik.setSubmitting(false);
			}
		},
	});

	return (
		<div className={className}>
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
						placeholder='Enter your username here'
						className={`mb-1 p-2 rounded outline-0 border ${
							formik.errors.username && formik.touched.username
								? "border-rose-400 border"
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
						placeholder='Enter your password here'
						className={`mb-1 p-2 rounded outline-0 border ${
							formik.errors.password && formik.touched.password
								? "border-rose-400 border"
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
					{!!formik.isSubmitting && (
						<LoadingSpinner message='Loading...' />
					)}
				</div>
				<div className='flex justify-end'>
					<button
						type='submit'
						className={`px-5 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white ${
							formik.isSubmitting || !formik.isValid
								? "opacity-50 cursor-not-allowed hover:bg-blue-500"
								: "opacity-100"
						}`}>
						Login
					</button>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
