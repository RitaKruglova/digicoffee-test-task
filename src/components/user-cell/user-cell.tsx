import { FC } from 'react';
import userCellStyles from './user-cell.module.css';

interface IUserCellProps {
  text: string;
  isBold: boolean;
}

const UserCell: FC<IUserCellProps> = ({ text, isBold }) => {
  return (
    <div className={userCellStyles.container}>
      <p className={`${userCellStyles.text} ${isBold ? userCellStyles.bold : ''}`}>{text}</p>
    </div>
  )
}

export default UserCell;