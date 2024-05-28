import { FC } from 'react';
import burgerButtonStyles from './burger-button.module.css';

interface IBurgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const BurgerButton: FC<IBurgerButtonProps> = ({ isOpen, onClick }) => {
  return (
    <div
      className={`${burgerButtonStyles.button} ${isOpen ? burgerButtonStyles.open : ''}`}
      onClick={onClick}
    >
    </div>
  )
}

export default BurgerButton;