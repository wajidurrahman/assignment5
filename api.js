function searchButton(){
    const searchInput = document.getElementById('search-Input').value;
    // console.log(searchInput);
    const url = `https://www.themealdb.com/api/json/v1/1/list.php?i=${searchInput}`;
    // console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data));
    displayMealDetails()
}

function displayMealDetails(){
    mealContainer = document.getElementById('search-meal');
    mealContainer.innerHTML = '';

}