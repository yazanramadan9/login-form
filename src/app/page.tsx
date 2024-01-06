"use client";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useQuery } from "react-query";
import { User } from "@/models/user.model";
import * as usersApi from "@/client-api/users.api";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/shared/loading-spinner";

export default function Home() {
	const { data: session } = useSession();
	const [users, setUsers] = useState<User[]>([]);

	const { data: usersRes, isLoading } = useQuery<User[]>({
		queryKey: [usersApi.keysEnum.users],
		queryFn: () => usersApi.getUsers(),
	});

	useEffect(() => {
		if (usersRes) {
			setUsers(usersRes);
		}
		console.log("users", users);
	}, [usersRes]);

	return (
		<div className='self-stretch container mx-auto'>
			{!!session?.user && (
				<div className='py-10 text-3xl text-center'>
					<p>
						<strong>
							Congratulations{" "}
							{/* {session?.user?.firstName}{" "}{session?.user?.lastName} ! */}
						</strong>
						You are now{" "}
						<span className='text-blue-500'>Logged in</span> !
					</p>
				</div>
			)}

			{!session?.user && (
				<>
					<div className='flex flex-col gap-5 p-5'>
						<p className='text-2xl'>
							You are{" "}
							<span className='font-semibold text-rose-400'>
								not logged in
							</span>
							, you can use the{" "}
							<span className='font-semibold'>username</span> of
							anyone of the following users.
						</p>
						<p className='text-2xl'>
							All of them have the same password which is{" "}
							<span className='font-semibold'>123123123</span>
						</p>
					</div>
					<div className='p-5 xl:p-10'>
						<h1 className='text-3xl font-bold'>Available Users</h1>
						{isLoading && (
							<div className='my-4'>
								<LoadingSpinner
									message='loading users ...'
									className='w-10 h-10 text-blue-500'
								/>
							</div>
						)}
						{!!users?.length && (
							<div className='flex flex-wrap -mx-4'>
								{!isLoading &&
									users.map((user) => (
										<div
											key={user.id}
											className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4'>
											<div className='bg-white rounded-lg overflow-hidden shadow-md p-6'>
												<h3 className='text-lg font-semibold mb-2'>{`${user.username}`}</h3>
												<p className='text-gray-600'>
													First Name: {user.firstName}
												</p>
												<p className='text-gray-600'>
													Last Name: {user.lastName}
												</p>
												<p className='text-gray-600'>
													Role: {user.role}
												</p>
											</div>
										</div>
									))}
							</div>
						)}
					</div>
				</>
			)}
		</div>
	);
}
