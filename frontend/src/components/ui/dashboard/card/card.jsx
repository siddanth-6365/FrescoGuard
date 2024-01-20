// import { MdSupervisedUserCircle,MdLocalFireStation } from "react-icons/md";
import { FaTemperatureHigh } from "react-icons/fa";
import { SiOxygen } from "react-icons/si";
import { WiHumidity } from "react-icons/wi";
import styles from "./card.module.css";

const CardIcons = {
  Temperature: FaTemperatureHigh,
  Humidity: WiHumidity,
  Oxygen: SiOxygen,
};

const Card = ({ item, colorTheme }) => {
  const IconComponent = CardIcons[item.title]; // Select icon dynamically based on item.title

  if (!IconComponent) {
    // Handle the case where the icon is not found
    return null;
  }

  return (
    <div className={`${styles.container} ${styles[colorTheme]}`}>
      <IconComponent size={24} />
      <div className={styles.texts}>
        <span className={styles.title}>{item.title}</span>
        <span className={styles.number}>{item.number}</span>
        <span className={styles.detail}>
          <span className={item.change > 0 ? styles.positive : styles.negative}>
            {item.change}%
          </span>{" "}
          {item.change > 0 ? "more" : "less"} than the previous week
        </span>
      </div>
    </div>
  );
};

export default Card;
