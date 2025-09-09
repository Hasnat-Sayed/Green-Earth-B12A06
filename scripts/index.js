

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