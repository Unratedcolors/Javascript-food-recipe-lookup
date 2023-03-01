const form = document.querySelector('.js-food-form');
const inputField = document.querySelector('.js-food-input');
const foodContainer = document.querySelector('.js-meal-list-container');

// https://www.themealdb.com/api/json/v1/1/search.php?s=Pie


console.log('JavaScript is running');

function getSourceMarkup(meal) {
    let source = meal.strSource;
    if (source === null || source === '') {
        return '';
    } else { //strictly speaking, you dont need an else here.  
        return`
            <p>
                <a href="${meal.strSource}" target="_blank">Source</a>        
            </p>
        `;
    }
}

function getTagsMarkup(meal) {
    let tags = meal.strTags?.replaceAll(', ', ', ');
    if (typeof tags === 'undefined') {
        return''
    } else { // else is here for readability
        return `<p>Tags: ${tags}</p>`
    }
}

function getMealMarkup(meal) {
    return `
    <div class="meal-container">
        <h2>${meal.strMeal}</h2>
        <img 
            src="${meal.strMealThumb}" 
            alt="${meal.strMeal}"
            class="meal-thumbnail" />
        ${getTagsMarkup(meal)}
        ${getSourceMarkup(meal)}
    </div>
`;
}

function renderRecipe(result) {
    let meals = result.meals;
    let html = '';
    for (let meal of meals) {
        html += getMealMarkup(meal);
    }
    foodContainer.innerHTML = html;    
}

function renderError(error) {
    foodContainer.innerHTML = 'No results were found.'; 
}

function getRecipe(recipe) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`;
    fetch(url)
    .then(data => data.json())
    .then(renderRecipe)
    .catch(renderError);
}

function callback(event) {
    event.preventDefault(); //first thing in the form
    // event.stopPropagation(); // in case of other events, read event bubbling
    const searchExpresison = encodeURIComponent(inputField.value).replaceAll('%20', ' ');
    foodContainer.innerHTML =  `Form got submitted with content ${searchExpresison}`;
    getRecipe(searchExpresison);
    inputField.value = '';
}

form.addEventListener('submit', callback);