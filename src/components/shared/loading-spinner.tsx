interface Props {
	message: string;
	className?: string;
}
const LoadingSpinner = ({
	message,
	className = "h-7 w-7 text-blue-500",
}: Props) => {
	return (
		<div className='flex gap-3 items-center'>
			<svg
				className={`animate-spin ${className}`}
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'>
				<circle
					className='opacity-25'
					cx='12'
					cy='12'
					r='10'
					stroke='currentColor'
					strokeWidth='4'></circle>
				<path
					className='opacity-75'
					fill='currentColor'
					d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5a8 8 0 018-8h4a12 12 0 00-12 12l.001-4zm10-9a8 8 0 01-8 8v4a12 12 0 0012-12h-4z'></path>
			</svg>
			<span>{message}</span>
		</div>
	);
};

export default LoadingSpinner;
