import { FC } from 'react';
import arrowButtonStyles from './arrow-button.module.css';

interface IArrowButtonProps {
  imagePath: string;
  alt: string;
}

const ArrowButton: FC<IArrowButtonProps> = ({ imagePath, alt }) => {
  return (
    <img src={imagePath} alt={alt} />
  )
}

export default ArrowButton;