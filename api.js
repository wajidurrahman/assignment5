const searchButton = meals => {
    const searchInput = document.getElementById('search-Input').value;
    // console.log(searchInput);
    const url = `https://www.themealdb.com/api/json/v1/1/list.php?i=${meals}`;
    // console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data));
}

const displayMealDetails = () => {
    mealContainer = document.getElementById('search-meal');
    mealContainer.innerHTML = '',

}