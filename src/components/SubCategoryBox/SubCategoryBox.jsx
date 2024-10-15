import styles from "./SubCategoryBox.module.css";
import { Link } from "react-router-dom";

export const SubCategoryBox = ({ title, src }) => (
  <>
    <Link to={`/List/${encodeURIComponent(title)}`}> {/* URL 인코딩을 사용하여 공백 등의 문자 처리 */}
      <div className={styles["sub-category-box"]}>
        <span className={styles["sub-category-box-title"]}>{title}</span>
        <img className={styles["sub-category-box-img"]} src={src} alt={title} /> {/* alt 속성 추가 */}
      </div>
    </Link>
  </>
);
