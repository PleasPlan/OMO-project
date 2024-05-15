import styles from "./Radio.module.css";


export const Radio = ({ children, value, name, defaultChecked, disabled, setGender }) => (
  <label>
    <input
      type="radio"
      value={value}
      name={name}
      defaultChecked={defaultChecked}
      disabled={disabled}
      className={styles["gender-input"]}
      onChange={(e) => setGender(e.target.value)}
    />
    {children}
  </label>
);
