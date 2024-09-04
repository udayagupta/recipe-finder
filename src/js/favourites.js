import { renderRecipe } from "./recipeRender.js";

export let favRecipesId = []

favRecipesId = JSON.parse(localStorage.getItem('favRecipesId')) || [];

document.addEventListener("DOMContentLoaded", () => {
    console.log(favRecipesId);
})

const ul = document.querySelector(".fav-recipes-list")
console.log(ul);

async function getRecipeById(id) {
    const API_URL_ID = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='
    const response = await fetch(API_URL_ID + id)

    if (response.ok) {
        const data = await response.json()
        const recipe = data.meals[0]
        renderRecipe(recipe, ul)
    }

}

favRecipesId.forEach(id => {
    getRecipeById(id)
});
