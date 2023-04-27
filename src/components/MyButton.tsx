interface IButtonProps{
	buttonText: string;
};

export default function MyButton({ buttonText }: IButtonProps){
	return(
		<>
			<button className="bg-button p-2 px-6 rounded-lg text-white text-lg">
				{buttonText}
			</button>
		</>
	)
};