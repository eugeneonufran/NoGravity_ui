import BookingRoutes from "./BookingRoutes";
import { Hero } from "./Hero";
import styles from "./Home.module.scss";

export const Home = () => {
  return (
    <div className={styles.home}>
      <Hero />
      <BookingRoutes />
    </div>
  );
};
