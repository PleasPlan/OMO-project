import styles from "./Radio.module.css";


export const Radio = ({ children, value, name, defaultChecked, disabled }) => (
    <label>
      <input
        type="radio"
        value={value}
        name={name}
        defaultChecked={defaultChecked}
        disabled={disabled}
        className={styles["gender-input"]}
      />
      {children}
    </label>
  );
