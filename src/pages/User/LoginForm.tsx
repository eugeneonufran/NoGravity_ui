import React, { useContext, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { ApiContext } from "../../contexts/ApiContext";
import { IUserLogin } from "../../models/IUser";

export const LoginForm = () => {
  const { api_domain } = useContext(ApiContext);
  const { login, getUser, logout } = useFetch(api_domain);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedLoginData = { email, password };
    const v = await login(updatedLoginData);
    console.log(v);
  };

  const handleGetUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = await getUser();
    console.log(v);
  };

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    const v = logout();
    console.log(v);
  };

  return (
    <div>
      <div>
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
      <button type='button' onClick={handleChange}>
        Login
      </button>
      <button type='button' onClick={handleGetUser}>
        GetUser
      </button>
      <button type='button' onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};
