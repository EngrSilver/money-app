const meals = document.querySelector(".random-parts");
const foodItems = document.querySelector(".food-items");




console.log(foodItems);
async function getRandomMeal() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const responseData = await response.json();
  const randomMeal = responseData.meals[0];
  ;

  // to create the html part of the random meal
  addMeal(randomMeal, true);
}
getRandomMeal();
fetchFavMeals();

async function getMealbyId(id) {
  const response = await fetch(
    "www.themealdb.com/api/json/v1/1/lookup.php?i= " + id
  );
  const responseData = await response.json();
  const meal = responseData.Meals[0];
  return meal;
}
async function getMealsBySearch(term) {
  const meals = await fetch(
    "www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );
}

function addMeal(mealData, random = false) {
  const meal = document.createElement("div");
  meal.classList.add("meal");

  meal.innerHTML = `<div class="random-part">
          ${random ? `<p class="random-recipe">Random Recipe</p>` : ""} 
          <div class="random-image">
            <img
              src="${mealData.strMealThumb}"
              alt="${mealData.strMeal}"
            />
          </div>
          <div class="favourite-part">
          <p class="name-of-ranom-food">${mealData.strMeal}</p>
          <button class="favourite-icon"><i class="fa fa-heart"></i></button>
          </div>
          </div>`;
  meals.appendChild(meal);
  const random_recipe = document.querySelector(".random-recipe")
  random_recipe.addEventListener("click", () => {
    removeMealLS(meal)
  });

  const btnEl = meal.querySelector(".favourite-icon");
  btnEl.addEventListener("click", () => {
    if (btnEl.classList.contains("red")) {
      removeMealLS(mealData.idMeal);
      btnEl.classList.remove("red");
    } else {
      addMealToFav(mealData);
      addMealLS(mealData.idMeal);
      btnEl.classList.add("red");
    }
  });
  foodItems.innerHTML = "";
  fetchFavMeals();
}

function addMealLS(mealId) {
  const mealIds = getMealLS();
  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}
function removeMealLS(mealId) {
  const mealIds = getMealLS();
  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
}
function getMealLS() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));

  return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() {
  const mealIds = getMealLS();
  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];
    const meal = await getMealbyId(mealId);
    addMealToFav(meal);
  }
}

function addMealToFav(mealData) {
  const favmeal = document.createElement("li");
  favmeal.classList.add("Food-item");

  favmeal.innerHTML = `     
              <button class="remove-fav"><i class="fa fa-close"></i></button>
              <div class="image-container">
                <img
                  src="${mealData.strMealThumb}"
                  alt="${mealData.strMeal}"
                />
              </div>
              <p class="image-title">${mealData.strMeal}</p>
`;
  foodItems.appendChild(favmeal);
}
