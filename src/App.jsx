import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Historial from "./components/Historial";
import HistorialContext from "./context/HistorialContext";
import HomeContext from "./context/HomeContext";
import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
const App = () => {
  const [elementos,setElementos] = useState({
    metros2:20,
    propiedad: 0,
    ubicacion: 0,
  });
  const [historial,setHistorial] = useLocalStorage('historial',[]);
  return (
    <>
    <HistorialContext.Provider value={{historial,setHistorial}}>
      <HomeContext.Provider value={{elementos,setElementos}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Home />} ></Route>
          <Route path="/historial" element={<Historial />}></Route>
          </Routes>
      </BrowserRouter>
      </HomeContext.Provider>
      </HistorialContext.Provider>
    </>
  );
};
export default App;

