"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const Header = () => {
	const { data: session } = useSession();

	return (
		<header className='bg-blue-500 p-4'>
			<div className='container mx-auto flex justify-between items-center gap-4'>
				<h1 className='text-white text-2xl font-semibold'>
					<Link href='/'>Greatest App ever</Link>
				</h1>
				<div>
					{session ? (
						<button
							className='bg-white text-blue-500 px-4 py-2 rounded-md mr-4'
							onClick={() => signOut()}>
							Sign Out
						</button>
					) : (
						<Link
							href='/auth/login'
							className='bg-white text-blue-500 px-4 py-2 rounded-md mr-4'>
							Login
						</Link>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
