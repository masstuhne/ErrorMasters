import RecipesDisplay from "../components/RecipesDisplay";
import { useParams } from 'react-router-dom';

function MyRecipes() {
    const { id } = useParams();

    return (
        <RecipesDisplay link={'http://localhost:8080/api/v1/categories/{categoryId}/recipes?categoryId=' + id}/>
    );
}

export default MyRecipes;