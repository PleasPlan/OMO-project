import styles from "./Edit.module.css";
import {useNavigate, useParams} from "react-router-dom";

const Edit = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const goEdit = () => {
    navigate(`/MyCourseEdit/${id}`);
  };

  return (
    <div>
      <button type="button" className={styles["edit-button"]} onClick={goEdit}>
        편집
      </button>
    </div>
  );
};
export default Edit;
