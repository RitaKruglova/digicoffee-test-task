import { FC, useEffect } from 'react';
import headerStyles from './header.module.css';
import logo from '../../images/logo.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchUserById, fetchUsers } from '../../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { loginRoure } from '../../utils/constants';

const Header: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(store => store.user.userInfo);

  useEffect(() => {
    if (localStorage.getItem('userId')) {
      dispatch(fetchUserById(Number(localStorage.getItem('userId'))));
    } else {
      dispatch(fetchUsers());
    }
  }, [dispatch]);

  function logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('role');

    navigate(loginRoure);
  }

  return (
    <header className={headerStyles.container}>
      <img className={headerStyles.logo} src={logo} alt="Логотип" />
      <div className={headerStyles.info}>
        <p className={headerStyles.greeting}>{`Добро пожаловать, ${userInfo.first_name}`}</p>
        {localStorage.getItem('role') === 'admin' && 
          <p className={headerStyles.role}>Роль: Администратор</p>
        }
        <button
          className={headerStyles.button}
          type="button"
          onClick={logout}
        >
          Выход
        </button>
      </div>
    </header>
  )
}

export default Header;