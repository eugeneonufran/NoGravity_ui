import styles from "./Loading.module.scss";

export const Loading = ({ message }: { message: string }) => {
  return <div className={styles.loading}>{message}</div>;
};
