import { FC } from 'react';
import userCellStyles from './user-cell.module.css';

interface IUserCellProps {
  text: string;
}

const UserCell: FC<IUserCellProps> = ({ text }) => {
  return (
    <div className={userCellStyles.container}>
      <p className={userCellStyles.text}>{text}</p>
    </div>
  )
}

export default UserCell;