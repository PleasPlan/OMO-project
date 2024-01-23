import styles from "./Weather.module.css";
import WeatherBanner from "../../assets/main/weather-banner.png";

export const Weather = () => (
    <>
       <div className={styles["main-weather-container"]}>
       <img className={styles["weather-banner"]} src={WeatherBanner} alt="날씨 배너" />
       </div>
    </>
  );