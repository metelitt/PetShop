import React, { ChangeEvent, useState } from "react";
import { loginUser } from "../../../api"; // Замените на свой модуль с запросами к API
import "./Login.css";
import { Link } from "react-router-dom";
const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData.username, formData.password);
      console.log("User logged in successfully:", response.data);
      // Добавьте обработку успешного входа, например, перенаправление на другую страницу
    } catch (error) {
      console.error("Error logging in:", error);
      // Добавьте обработку ошибки входа
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Никнейм:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Пароль:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />

        <Link to="/">
          <button type="submit">Войти</button>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
