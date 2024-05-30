import { FC } from 'react';
import rowStyles from './row.module.css';
import Cell from '../cell/cell';

interface IRowProps {
  values: any[];
  isHeading?: boolean;
}

const Row: FC<IRowProps> = ({ values, isHeading = false }) => {
  return (
    <div className={rowStyles.container}>
      {values.map((value, index) => (
        <Cell key={index} text={value} isBold={index !== 0 || isHeading} />
      ))}
    </div>
  );
}

export default Row;
