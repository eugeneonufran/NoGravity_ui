import BookingRoutes from "./BookingRoutes";
import styles from "./Home.module.scss";

export const Home = () => {
  return (
    <div className={styles.home}>
      <BookingRoutes />
    </div>
  );
};
