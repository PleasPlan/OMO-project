import styles from "./RadioGroup.module.css";

export const RadioGroup = ({ label, children }) => (
    <fieldset className={styles["radio-container"]}>
      <legend>{label}</legend>
      {children}
    </fieldset>
  );
