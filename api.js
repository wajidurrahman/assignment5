
fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
.then(res => res.json())
.then(data => allMealList(data))

const categories = document.getElementById('searchBtn');
categories.addEventListener('click', () => {
    const searchMeal = document.getElementById('searchInput').value;
    getMealDetails(searchMeal)
    document.getElementById('mealName').innerText = data.categories;
    document.getElementById('images').getImageData(`https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg/preview`);
    
})
const changeMealList = document.getElementById('mealName').addEventListener('click', () => {
   listItem = document.getElementById('strCategoryThumb').innerText;
   

})