import { renderRecipe } from "./recipeRender.js";

const form = document.querySelector("form")
const API_URL_RANDOM = 'https://www.themealdb.com/api/json/v1/1/random.php'
const API_URL_ID = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='
const API_URL_NAME = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const recipeList = document.querySelector(".recipe-list")
const nav = document.getElementsByTagName('nav')[0]
const menuBtn = document.querySelector(".menu-btn")
const closeBtn = document.querySelector(".close-btn")
const navBar = document.querySelector(".navigation-items")
const categoryLi = document.querySelectorAll(".category");
const categories = Array.from(categoryLi)
const home = document.querySelector(".main-heading")

document.getElementsByTagName('html')[0].style.scrollPaddingTop = `${nav.offsetHeight}px`

async function randomRecipe() {
    const response = await fetch(API_URL_RANDOM);

    if (response.ok) {
        const data = await response.json();
        const meal = data.meals[0]
        renderRecipe(meal, recipeList)
        // console.log(meal)
    }
}

async function getRecipeByName(name) {

    const response = await fetch(API_URL_NAME + name)

    if (response.ok) {
        const data = await response.json();
        const meal = data.meals
        if (meal !== null) {
            meal.forEach((recipe) => {
                renderRecipe(recipe, recipeList)
                console.log(recipe)
            });

            return true
        } else {
            console.log("No recipe was found!")
            return false
        }

    } else {
        return false
    }
}

export async function getRecipeById(id) {
    const response = await fetch(API_URL_ID + id)

    if (response.ok) {
        const data = await response.json()
        const recipe = data.meals[0]
        renderRecipe(recipe, recipeList)
    }

}

async function getRecipesByCategory(category) {

    document.querySelector(".recipe-list").innerHTML = ""
    

    const CATEGORY_URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`

    const response = await fetch(CATEGORY_URL);

    if (response.ok) {
        const data = await response.json()
        const recipes = data.meals
        recipes.forEach((recipe) => {
            const recipeId = recipe.idMeal
            getRecipeById(recipeId, recipeList)
        });   
    } else {
        console.log("NO RECIPES")
    }

    scrollToElement(recipeList)
}

categories.forEach((category) => {
    const categoryName = category.getAttribute("data-category")

    category.addEventListener('click', () => {
        document.querySelector(".recipe-list").innerHTML = ""

        getRecipesByCategory(categoryName)
    })
    
});

function scrollToElement(element) {
    element.scrollIntoView({ behavior: 'smooth' });
}

function appendNoRecipeMessage(recipeName) {

    const recipeList = document.querySelector(".recipe-list");

    const li = document.createElement("li")

    li.classList.add("no-recipe-msg")
    li.innerHTML = `No Recipe was found with the name <span>${recipeName}</span>`

    recipeList.append(li)
}

form.addEventListener('submit', async (event) => {
    event.preventDefault()
    document.querySelector(".recipe-list").innerHTML = ""

    const formData = new FormData(form)
    const recipeName = formData.get('search-name')
    const found = await getRecipeByName(recipeName)

    if (!found) {
        appendNoRecipeMessage(recipeName)
    }

    scrollToElement(recipeList)
})

for (let index = 0; index < 12; index++) {
    randomRecipe()
}

menuBtn.addEventListener("click", () => {
    navBar.style.transform = "translateX(0vw)"
    closeBtn.style.display = "block"

    closeBtn.addEventListener("click", () => {
        navBar.style.transform = "translateX(100vw)"
    })
})

home.addEventListener('click', () => {
    window.location.href = "index.html"
})
