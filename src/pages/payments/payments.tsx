import { FC, useEffect, useState } from 'react';
import paymentsStyles from './payments.module.css';
import DateFilter from '../../components/date-filter/date-filter';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import BarChart from '../../components/bar-chart/bar-chart';
import { fetchPayments } from '../../store/slices/paymentsSlice';

const Payments: FC = () => {
  const dispatch = useAppDispatch();
  const startDate = useAppSelector(store => store.payments.startDate);
  const endDate = useAppSelector(store => store.payments.endDate);
  const exactDate = useAppSelector(store => store.payments.exactDate);
  const filterType = useAppSelector(store => store.payments.filterType);
  const [isFiltersVisible, setIsFilterVisible] = useState<boolean>(false);

  function handleFiltrersVisibility(): void {
    setIsFilterVisible(!isFiltersVisible);
  }

  function selectFormattedDate() {
    if (filterType === 'exact' && exactDate) {
      return exactDate.toLocaleDateString();
    }
    if (filterType === 'range' && startDate && endDate) {
      return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
    }
    return 'Фильтры не применены';
  };

  useEffect(() => {
    dispatch(fetchPayments({ startDate, endDate, exactDate }));
  }, [dispatch, startDate, endDate, exactDate]);

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
      <div className={paymentsStyles.selectedFiltersContainer}>
        <p className={paymentsStyles.selectedFiltersText}>{`Применены фильтры: ${selectFormattedDate()}`}</p>
      </div>
      <div className={paymentsStyles.chartsContainer}>
        <div className={paymentsStyles.barContainer}>
          <BarChart />
        </div>
        <div className={paymentsStyles.pieContainer}>

        </div>
      </div>
    </section>
  )
}

export default Payments;