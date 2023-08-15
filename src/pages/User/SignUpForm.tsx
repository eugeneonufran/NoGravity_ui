import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { IUserRegister } from "../../models/IUser";

export const SignUpForm = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoToLogin = () => {
    navigate("/login");
  };

  const handleRegister = async () => {
    const userToRegister: IUserRegister = {
      firstName,
      secondName,
      email,
      password,
    };
    const r = await register(userToRegister);
    if (r.code === "200") {
      navigate("/login");
    }
    console.log(r);
  };
  return (
    <div style={{ marginTop: "50px" }}>
      <div>
        <label>First Name:</label>
        <input
          type='firstName'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          onBlur={(e) => setFirstName(e.target.value)}
          onFocus={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Second Name::</label>
        <input
          type='secondName'
          value={secondName}
          onChange={(e) => setSecondName(e.target.value)}
          onBlur={(e) => setSecondName(e.target.value)}
          onFocus={(e) => setSecondName(e.target.value)}
          required
        />
      </div>
      <div style={{ marginTop: "50px" }}>
        <label>Email:</label>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={(e) => setEmail(e.target.value)}
          onFocus={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={(e) => setPassword(e.target.value)}
          onFocus={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type='button' onClick={handleGoToLogin}>
        Got to Sign Up
      </button>
      <button type='button' onClick={handleRegister}>
        Register
      </button>
    </div>
  );
};
