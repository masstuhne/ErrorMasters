import React from "react"
import './index.css'
import NavBar from "./components/NavBar";
import { Route, Routes} from "react-router-dom"
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import MyRecipes from "./pages/MyRecipes";
import NewRecipe from "./pages/NewRecipe";
import MyData from "./pages/MyData";


function App() {
  // console.log("APP");

    return (
      <>
        <NavBar/>
        <div>
          <Routes>
            <Route path = "/" element={<Home />}/>
            <Route path = "/prijava" element={<SignIn />} />
            <Route path = "/registracija" element={<SignUp />} />
            <Route path = "/moji_recepti" element={<MyRecipes />} />
            <Route path = "/novi_recept" element={<NewRecipe />} />
            <Route path = "/moji_podatci" element={<MyData />} />

          </Routes>
        </div>
      </>
    );

}




export default App;
