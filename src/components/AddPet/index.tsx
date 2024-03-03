import React, { useState, ChangeEvent, FormEvent } from "react";
import { addPet } from "../../api";
import "./AddPet.css";
import { Link } from "react-router-dom";
interface NewPetFormProps {
  onPetAdded: () => void;
}

const NewPetForm: React.FC<NewPetFormProps> = ({ onPetAdded }) => {
  const [newPet, setNewPet] = useState({
    category: { id: 0, name: "" },
    name: "",
    photoUrls: [""],
    tags: [{ id: 0, name: "" }],
    status: "available" as const,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "categoryName") {
      setNewPet((prevPet) => ({
        ...prevPet,
        category: { ...prevPet.category, name: value },
      }));
    } else if (name === "photoUrls") {
      setNewPet((prevPet) => ({
        ...prevPet,
        photoUrls: [value],
      }));
    } else if (name === "tagName") {
      setNewPet((prevPet) => ({
        ...prevPet,
        tags: [{ ...prevPet.tags[0], name: value }],
      }));
    } else {
      setNewPet((prevPet) => ({ ...prevPet, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await addPet(newPet);
      onPetAdded();
    } catch (error) {
      console.error("Error adding pet:", error);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label>
        Кличка питомца:
        <input
          type="text"
          name="name"
          value={newPet.name}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Категория:
        <input
          type="text"
          name="categoryName"
          value={newPet.category.name}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Фото(URL):
        <input
          type="text"
          name="photoUrls"
          value={newPet.photoUrls[0]}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Tэг:
        <input
          type="text"
          name="tagName"
          value={newPet.tags[0].name}
          onChange={handleChange}
        />
      </label>
      <br />

      <label>
        Статус:
        <select
          className="status-select"
          name="status"
          value={newPet.status}
          onChange={handleChange}
        >
          <option value="available">Available</option>
          <option value="pending">Pending</option>
          <option value="sold">Sold</option>
        </select>
      </label>
      <br />

      <Link to="/">
        <button type="submit">Добавить питомца</button>
      </Link>
    </form>
  );
};

export default NewPetForm;
