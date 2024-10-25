interface IButtonProps{
	buttonText: string;
	buttonType?: string;
	styles?: string;
	handleClick?: () => void
	disable?: boolean
};

export function MyButton({ buttonText, buttonType, styles, handleClick, disable }: IButtonProps){
	let style = 'bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover ';
	styles ? style += styles : style
	return(
		<button className={style} type={buttonType} onClick={handleClick} disabled={disable}>
			{buttonText}  
		</button>
	)
};