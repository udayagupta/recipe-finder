import { favRecipesId } from "./favourites.js";

export const countries = {
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

// const recipesSection = document.querySelector(".recipes");
const recipeList = document.querySelector(".recipe-list");
const closeBtn = document.querySelector(".image-modal span")
const imageModal = document.querySelector(".image-modal")
const recipeImg = document.querySelector(".recipe-image")

export function previewImage(element) {
    imageModal.style.display = "block"
    const img = imageModal.querySelector("img")
    img.src = element.src
    
    closeBtn.addEventListener("click", () => {
        imageModal.style.display = "none"
    })
}

export function renderRecipe(recipe, elementToAppend) {
    
    const recipeTitle = recipe.strMeal;
    const imgSrc = recipe.strMealThumb;
    const recipeCountry = recipe.strArea;
    const recipeCategory = recipe.strCategory;
    const recipeId = recipe.idMeal;

    const li = document.createElement('li');
    li.classList.add("recipe");
    
    const imageDiv = document.createElement('div');
    imageDiv.classList.add("recipe-image-holder");

    const img = document.createElement("img");
    img.classList.add("recipe-image");
    img.src = imgSrc;
    img.setAttribute("loading", "lazy");
    img.setAttribute("title", "Click to enlarge");
    img.setAttribute("alt", recipeTitle);
    imageDiv.addEventListener("click", () => previewImage(img));

    imageDiv.appendChild(img);

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("recipe-info")

    const basicInfo = document.createElement("div");
    basicInfo.classList.add("basic-info")

    const innerBasivInfoDiv = document.createElement("div")
    innerBasivInfoDiv.classList.add("inner-basic-info-div")

    const h3 = document.createElement("h5");
    h3.classList.add("recipe-name");
    h3.textContent = recipeTitle;
    
    const countryP = document.createElement("p");
    const countryCode = countries[recipeCountry];
    countryP.setAttribute("title", recipeCountry)
    countryP.classList.add("recipe-country")

    if (countryCode) {
        countryP.innerHTML = `${recipeCountry} <span class="fi fi-${countryCode}"></span>`
    } else {
        countryP.textContent = recipeCountry
    }

    const categoryP = document.createElement("p");
    categoryP.classList.add("recipe-category")
    categoryP.setAttribute("title", "Recipe Category")
    categoryP.textContent = recipeCategory

    basicInfo.appendChild(h3)
    innerBasivInfoDiv.appendChild(countryP)
    innerBasivInfoDiv.appendChild(categoryP)
    basicInfo.appendChild(innerBasivInfoDiv)
    

    const moreInfoDiv =  document.createElement("div");
    moreInfoDiv.classList.add("more-info")
    const moreInfoBtn = document.createElement("button")
    moreInfoBtn.classList.add("more-info-button")
    moreInfoBtn.textContent = "More Information"

    const addFavBtn = document.createElement("button")
    addFavBtn.classList.add("add-to-fav-button")
    addFavBtn.textContent = favRecipesId.includes(parseInt(recipeId)) ? "In Favuorites" : "Favourite"


    addFavBtn.addEventListener('click', () => {
        const id = parseInt(recipeId)
        if (!favRecipesId.includes(id)) {
            favRecipesId.push(id)
            
            addFavBtn.textContent = "Favourited"
            localStorage.setItem('favRecipesId', JSON.stringify(favRecipesId))
        }

        console.log(favRecipesId);
        
    })

    moreInfoDiv.appendChild(moreInfoBtn)
    moreInfoDiv.appendChild(addFavBtn)

    moreInfoBtn.addEventListener('click', () => {
        const moreInfoUrl = `more-info.html?recipeId=${encodeURIComponent(recipeId)}&title=${encodeURIComponent(recipeTitle)}`;    
        window.open(moreInfoUrl, '_blank')

    });

    infoDiv.appendChild(basicInfo);
    infoDiv.appendChild(moreInfoDiv)
    
    li.appendChild(imageDiv);
    li.appendChild(infoDiv);

    // recipeList.appendChild(li);
    elementToAppend.appendChild(li);
    
}

