const searchBox = document.querySelector(".search-box");
const searchButton = document.querySelector(".search-btn");
const searchRandom = document.querySelector(".random");
const searchResults = document.querySelector(".search-results");
const imageDiv = document.querySelector(".images");
const singleFoodContainer = document.querySelector(".show-food-details");

function makeMealCard(food) {
  return `
    <div class="food-card">

      <div class="food-image-wrapper">
        <img
          class="food-detail-image"
          src="${food?.strMealThumb}"
          alt="${food?.strMeal}"
        />
      </div>

      <div class="food-content">

        <h2 class="food-title">${food?.strMeal}</h2>

        <div class="food-meta">
          <span>${food?.strCategory || "Unknown Category"}</span>
          <span>${food?.strArea || "Unknown Area"}</span>
        </div>

        <div class="food-section">
          <h3>Ingredients</h3>

          <ul class="ingredients-list">
            ${[
              [food?.strIngredient1, food?.strMeasure1],
              [food?.strIngredient2, food?.strMeasure2],
              [food?.strIngredient3, food?.strMeasure3],
              [food?.strIngredient4, food?.strMeasure4],
              [food?.strIngredient5, food?.strMeasure5],
              [food?.strIngredient6, food?.strMeasure6],
              [food?.strIngredient7, food?.strMeasure7],
              [food?.strIngredient8, food?.strMeasure8],
              [food?.strIngredient9, food?.strMeasure9],
              [food?.strIngredient10, food?.strMeasure10],
            ]
              .filter(([ingredient]) => ingredient?.trim())
              .map(
                ([ingredient, measure]) =>
                  `<li><span>${ingredient}</span><span>${measure || ""}</span></li>`,
              )
              .join("")}
          </ul>
        </div>

        <div class="food-section">
          <h3>Instructions</h3>
          <p class="food-instructions">
            ${food?.strInstructions || "No instructions available."}
          </p>
        </div>

      </div>
    </div>
  `;
}

async function runSearch() {
  try {
    singleFoodContainer.innerHTML = "";
    searchResults.textContent = "";
    const searchTerm = searchBox.value;
    const url = `https://themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error Occured.");
    }

    const foodList = await response.json();
    if (!foodList.meals) {
      searchResults.textContent = "Nothing is Found.";
      return;
    }

    imageDiv.innerHTML = "";
    foodList.meals?.forEach((food) => {
      imageDiv.innerHTML += `<div class="image-container">
        <img class="image-properties" src="${food?.strMealThumb}" alt="Image is missing" id="${food?.idMeal}">
        <div class="text-overlay">${food.strMeal}</div>
      </div>
      `;
    });
  } catch (err) {
    console.log(err);
  }
}

async function runRandomSearch() {
  try {
    searchResults.textContent = "";
    imageDiv.innerHTML = "";
    const url = `https://themealdb.com/api/json/v1/1/random.php`;
    const response = await fetch(url);

    if (!response.ok) {
      searchResults.textContent = "Error Happened There is nothing to show.";
    }

    const randomFoodObject = await response.json();
    const randomFood = randomFoodObject.meals[0];

    // Clear previous random meal before showing the new one
    singleFoodContainer.innerHTML = "";

    // Showing structured Card
    singleFoodContainer.innerHTML = makeMealCard(randomFood);
  } catch (err) {
    console.log(err);
  }
}

async function showImageDetails(e) {
  try {
    const image = e.target.closest(".image-container").querySelector("img");
    const mealId = image.id;
    const mealIdUrl = `https://themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    const response = await fetch(mealIdUrl);
    if (!response.ok) {
      throw new Error("Error Occured: Can't retrive the details.");
    }
    const data = await response.json();
    const foodFoundById = data?.meals[0];
    singleFoodContainer.innerHTML = "";

    // Showing structured Card
    singleFoodContainer.innerHTML = makeMealCard(foodFoundById);
  } catch (err) {
    console.log(err.message);
  }
}

searchButton.addEventListener("click", runSearch);

searchBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") runSearch();
});

searchRandom.addEventListener("click", runRandomSearch);

imageDiv.addEventListener("click", showImageDetails);
