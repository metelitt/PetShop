import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">Мир Животных</div>
        <nav>
          <ul>
            <li>
              <Link to="/">Главная</Link>
            </li>
            <li>
              <Link to="/addpet">Добавить питомца</Link>
            </li>
            <li>
              <Link to="/login">Вход</Link>
            </li>
            <li>
              <Link to="/register">Регистрация</Link>
            </li>
            <li>
              <Link to="/user">Данные</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
