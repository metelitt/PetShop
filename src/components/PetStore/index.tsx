import React, { useEffect, useState } from "react";
import { fetchPets, getInventoryByStatus, getPetById } from "../../api";
import "./PetStore.css";

interface Pet {
  id: number;
  name: string;
  photoUrls: string[];
  tags: { id: number; name: string }[];
  status: "available" | "pending" | "sold";
}

const PetStore: React.FC = () => {
  const [inventory, setInventory] = useState<any>({});
  const [showInventory, setShowInventory] = useState<boolean>(false);
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [searchId, setSearchId] = useState<string>("");

  useEffect(() => {
    const getPets = async () => {
      try {
        const response = await fetchPets();
        const petsData = response.data;
        setPets(petsData);
      } catch (error) {
        console.error("Error fetching pets:", error);
      } finally {
        setLoading(false);
      }
    };

    getPets();
  }, []);

  const handleShowInventory = async () => {
    try {
      const response = await getInventoryByStatus();
      const inventoryData = response.data;
      setInventory(inventoryData);
      setShowInventory(true);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  const handleSelectPet = async (petId: number) => {
    try {
      const response = await getPetById(petId);
      const selectedPetData = response.data;
      setSelectedPet(selectedPetData);
    } catch (error) {
      console.error("Error fetching selected pet:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const petId = parseInt(searchId, 10);
      if (isNaN(petId)) {
        console.error("Invalid pet ID. Please enter a valid number.");
        return;
      }

      await handleSelectPet(petId);
    } catch (error) {
      console.error("Error searching for pet:", error);
    }
  };

  return (
    <div className="pet-store">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div>
            <label>
              Найти питомца через Id:
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
            </label>
            <button onClick={handleSearch}>Найти</button>
          </div>
          <div>
            <button onClick={handleShowInventory}>Показать данные</button>
            {showInventory && (
              <div>
                <h2>Inventory</h2>
                <pre>{JSON.stringify(inventory, null, 2)}</pre>
              </div>
            )}
          </div>
          <h2>Список питомцев</h2>
          <ul className="pets">
            {pets.map((pet) => (
              <li key={pet.id}>
                <p onClick={() => handleSelectPet(pet.id)}>{pet.name}</p>
                <p>{pet.id}</p>
              </li>
            ))}
          </ul>
          {selectedPet && (
            <div>
              <h2>Выбранный питомец</h2>
              <p>Имя: {selectedPet.name}</p>
              <p>Статус: {selectedPet.status}</p>
              {selectedPet.photoUrls.length > 0 && (
                <div className="img-container">
                  <p>Photos:</p>
                  <ul>
                    {selectedPet.photoUrls.map((photo, index) => (
                      <li key={index}>
                        <img
                          src={photo}
                          alt={`Pet ${selectedPet.name} Photo ${index + 1}`}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PetStore;
