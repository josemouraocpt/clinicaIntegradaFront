import React from 'react';
import Image from 'next/image';

interface IButtonImageProps {
  buttonText: string;
  buttonType?: string;
  styles?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export function MyButtonImage({ buttonText, buttonType, styles, imageSrc, imageAlt }: IButtonImageProps) {
  // Default base styles with fixed width and height
  let baseStyle = 'bg-button p-2 rounded-lg text-white text-lg hover:bg-button-hover flex items-center w-52 h-12';
  const combinedStyle = styles ? `${baseStyle} ${styles}` : baseStyle;

  return (
    <button className={combinedStyle} type={buttonType}>
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={imageAlt || 'Button image'}
          width={20} // Adjust as necessary
          height={20} // Adjust as necessary
          className="mr-2"
        />
      )}
      {buttonText}
    </button>
  );
}