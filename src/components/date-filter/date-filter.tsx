import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dateFilterStyles from './date-filter.module.css';

const DateFilter: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [exactDate, setExactDate] = useState<Date | null>(null);
  const [filterType, setFilterType] = useState<'exact' | 'range'>('exact');

  const handleExactDateChange = (date: Date | null) => {
    setExactDate(date);
    setStartDate(null);
    setEndDate(null);
  };

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    setExactDate(null);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
    setExactDate(null);
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
            onChange={() => setFilterType('exact')}
          />
          Точная дата
        </label>
        <label className={dateFilterStyles.label}>
          <input
            className={dateFilterStyles.input}
            type="radio"
            value="range"
            checked={filterType === 'range'}
            onChange={() => setFilterType('range')}
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