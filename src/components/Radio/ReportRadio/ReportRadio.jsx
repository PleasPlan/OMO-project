import styles from "./ReportRadio.module.css";


export const ReportRadio = ({ children, value, name, defaultChecked, disabled, setSelectedReason }) => (
  <label>
    <input
      type="radio"
      value={value}
      name={name}
      defaultChecked={defaultChecked}
      disabled={disabled}
      className={styles["gender-input"]}
      onChange={(e) => setSelectedReason(e.target.value)}
    />
    {children}
  </label>
);
