import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

// import Header from "./components/Header";
import Registration from "./component/Registration";
import Login from "./component/Login";
// import Header from "./component/Header";
import Booked from "./component/Booked";
import Dashboard from "./component/Dashboard";
// import Admin from "./component/Admin";
import CarTable from "./component/CarTable";
import CreateCar from "./component/CreateCar";
import CarEdit from "./component/CarEdit";
// import Navigation from './component/Navigation';
import Rent from "./component/Rent";
import RentalDetails from "./component/RentalDetails";
import LiveRented from "./component/Live";

const App = () => {
  return (
  
    <BrowserRouter>
     {/* <Navigation /> */}
       
    <Routes>
    <Route index element={<Registration />} />
            {/* <Route path="/Registration" element={<Registration />}/> */}
            <Route path="/Login" element={<Login />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            {/* <Route path="/Admin" element={<Admin />} /> */}
            <Route path="/CarTable" element={<CarTable />} />
            <Route path="/CreateCar" element={<CreateCar />} />
            {/* <Route path="/CarEdit/" element={<CarEdit />} /> */}
            <Route path="/CarEdit/:carId/edit" element={<CarEdit />} />
            <Route path="/Rent" element={<Rent />} />
            <Route path="/RentalDetails" element={<RentalDetails />} />
            <Route path="/booked" element={<Booked />} />
            <Route path="/live" element={<LiveRented />} />

    </Routes>
  </BrowserRouter>
  );
};

export default App;