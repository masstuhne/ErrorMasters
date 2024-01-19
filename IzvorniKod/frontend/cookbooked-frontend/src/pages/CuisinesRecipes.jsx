import RecipesDisplay from "../components/RecipesDisplay";
import { useParams } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_URL;

function MyRecipes() {
    const { id } = useParams();

    return (
        <RecipesDisplay link={API_BASE_URL + '/cuisines/{cuisineId}/recipes?cuisineId=' + id}/>
    );
}

export default MyRecipes;