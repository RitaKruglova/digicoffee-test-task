import { FC } from 'react';
import profileInfoStyles from './profile-info.module.css';

interface IProfileInfoProps {
  name: string;
  value: string;
}

const ProfileInfo: FC<IProfileInfoProps> = ({ name, value }) => {
  return (
    <div className={profileInfoStyles.container}>
      <h3 className={profileInfoStyles.name}>{`${name}:`}</h3>
      <p className={profileInfoStyles.value}>{value}</p>
    </div>
  )
}

export default ProfileInfo;