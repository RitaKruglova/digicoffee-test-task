import { FC, useEffect, useMemo, useState } from 'react';
import usersStyles from './users.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchUsers } from '../../store/slices/userSlice';
import UserRow from '../../components/user-row/user-row';
import { useNavigate } from 'react-router-dom';
import { TPageClickEvent } from '../../utils/types';
import ReactPaginate from 'react-paginate';
import backwardButton from '../../images/backward.svg';
import forwardButton from '../../images/forward.svg';
import ArrowButton from '../../components/arrow-button/arrow-button';
import Overlay from '../../components/overlay/overlay';

const Users: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const users = useAppSelector(store => store.user.users);
  const isMenuOpen = useAppSelector(store => store.menu.isMenuOpen);
  const [pagesQuantity, setPagesQuantity] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (localStorage.getItem('role') === 'user') {
      navigate(-1);
    }
  }, []);

  const handlePageClick = (event: TPageClickEvent) => {
    setCurrentPage(event.selected + 1);
  };

  useEffect(() => {
    setPagesQuantity(Math.ceil(users.results.length / 5));
  }, [dispatch, users.results]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const getCurrentUsers = () => {
    const startIndex = (currentPage - 1) * 5;
    const endIndex = startIndex + 5;
    return users.results.slice(startIndex, endIndex);
  };

  const currentUsers = useMemo(() => getCurrentUsers(), [users.results, currentPage]);

  return (
    <section className={usersStyles.container}>
      {isMenuOpen && <Overlay />}
      <div className={usersStyles.userContainer}>
        {users && users.results ? (
          currentUsers.map((user) => (
            <UserRow
              key={user.id}
              username={user.username}
              firstName={user.first_name}
              lastName={user.last_name}
              email={user.email}
              role={user.role}
            />
          ))
        ) : (
          <p className={usersStyles.loading}>Loading...</p>
        )}
      </div>
      {users.results.length > 5 &&
        <div className={usersStyles.paginationContainer}>
          <p className={usersStyles.paragraph}>{`Showing ${currentUsers.length} of ${users.results.length} Results`}</p>
          <ReactPaginate
            previousLabel={<ArrowButton imagePath={backwardButton} alt="Кнопка назад" />}
            nextLabel={<ArrowButton imagePath={forwardButton} alt="Кнопка вперёд" />}
            breakLabel={"..."}
            pageCount={pagesQuantity}
            marginPagesDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName={usersStyles.pagination}
            pageClassName={usersStyles.pageButton}
            pageLinkClassName={usersStyles.pageLink}
            previousClassName={usersStyles.backwardButton}
            previousLinkClassName={usersStyles.backwardLink}
            nextClassName={usersStyles.forwardButton}
            nextLinkClassName={usersStyles.forwardLink}
            breakClassName={usersStyles.break}
            breakLinkClassName={usersStyles.breakLink}
            activeClassName={usersStyles.active}
          />
        </div>
      }
    </section>
  )
}

export default Users;