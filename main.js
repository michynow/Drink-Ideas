//API for TheCocktailDB
const APIkey = "1";
const ingredientSelection = document.getElementById("ingredients");
//fetch ingredient list from JSON
fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list")
  .then(
    (ingredientsBase) => ingredientsBase.json(),
    console.log("Successfully fetched ingredients database from the API!")
  )
  .then((data) => {
    for (let i = 0; i < data.drinks.length; i++) {
      let ingredientOption = document.createElement("option");
      ingredientOption.textContent = data.drinks[i].strIngredient1;
      ingredientOption.setAttribute("id", data.drinks[i].strIngredient1);
      ingredientSelection.appendChild(ingredientOption);
    }
  })
  .catch((e) => {
    throw new Error(`Failed to fetch ingredients database! Reload the page!`);
  });

const ingredientSelected = document.querySelector(
  ".main-card__ingredients-list"
);
const noIngredientPara = document.querySelector(
  ".main-card__ingredients--selected p"
);
//add selected ingredients to the list
class Ingredient {
  constructor(ingredientName) {
    this.ingredientName = ingredientName;
  }
}
//array for GET method purposes
let chosenIngredients = [];
Ingredient.prototype.createIngredient = function () {
  let singleIngredient = document.createElement("li");
  let ingredientSpan = document.createElement("span");
  let ingredientDeleteBtn = document.createElement("button");
  let ingredientImg = document.createElement("img");
  ingredientImg.setAttribute(
    "src",
    `https://www.thecocktaildb.com/images/ingredients/${this.ingredientName}-Small.png`
  );
  ingredientDeleteBtn.addEventListener("click", (e) => {
    chosenIngredients.pop(this.ingredientName);
    e.target.parentNode.remove();
    if (chosenIngredients.length === 0) {
      noIngredientPara.style.display = "block";
    }
  });
  singleIngredient.classList.add("ingredient-component");
  ingredientDeleteBtn.classList.add("delete-ingredient");
  ingredientSelected.appendChild(singleIngredient);
  singleIngredient.appendChild(ingredientDeleteBtn);
  singleIngredient.appendChild(ingredientSpan);
  ingredientSpan.textContent = this.ingredientName;
  ingredientSpan.appendChild(ingredientImg);
};
ingredientSelection.addEventListener("change", (e) => {
  if (chosenIngredients) {
    noIngredientPara.style.display = "none";
  }
  chosenIngredients.push(e.target.value);
  let component = new Ingredient(e.target.value);
  component.createIngredient();
});
const clearIngredients = document.querySelector(".clear-ingredients");
clearIngredients.addEventListener("click", () => {
  let items = ingredientSelected.querySelectorAll("li");
  for (let i = 0; i <= items.length - 1; i++) {
    items[i].remove();
    chosenIngredients.pop(items[i].textContent);
  }
  ingredientSelection.value = "Select ingredients";
  noIngredientPara.style.display = "block";
});
//fetch results as required
const resultSection = document.querySelector(".drinks-display--results");
