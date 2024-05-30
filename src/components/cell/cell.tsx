import { FC } from 'react';
import cellStyles from './cell.module.css';

interface ICellProps {
  text: string;
  isBold: boolean;
}

const UserCell: FC<ICellProps> = ({ text, isBold }) => {
  return (
    <div className={cellStyles.container}>
      <p className={`${cellStyles.text} ${isBold ? cellStyles.bold : ''}`}>{text}</p>
    </div>
  )
}

export default UserCell;