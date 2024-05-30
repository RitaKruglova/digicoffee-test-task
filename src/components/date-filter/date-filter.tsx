import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setStartDate, setEndDate, setExactDate, setFilterType } from '../../store/slices/paymentsSlice';
import dateFilterStyles from './date-filter.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

const DateFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const startDate = useAppSelector(store => store.payments.startDate);
  const endDate = useAppSelector(store => store.payments.endDate);
  const exactDate = useAppSelector(store => store.payments.exactDate);
  const filterType = useAppSelector(store => store.payments.filterType);

  const handleExactDateChange = (date: Date | null) => {
    dispatch(setExactDate(date));
  };

  const handleStartDateChange = (date: Date | null) => {
    dispatch(setStartDate(date));
  };

  const handleEndDateChange = (date: Date | null) => {
    dispatch(setEndDate(date));
  };

  return (
    <div className={dateFilterStyles.container}>
      <div className={dateFilterStyles.radioGroup}>
        <label className={dateFilterStyles.label}>
          <input
            className={dateFilterStyles.input}
            type="radio"
            value="exact"
            checked={filterType === 'exact'}
            onChange={() => dispatch(setFilterType('exact'))}
          />
          Точная дата
        </label>
        <label className={dateFilterStyles.label}>
          <input
            className={dateFilterStyles.input}
            type="radio"
            value="range"
            checked={filterType === 'range'}
            onChange={() => dispatch(setFilterType('range'))}
          />
          Интервал дат
        </label>
      </div>

      {filterType === 'exact' ? (
        <div className={dateFilterStyles.datePicker}>
          <label>Выберите точную дату:</label>
          <DatePicker
            selected={exactDate}
            onChange={handleExactDateChange}
            dateFormat="yyyy-MM-dd"
            placeholderText="Выберите дату"
          />
        </div>
      ) : (
        <div className={dateFilterStyles.datePicker}>
          <label>Выберите интервал дат:</label>
          <div className={dateFilterStyles.dateRange}>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="yyyy-MM-dd"
              placeholderText="Начальная дата"
            />
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat="yyyy-MM-dd"
              placeholderText="Конечная дата"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DateFilter;