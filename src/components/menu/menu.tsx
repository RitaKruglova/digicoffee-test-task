import { FC } from 'react';
import menuStyles from './menu.module.css';
import { NavLink } from 'react-router-dom';
import { paymentsRoute, profileRoute, usersRoute } from '../../utils/constants';
import bagIcon from '../../images/bag-icon.svg';
import dollarIcon from '../../images/dollar-icon.svg';
import { useResize } from '../../hooks/useResize';

const Menu: FC = () => {
  const { width } = useResize();
  
  return (
    <nav className={menuStyles.container}>
      <h3 className={menuStyles.title}>Главное</h3>
      <NavLink
        to={profileRoute}
        className={({isActive}) => `${menuStyles.link} ${isActive ? menuStyles.active : ''}`}
      >
        <img className={menuStyles.icon} src={bagIcon} alt="Иконка портфель" />
        Мой профиль
      </NavLink>
      <h3 className={menuStyles.title}>Пользователи</h3>
      {localStorage.getItem('role') === 'admin' &&
        <NavLink
          to={usersRoute}
          className={({isActive}) => `${menuStyles.link} ${isActive ? menuStyles.active : ''}`}
        >
          <img className={menuStyles.icon} src={bagIcon} alt="Иконка портфель" />
          Пользователи
        </NavLink>
      }
      <NavLink
        to={paymentsRoute}
        className={({isActive}) => `${menuStyles.link} ${isActive ? menuStyles.active : ''}`}
      >
        <img className={menuStyles.icon} src={dollarIcon} alt="Иконка доллар" />
        {localStorage.getItem('role') === 'admin' ? 'Покупки' : 'Мои покупки'}
      </NavLink>
    </nav>
  );
}

export default Menu;