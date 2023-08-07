import styles from "./Hero.module.scss";
import arrow from "../../assets/down.svg";

export const Hero = () => {
  const handleImageClick = () => {
    const targetElement = document.getElementById("booking_routes");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className={styles.hero_image}>
      <h1>NO GRAVITY</h1>
      <img
        className={styles.scroll_icon}
        src={arrow} // Replace with your image URL
        alt='Scroll Icon'
        onClick={handleImageClick}
      />
    </div>
  );
};
