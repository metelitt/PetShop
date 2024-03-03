import React, { useState, ChangeEvent, FormEvent } from "react";
import { updateUser } from "../../api";

interface UpdateUserFormProps {
  userId: string;
  onUpdateSuccess: () => void;
}

const UpdateUserForm: React.FC<UpdateUserFormProps> = ({
  userId,
  onUpdateSuccess,
}) => {
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    phone: "",
    userStatus: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Включаем идентификатор пользователя в объект с обновленными данными
      const updatedDataWithId = { ...formData, id: userId };

      // Вызываем функцию для обновления данных пользователя
      await updateUser(userId, updatedDataWithId);

      // Обработка успешного обновления
      console.log("User updated successfully");
      onUpdateSuccess();
    } catch (error) {
      // Обработка ошибки обновления
      console.error("Error updating user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Имя:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Фамилия:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
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

      <label>
        Телефон:
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Статус пользователя:
        <input
          type="number"
          name="userStatus"
          value={formData.userStatus}
          onChange={handleChange}
        />
      </label>
      <br />

      <button type="submit">Изменить данные</button>
    </form>
  );
};

export default UpdateUserForm;
