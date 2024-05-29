import { FC } from 'react';
import userRowStyles from './user-row.module.css';

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
      
    </div>
  )
}

export default UserRow;