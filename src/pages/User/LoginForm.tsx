import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { user, login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedLoginData = { email, password };
    const v = await login(updatedLoginData);

    if (v.code === "200") {
      console.log(user);
      navigate("/userAccount");
    }
  };

  const handleGetUser = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleGoToSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    navigate("/signUp");
  };

  return (
    <div>
      <div style={{ marginTop: "50px" }}>
        <div>{user?.id}</div>
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
      <button type='button' onClick={handleLogin}>
        Login
      </button>

      <button type='button' onClick={handleGoToSignUp}>
        Got to Sign Up
      </button>
    </div>
  );
};
