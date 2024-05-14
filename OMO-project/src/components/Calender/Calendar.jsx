import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import styles from "./Calendar.module.css";
import { getMonth, getYear } from 'date-fns';
import range from "lodash/range";

const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const years = range(1800, getYear(new Date()) + 1, 1);
  const months = range(0, 12); // 월을 숫자로 처리하도록 변경

  return (
    <DatePicker 
      selected={startDate} 
      onChange={date => setStartDate(date)}
      locale={ko}
      dateFormat="yyyy-MM-dd" // 일반적인 날짜 포맷으로 변경
      showPopperArrow={false}
      className={styles["date-picker"]}
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className={styles["custom-header-container"]}>
          <button className={styles["custom-header-button-left"]} onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            {"<"}
          </button>

          <select
            className={styles["select-year"]}
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            className={styles["select-date"]}
            value={getMonth(date)} // 현재 월의 숫자를 사용
            onChange={({ target: { value } }) => changeMonth(Number(value))}
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option + 1}월 
              </option>
            ))}
          </select>

          <button className={styles["custom-header-button-right"]} onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            {">"}
          </button>
        </div>
      )}
    />
  );
};

export default Calendar;
