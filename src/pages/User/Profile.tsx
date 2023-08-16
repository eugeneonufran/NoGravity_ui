import { AuthContext } from "../../contexts/AuthContext";
import { IUser } from "../../models/IUser";
import { useContext } from "react";

interface ProfileProps {
  user: IUser;
}

export const Profile = ({ user }: ProfileProps) => {
  return (
    <div>
      <h2>User Profile</h2>
      <p>ID: {user.id}</p>
      <p>
        Name: {user.firstName} {user.secondName}
      </p>
      <p>Email: {user.email}</p>
    </div>
  );
};
