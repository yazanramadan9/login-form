import Link from "next/link";

export default function Home() {
	return (
		<main className=''>
			<div className='flex justify-end p-5'>
				<Link
					href='./auth/login'
					className='p-4 bg-green-600 text-white rounded'>
					Open Login Page
				</Link>
			</div>
		</main>
	);
}
