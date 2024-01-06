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
import Recipe from "./pages/Recipe";


function App() {

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
            <Route path = "/recept/:id" element={<Recipe />} />

          </Routes>
        </div>
      </>
    );

}




export default App;
