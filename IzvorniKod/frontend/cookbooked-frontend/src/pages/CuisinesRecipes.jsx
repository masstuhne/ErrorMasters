import RecipesDisplay from "../components/RecipesDisplay";
import { useParams } from 'react-router-dom';

function MyRecipes() {
    const { id } = useParams();

    return (
        <RecipesDisplay link={'http://localhost:8080/api/v1/cuisines/{cuisineId}/recipes?cuisineId=' + id}/>
    );
}

export default MyRecipes;