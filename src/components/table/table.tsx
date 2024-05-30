import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import tableStyles from './table.module.css';
import Row from '../row/row';
import Pagination from '../pagination/pagination';
import { TPageClickEvent } from '../../utils/types';

interface ITableProps {
  items: {[key: string]: any}[];
  columns: string[];
}

const Table : FC<ITableProps> = ({ items, columns }) => {
  const [pagesQuantity, setPagesQuantity] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageClick = (event: TPageClickEvent) => {
    setCurrentPage(event.selected + 1);
  };

  useEffect(() => {
    setPagesQuantity(Math.ceil(items.length / 5));
  }, [items]);
  
  const getCurrentItems = useCallback(() => {
    const startIndex = (currentPage - 1) * 5;
    const endIndex = startIndex + 5;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage]);

  const currentItems = useMemo(() => getCurrentItems(), [getCurrentItems]);

  return (
      <>
      <div className={tableStyles.container}>
        <Row values={columns} isHeading />
        {currentItems ? (
          currentItems.map((item) => (
            <Row
              key={item.id}
              values={Object.values(item).slice(1)}
            />
          ))
        ) : (
          <p className={tableStyles.loading}>Loading...</p>
        )}
      </div>
      {items.length > 5 &&
        <Pagination
          currentItemsQuantity={currentItems.length}
          allItemsQuantity={items.length}
          pagesQuantity={pagesQuantity}
          handlePageClick={handlePageClick}
        />
      }
    </>
  )
}

export default Table;