import { useState } from "react";
import styles from "./User.module.scss";
import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUpForm";

export const Credentials = () => {
  return (
    <div className={styles.user}>
      <LoginForm />
    </div>
  );
};
