import { FC, useEffect } from 'react';
import usersStyles from './users.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchUsers } from '../../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import Overlay from '../../components/overlay/overlay';
import Table from '../../components/table/table';

const Users: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const users = useAppSelector(store => store.user.users);
  const isMenuOpen = useAppSelector(store => store.menu.isMenuOpen);

  useEffect(() => {
    if (localStorage.getItem('role') === 'user') {
      navigate(-1);
    }
  }, [navigate]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <section className={usersStyles.container}>
      {isMenuOpen && <Overlay />}
      <Table items={users.results} columns={['Username', 'Имя', 'Фамилия', 'Email', 'Роль']} />
    </section>
  )
}

export default Users;