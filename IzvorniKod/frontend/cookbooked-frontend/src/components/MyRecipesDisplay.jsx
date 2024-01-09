
import RecipeList from "./RecipeList";

function MyRecipesDisplay() {

    const recepti = [
        {
          id: "1",
          ime: "Torta s narančom",
          kategorija: "desert",
          vrijeme: "45"
        },
        {
          id: "2",
          ime: "Mese",
          kategorija: "Glavno jelo",
          vrijeme: "5"
        },
        {
          id: "3",
          ime: "Bažulj sa zeljem",
          kategorija: "salata",
          vrijeme: "25"
        },
        {
          id: "4",
          ime: "Kesten pire",
          kategorija: "sok",
          vrijeme: "20"
        },
        {
          id: "5",
          ime: "Sok od naranče",
          kategorija: "Predjelo",
          vrijeme: "30"
        }
      ];

    return (
      <RecipeList headline={"Moji recepti"} recipes={recepti} />
    );
;}

export default MyRecipesDisplay;