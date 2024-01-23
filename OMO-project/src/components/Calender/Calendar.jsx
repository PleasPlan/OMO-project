import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // css import 
import { ko } from "date-fns/esm/locale";
import styles from "./Calendar.module.css";
import { getMonth, getYear } from 'date-fns';
import range from "lodash/range";



const Calendar = () => {
  
  const [startDate, setStartDate] = useState(new Date());
  const years = range(1800, getYear(new Date()) + 1, 1);
  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];
  return (
    <DatePicker 
    selected={startDate} 
    onChange={date => setStartDate(date)}
    locale={ko}                   // 한글로 변경
    dateFormat="yyyy / MM / dd" // 시간 포맷 변경
    showPopperArrow={false}       // 화살표 변경
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
          value={months[getMonth(date)]}
          onChange={({ target: { value } }) =>
            changeMonth(months.indexOf(value))
          }
        >
          {months.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
    

        <button  className={styles["custom-header-button-right"]} onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
          {">"}
        </button>
      </div>
    )}
    
    />
  );
};

export default Calendar

