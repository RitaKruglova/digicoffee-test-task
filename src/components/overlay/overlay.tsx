import { FC } from 'react';
import overlayStyles from './overlay.module.css';

const Overlay: FC = () => {
  return (
    <div className={overlayStyles.overlay}></div>
  )
}

export default Overlay;