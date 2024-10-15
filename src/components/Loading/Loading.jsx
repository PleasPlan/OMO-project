import styles from "./Loading.module.css";
import {BeatLoader} from "react-spinners";

export const Loading = () => {
  return(
  <>
    <div className={styles["login-loading-container"]}>
      <BeatLoader color="#cfbaff" cssOverride={{}} loading margin={5} size={20} speedMultiplier={2} />
      <div className={styles["login-loading"]}>Loading...</div>
    </div>
  </>
  )
};
