import { FC } from 'react';
import paginationStyles from './pagination.module.css';
import ReactPaginate from 'react-paginate';
import backwardButton from '../../images/backward.svg';
import forwardButton from '../../images/forward.svg';
import ArrowButton from '../../components/arrow-button/arrow-button';
import { TPageClickEvent } from '../../utils/types';
import { useResize } from '../../hooks/useResize';

interface IPaginationProps {
  currentItemsQuantity: number;
  allItemsQuantity: number;
  pagesQuantity: number;
  handlePageClick: (event: TPageClickEvent) => void;
}

const Pagination: FC<IPaginationProps> = ({ currentItemsQuantity, allItemsQuantity, pagesQuantity, handlePageClick }) => {
  const { width } = useResize();

  return (
    <div className={paginationStyles.container}>
      {width > 550 &&
        <p className={paginationStyles.paragraph}>{`Showing ${currentItemsQuantity} of ${allItemsQuantity} Results`}</p>
      }
      <ReactPaginate
        previousLabel={<ArrowButton imagePath={backwardButton} alt="Кнопка назад" />}
        nextLabel={<ArrowButton imagePath={forwardButton} alt="Кнопка вперёд" />}
        breakLabel={"..."}
        pageCount={pagesQuantity}
        marginPagesDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={paginationStyles.pagination}
        pageClassName={paginationStyles.pageButton}
        pageLinkClassName={paginationStyles.pageLink}
        previousClassName={paginationStyles.backwardButton}
        previousLinkClassName={paginationStyles.backwardLink}
        nextClassName={paginationStyles.forwardButton}
        nextLinkClassName={paginationStyles.forwardLink}
        breakClassName={paginationStyles.break}
        breakLinkClassName={paginationStyles.breakLink}
        activeClassName={paginationStyles.active}
      />
    </div>
  )
}

export default Pagination;