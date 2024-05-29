import { FC } from 'react';
import usersStyles from './users.module.css';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { fetchUsers } from '../../store/slices/userSlice';

const Users: FC = () => {
  const dispatch = useAppDispatch();

  dispatch(fetchUsers());

  return (
    <section className={usersStyles.container}>
      <div className={usersStyles.userContainer}>
        
      </div>
    </section>
  )
}

export default Users;