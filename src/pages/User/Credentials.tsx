import { useState } from "react";
import styles from "./User.module.scss";
import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUpForm";

export const Credentials = () => {
  const [isLogin, setIsLogin] = useState({
    email: "w",
    password: "we",
  });

  return (
    <div className={styles.user}>
      {isLogin ? <LoginForm /> : <SignUpForm />}
    </div>
  );
};
