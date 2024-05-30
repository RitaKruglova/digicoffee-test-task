import { FC, useState } from 'react';
import paymentsStyles from './payments.module.css';
import DateFilter from '../../components/date-filter/date-filter';

const Payments: FC = () => {
  const [isFiltersVisible, setIsFilterVisible] = useState<boolean>(false);

  function handleFiltrersVisibility(): void {
    setIsFilterVisible(!isFiltersVisible);
  }

  return (
    <section className={paymentsStyles.container}>
      <button
        className={paymentsStyles.showFiltersButton}
        type="button"
        onClick={handleFiltrersVisibility}
      >
        {isFiltersVisible ? 'Скрыть фильтры' : 'Показать фильтры'}
      </button>
      {isFiltersVisible && <DateFilter />}
    </section>
  )
}

export default Payments;