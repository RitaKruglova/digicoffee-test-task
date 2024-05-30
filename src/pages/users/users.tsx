import { FC, useEffect, useMemo, useState } from 'react';
import usersStyles from './users.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchUsers } from '../../store/slices/userSlice';
import UserRow from '../../components/row/row';
import { useNavigate } from 'react-router-dom';
import { TPageClickEvent } from '../../utils/types';
import ReactPaginate from 'react-paginate';
import backwardButton from '../../images/backward.svg';
import forwardButton from '../../images/forward.svg';
import ArrowButton from '../../components/arrow-button/arrow-button';
import Overlay from '../../components/overlay/overlay';
import Pagination from '../../components/pagination/pagination';
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