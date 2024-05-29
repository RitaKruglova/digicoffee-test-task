import { FC, useEffect } from 'react';
import profileStyles from './profile.module.css';
import ProfileInfo from '../../components/profile-info/profile-info';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchUserById } from '../../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const Profile: FC = () => {
  const userInfo = useAppSelector(store => store.user.userInfo);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserById(Number(localStorage.getItem('userId'))));
  }, [dispatch]);

  function handleBackClick(): void {
    navigate(-1);
  }

  return (
    <section className={profileStyles.container}>
      <h2 className={profileStyles.title}>Мой профиль</h2>
      <div className={profileStyles.nameContainer}>
        <ProfileInfo name="Имя" value={userInfo.first_name} />
        <ProfileInfo name="Фамилия" value={userInfo.last_name} />
      </div>
      <ProfileInfo name="Username" value={userInfo.username} />
      <ProfileInfo name="Email" value={userInfo.email} />
      {localStorage.getItem('role') === 'admin' && <ProfileInfo name="Роль" value="Администратор" />}
      <button
        className={profileStyles.button}
        type="button"
        onClick={handleBackClick}
      >
        Назад
      </button>
    </section>
  )
}

export default Profile;