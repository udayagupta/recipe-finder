let url = new URLSearchParams(window.location.search)
let recipeId = url.get("recipeId")
let recipeTitle = url.get("title")
let pageTitle = `${recipeTitle} | Quick Recipes`

const countries = {
    "American": "us",
    "British": "gb",
    "Canadian": "ca",
    "Chinese": "cn",
    "Croatian": "hr",
    "Dutch": "nl",
    "Egyptian": "eg",
    "Filipino": "ph",
    "French": "fr",
    "Greek": "gr",
    "Indian": "in",
    "Irish": "ie",
    "Italian": "it",
    "Jamaican": "jm",
    "Japanese": "jp",
    "Kenyan": "ke",
    "Malaysian": "my",
    "Mexican": "mx",
    "Moroccan": "ma",
    "Polish": "pl",
    "Portuguese": "pt",
    "Russian": "ru",
    "Spanish": "es",
    "Thai": "th",
    "Tunisian": "tn",
    "Turkish": "tr",
    "Vietnamese": "vn",
    "Ukrainian": "ua"
};

function getIngredientsWithMeasure(meal) {
    const maxIngredients = 20
    let ingredients = []

    for (let index = 1; index <= maxIngredients; index++) {
        const ingredientName = meal[`strIngredient${index}`]
        const ingredientMeasure = meal[`strMeasure${index}`]

        if (ingredientName && ingredientName.trim() !== "") {
            ingredients.push({ingredient: ingredientName, measure: ingredientMeasure, ingredientUrl: ''})
        }
    }

    return ingredients
}


function getIngredientURL(ingredient) {
    return `https://www.themealdb.com/images/ingredients/${encodeURIComponent(ingredient)}-Small.png`;
}

document.title = pageTitle

async function getRecipeById(id) {
    const API_URL_ID = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='
    const response = await fetch(API_URL_ID + id)

    if (response.ok) {
        const data = await response.json()
        console.log(data.meals[0])
        return data.meals[0]
    }

}

// getRecipeById(recipeId)

const h1 = document.getElementsByTagName('h1')[0];
const img = document.querySelector('.recipe-img');
const countryElement = document.querySelector('.recipe-country');
const categoryElement = document.querySelector('.recipe-category');
const instructionsElement = document.querySelector('.instructions');
const iframe = document.querySelector('.iframe');
const noVideo = document.querySelector('.no-youtube-guide');
let ingredientList = '';
let instructionsSteps = ''

async function renderInfo() {
    const recipe = await getRecipeById(recipeId)

    const recipeTitle = recipe.strMeal;
    const imgSrc = recipe.strMealThumb;
    const recipeCountry = recipe.strArea;
    const recipeCategory = recipe.strCategory;
    const recipeSrc = recipe.strSource;
    const recipeInstructions = recipe.strInstructions.split(". ")
    const ingredients = getIngredientsWithMeasure(recipe)
    const countryCode = countries[recipeCountry];
    const recipeYoutubeSrc = recipe.strYoutube;
    const youtubeId = recipeYoutubeSrc.split("=")[1]
    const youtubeUrl = `https://www.youtube.com/embed/${youtubeId}`

    h1.textContent = recipeTitle
    img.src = imgSrc
    img.alt = recipeTitle
    categoryElement.textContent = recipeCategory

    if (countryCode) {
        countryElement.innerHTML = `${recipeCountry} <span class="fi fi-${countryCode}"></span>`
    } else {
        countryElement.textContent = recipeCountry
    }

    ingredients.forEach(ingredient => {
        // console.log(ingredient.ingredientUrl);
        const ingredientURL = getIngredientURL(ingredient.ingredient)
        
        ingredientList += 
        `
        <li class="ingredient">
            <div class="ingredient-image">
                <img height="64" src="${ingredientURL}" alt="${ingredient.ingredient}">
            </div>
            <div class="ingredient-info">
                <p class="ingredient-name">
                    ${ingredient.ingredient}:
                </p>
                <p class="ingredient-measure">
                    ${ingredient.measure}
                </p>
            </div>
        </li>
        `
    });

    document.querySelector('.ingredients-list').innerHTML = ingredientList

    // instructionsElement.innerHTML = recipeInstructions
    if (youtubeUrl !== "") {
        iframe.src = youtubeUrl
    } else {
        noVideo.style.display = 'block'
    }
    // instructionsElement.textContent = recipeInstructions  
    // console.log(recipeInstructions);

    recipeInstructions.forEach(step => {
        instructionsSteps +=
        `
        <li class="instruction-step">
            ${step}
        </li>
        `
    })
    
    instructionsElement.innerHTML = instructionsSteps
    
}

renderInfo()





