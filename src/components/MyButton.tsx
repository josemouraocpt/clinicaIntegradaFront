interface IButtonProps{
	buttonText: string
	buttonType?: string 
};

export default function MyButton({ buttonText, buttonType }: IButtonProps){
	return(
		<>
			<button className="bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover" type={buttonType}>
				{buttonText} 
			</button>
		</>
	)
};