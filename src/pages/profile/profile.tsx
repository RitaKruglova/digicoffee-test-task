import { FC } from 'react';
import profileStyles from './profile.module.css';

const Profile: FC = () => {
  return (
    <section className={profileStyles.container}>
      <h2 className={profileStyles.title}>Мой профиль</h2>
      <div className={profileStyles.nameContainer}>
        
      </div>
    </section>
  )
}

export default Profile;