

//load and display categories
const loadCategory = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then((res) => res.json())
        .then((json) => {
            const categories = json.categories;

            const allPlantsCategory = {
                id: "all",
                category_name: "All Plants"
            };

            const updatedCategories = [allPlantsCategory, ...categories];

            displayCategory(updatedCategories);

            loadTrees("all");
        });
};

const displayCategory = (categories) => {
    console.log(categories)
    const catContainer = document.getElementById("category-container");
    catContainer.innerHTML = "";
 
    for (let category of categories) {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML =
            `<button id="category-btn-${category.id}" onclick="loadTrees('${category.id}')" class="btn w-full bg-[#f0fDf4] border-none hover:bg-[#CFF0DC] text-left justify-start category-btn">
                ${category.category_name}
            </button>`;

        catContainer.append(btnDiv);
    }
};

loadCategory()


//loading spinner
const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("card-container").classList.add("hidden");
  } else {
    document.getElementById("card-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

//button active state
const removeActive = () => {
    const categoryButtons = document.querySelectorAll(".category-btn")
    categoryButtons.forEach((btn) => btn.classList.remove("active"))
} 

//load and display trees
const loadTrees = (id) => {
    manageSpinner(true);

    const url =
        id === "all"
            ? "https://openapi.programming-hero.com/api/plants"
            : `https://openapi.programming-hero.com/api/category/${id}`;

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeActive();

            const clickBtn = document.getElementById(`category-btn-${id}`);
            if (clickBtn) {
                clickBtn.classList.add("active");
            }

            const plants = Array.isArray(data) ? data : data.plants;

            displayTrees(plants);
        });
};

const displayTrees = (trees) => {
    const treeContainer = document.getElementById("card-container");
    treeContainer.innerHTML = "";

    trees.forEach((tree) => {

        const card = document.createElement("div");
        card.innerHTML =
            `<div class="single-card bg-white p-4 rounded-lg flex flex-col h-full shadow-sm">
							<div class="card-image">
								<img class="h-64 object-cover w-full rounded-lg" src="${tree.image}" alt="">
							</div>
							<div class="card-heading flex-1">
								<h1 onclick="loadTreeDetail('${tree.id}')" class="font-semibold mt-3 cursor-pointer">${tree.name}</h1>
							</div>
							<div class="card-description flex-1">
								<p class="text-xs font-normal text-[#1F2937] my-2">${tree.description}</p>
							</div>
							<div class="card-price-tag flex items-center justify-between mb-3">
								<p class="text-sm  font-semibold text-[#15803D] px-3 py-1 bg-[#DCFCE7] rounded-full">${tree.category}</p>
								<p class="text-sm font-semibold">৳${tree.price}</p>
							</div>
							<div class="card-button">
								<button class="text-base font-semibold text-white bg-[#15803D] py-2 px-3 w-full rounded-full cursor-pointer">Add to Cart</button>
							</div>
						</div>`;
        treeContainer.append(card);
    });
    manageSpinner(false)
};
