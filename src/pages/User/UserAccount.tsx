import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Credentials } from "./Credentials";

interface UserAccountProps {}

export const UserAccount = ({}: UserAccountProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, []);
  return (
    <div>
      <Credentials />
    </div>
  );
};
