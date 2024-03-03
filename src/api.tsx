import axios, { AxiosResponse, AxiosError } from "axios";

interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  userStatus: number;
}

const BASE_URL = "https://petstore.swagger.io/v2";

// GET запросы
export const findPetsByStatus = async (
  status: string
): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.get(`${BASE_URL}/pet/findByStatus`, {
      params: { status },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios request error:", (error as AxiosError).message);
    } else {
      console.error("Error:", (error as Error).message);
    }
    throw error;
  }
};

export const loginUser = async (
  username: string,
  password: string
): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.get(`${BASE_URL}/user/login`, {
      params: { username, password },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios request error:", (error as AxiosError).message);
    } else {
      console.error("Error:", (error as Error).message);
    }
    throw error;
  }
};

export const getPetById = async (
  petId: number
): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.get(`${BASE_URL}/pet/${petId}`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios request error:", (error as AxiosError).message);
    } else {
      console.error("Error:", (error as Error).message);
    }
    throw error;
  }
};

export const getInventoryByStatus = async (): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.get(`${BASE_URL}/store/inventory`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios request error:", (error as AxiosError).message);
    } else {
      console.error("Error:", (error as Error).message);
    }
    throw error;
  }
};

export const fetchPets = async (): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/pet/findByStatus?status=pending`
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios request error:", (error as AxiosError).message);
    } else {
      console.error("Error:", (error as Error).message);
    }
    throw error;
  }
};

//Post запросы
export const addPet = async (newPet: {
  category: { id: number; name: string };
  name: string;
  photoUrls: string[];
  tags: { id: number; name: string }[];
  status: "available" | "pending" | "sold";
}): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.post(`${BASE_URL}/pet`, {
      category: newPet.category,
      name: newPet.name,
      photoUrls: newPet.photoUrls,
      tags: newPet.tags,
      status: newPet.status,
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios request error:", (error as AxiosError).message);
    } else {
      console.error("Error:", (error as Error).message);
    }
    throw error;
  }
};

export const registerUser = async (user: User): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.post(`${BASE_URL}/user`, user);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios request error:", (error as AxiosError).message);
    } else {
      console.error("Error:", (error as Error).message);
    }
    throw error;
  }
};

export const createUser = async (user: object): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.post(`${BASE_URL}/user`, user);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios request error:", (error as AxiosError).message);
    } else {
      console.error("Error:", (error as Error).message);
    }
    throw error;
  }
};

// PUT запросы
// Написан запрос но не использован
export const updatePet = async (pet: object): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.put(`${BASE_URL}/pet`, pet);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios request error:", (error as AxiosError).message);
    } else {
      console.error("Error:", (error as Error).message);
    }
    throw error;
  }
};
// Написан запрос но не использован
export const updatePetWithFormData = async (
  petId: number,
  name: string,
  status: string
): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/pet/${petId}`,
      `name=${name}&status=${status}`,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios request error:", (error as AxiosError).message);
    } else {
      console.error("Error:", (error as Error).message);
    }
    throw error;
  }
};

export const updateUser = async (
  userId: string,
  updatedUserData: Partial<User>
): Promise<AxiosResponse<User>> => {
  try {
    const response = await axios.put<User>(
      `${BASE_URL}/user/${userId}`,
      updatedUserData
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios request error:", (error as AxiosError).message);
    } else {
      console.error("Error:", (error as Error).message);
    }
    throw error;
  }
};
