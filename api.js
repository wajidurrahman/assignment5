const mealSearchBtn = document.getElementById('meal-search');
const mealInput = document.querySelector('.meal-search-input');

mealSearchBtn.addEventListener('click', loadMeal);
mealInput.addEventListener('keypress', event => { if (event.charCode === 13) loadMeal() });

function loadMeal() {
    const mealAPI = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealInput.value}`;

    fetch(mealAPI)
        .then(res => res.json())
        .then(data => displayMeal(data.meals))

    function displayMeal(meals) {
        const mealContainer = document.querySelector('.meal-cards');
        const noMealFound = document.querySelector('.meal-not-found');
        const mealDescriptionContainer = document.querySelector('.meal-description-box');

        mealContainer.innerHTML = '';
        noMealFound.innerText = '';
        mealDescriptionContainer.innerHTML = '';

        if (meals) {
            meals.forEach(meal => {
                const mealItem = document.createElement('div');
                mealItem.setAttribute('class', 'meal-card');
                mealItem.innerHTML = `
                <div class="meal-img-box">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-img img-cover-fit">
                </div>
                <div class="meal-content">
                    <h2 class="meal-title">${meal.strMeal}</h2>
                </div>
                `
                mealContainer.appendChild(mealItem);
            })
            loadMealDescription();
        } else {
            noMealFound.innerText = `No meal found for "${mealInput.value}" search result`;
        }
    }
}

function loadMealDescription() {
    const mealCards = document.querySelectorAll('.meal-card');
    mealCards.forEach(meal => {
        meal.addEventListener('click', function () {
            const mealDescriptionAPI = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal.innerText}`;
            fetch(mealDescriptionAPI)
                .then(res => res.json())
                .then(data => displayMealDescription(data.meals[0]))
        })
    })
}

function displayMealDescription(meal) {
    const mealDescriptionContainer = document.querySelector('.meal-description-box');
    const mealDescription = document.createElement('div');
    mealDescription.setAttribute('class', 'meal-description');
    mealDescription.innerHTML = `
            <div class="meal-description-img-box">
                <button class="meal-description-close">&times;</button>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-description-img img-cover-fit">
            </div>
            <div class="meal-description-content">
                <h2 class="meal-description-title">${meal.strMeal}</h2>
                <h3 class="meal-description-subtitle">Ingredients</h3>
                <ul class="meal-description-list"></ul>
            </div>
            `
    mealDescriptionContainer.innerHTML = '';
    mealDescriptionContainer.appendChild(mealDescription);
    const mealDescriptionList = document.querySelector('.meal-description-list');
    for (let i = 1; i <= 20; i++) {
        if (meal['strIngredient' + i]) {
            const ingredient = document.createElement('li');
            ingredient.setAttribute('class', 'meal-description-item');
            ingredient.innerText = `${meal['strMeasure' + i]} ${meal['strIngredient' + i]}`;
            mealDescriptionList.appendChild(ingredient);
        }
    }
    mealDescriptionContainer.style.visibility = 'visible';
    mealDescriptionContainer.style.opacity = '1';

    const mealDescriptionCloseBtn = document.querySelector('.meal-description-close');

    mealDescriptionCloseBtn.addEventListener('click', () => {
        const mealDescriptionContainer = document.querySelector('.meal-description-box');
        mealDescriptionContainer.style.opacity = '0';
        mealDescriptionContainer.style.visibility = 'hidden';
    });
}