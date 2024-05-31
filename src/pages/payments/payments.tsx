import { FC, useEffect, useState } from 'react';
import paymentsStyles from './payments.module.css';
import DateFilter from '../../components/date-filter/date-filter';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import BarChart from '../../components/bar-chart/bar-chart';
import { fetchPayments } from '../../store/slices/paymentsSlice';
import Table from '../../components/table/table';
import { TPayment, TUserInfo } from '../../utils/types';
import PieChart from '../../components/pie-chart/pie-chart';
import Overlay from '../../components/overlay/overlay';

const Payments: FC = () => {
  const dispatch = useAppDispatch();
  const startDate = useAppSelector(store => store.payments.startDate);
  const endDate = useAppSelector(store => store.payments.endDate);
  const exactDate = useAppSelector(store => store.payments.exactDate);
  const filterType = useAppSelector(store => store.payments.filterType);
  const payments = useAppSelector(store => store.payments.payments);
  const isMenuOpen = useAppSelector(store => store.menu.isMenuOpen);
  const [isFiltersVisible, setIsFilterVisible] = useState<boolean>(false);

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

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
      {isMenuOpen && <Overlay />}
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
          <Table
            items={payments.results.map(({ id, user, product, price, pay_date,  }: { id: number; user: TUserInfo; product: string; price: number; pay_date: string; }) => ({
              id,
              user: user.username,
              product,
              price,
              pay_date: formatDate(pay_date),
            }))}
            columns={['Пользователь', 'Кофе', 'Цена', 'Дата Покупки']}
          />
        </div>
        <div className={paymentsStyles.pieContainer}>
          <PieChart
            items={payments.results.reduce((groupedPayments: {[key: string]: number}, payment: TPayment) => {
              if (payment.product in groupedPayments) {
                groupedPayments[payment.product] += payment.price;
              } else {
                groupedPayments[payment.product] = payment.price;
              }
              return groupedPayments;
            }, {} as {[key: string]: number})}
            header="Отчёт по продуктам"
          />
          <PieChart
            items={payments.results.reduce((allPayments, payment) => {
              allPayments['Всего'] += payment.price;
              return allPayments;
            }, {'Всего': 0})}
            header="Всего потрачено"
          />
        </div>
      </div>
    </section>
  )
}

export default Payments;