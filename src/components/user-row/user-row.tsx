import { FC } from 'react';
import userRowStyles from './user-row.module.css';
import UserCell from '../user-cell/user-cell';

interface IUserRowProps {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

const UserRow: FC<IUserRowProps> = ({ username, firstName, lastName, email, role }) => {
  return (
    <div className={userRowStyles.container}>
      <UserCell text={username} isBold={false} />
      <UserCell text={firstName} isBold />
      <UserCell text={lastName} isBold />
      <UserCell text={email} isBold={false} />
      <UserCell text={role} isBold />
    </div>
  )
}

export default UserRow;