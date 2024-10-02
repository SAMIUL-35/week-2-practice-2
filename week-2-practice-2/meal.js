document.getElementById("btn").addEventListener("click", () => {
    console.log("click");
    const inputElement = document.getElementsByTagName("input")[0];
    const inputValue = inputElement.value;
    console.log(inputValue);

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
        .then(res => {
          
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => displayCard(data))
        .catch(error => console.error('Fetch error:', error));

  
    inputElement.value = ""; 
});

const displayCard = (data) => {
    console.log(data);
    const cardContainer = document.getElementById("card-container");

   
    cardContainer.innerHTML = "";

    
    if (data.meals) {
        data.meals.forEach(meal => {
            
            const card = document.createElement("div");
            card.classList.add("card");

         
            card.innerHTML = `
                <h2>${meal.strMeal}</h2>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                <p>${meal.strInstructions.substring(0, 100)}...</p>
                <button onclick="detail_card(${meal.idMeal})">Details</button>
            `;

            
            cardContainer.appendChild(card);
        });
    } else {
        
        cardContainer.innerHTML = "<p>No meals found.</p>";
    }
};

const detail_card = (id) => {
    console.log(`Fetching details for meal ID: ${id}`);

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            console.log(data);
            const meal = data.meals[0]; 
            console.log(meal);
            displayMealDetails(meal);
        })
        .catch(error => console.error('Fetch error:', error));
};

const displayMealDetails = (meal) => {
    const detailsContainer = document.getElementById("details-container");
    
  
    detailsContainer.innerHTML = "";

   
    detailsContainer.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <p>${meal.strInstructions}</p>
        <h3>Ingredients:</h3>
        <ul>
            ${Array.from({ length: 10 }, (_, i) => meal[`strIngredient${i + 1}`] ? `<li>${meal[`strIngredient${i + 1}`]}: ${meal[`strMeasure${i + 1}`]}</li>` : '').join('')}
        </ul>
    `;
};
