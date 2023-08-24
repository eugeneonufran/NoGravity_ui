import { IUser } from "../../models/IUser";
import "./Profile.scss";

interface ProfileProps {
  user: IUser;
}

export const Profile = ({ user }: ProfileProps) => {
  return (
    <div className='profile-container'>
      <h2>User Profile</h2>
      <p>ID: {user.id}</p>
      <p>
        Name: {user.firstName} {user.secondName}
      </p>
      <p>Email: {user.email}</p>
    </div>
  );
};
