import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PetStore from "./components/PetStore";
import Header from "./components/Header";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import AddPet from "./components/AddPet";
import "./App.css";
import UpdateUser from "./components/UpdateUser";
import ChartComponent from "./components/MyChart/ChartComponent";
import UserLoginChart from "./components/MyChart/ChartUsers";
function App() {
  return (
    <Router>
      <div className="App">
        {/* <div>
        // Графики
          <h1>Pet Status Chart</h1>
          <ChartComponent status="available" />
          <UserLoginChart />
        </div> */}
        <Header />
        <Routes>
          <Route path="/" element={<PetStore />} />
          <Route
            path="/addpet"
            element={
              <AddPet
                onPetAdded={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/user"
            element={
              <UpdateUser
                userId={""}
                onUpdateSuccess={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
