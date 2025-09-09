

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
    
    const catContainer = document.getElementById("category-container");
    catContainer.innerHTML = "";
 
    for (let category of categories) {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML =
            `<button id="category-btn-${category.id}" onclick="loadTrees('${category.id}')" class="btn w-full bg-[#f0fDf4] border-none hover:bg-[#CFF0DC] text-center md:justify-start md:text-left category-btn">
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
								<p class="text-sm font-medium text-[#15803D] px-3 py-1 bg-[#DCFCE7] rounded-full">${tree.category}</p>
								<p class="text-sm font-semibold">৳<span>${tree.price}</p>
							</div>
							<div class="card-button">
								<button class="text-base font-medium text-white bg-[#15803D] py-2 px-3 w-full rounded-full cursor-pointer hover:bg-green-800 active:scale-95 transition-all duration-75 ease-in-out">Add to Cart</button>
							</div>
						</div>`;
        treeContainer.append(card);
    });
    manageSpinner(false)
};

//modal load and display
const loadTreeDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayTreeDetails(details.plants);
}

const displayTreeDetails = (plant) => {
    
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
        <h2 class="text-2xl font-bold">
            ${plant.name} 
        </h2>
        
        <img src="${plant.image}" class="w-full max-h-72 object-cover rounded-lg" alt="">
      
        <h2 class="font-bold">Category: <span class="font-normal"> ${plant.category}</span></h2>
    
        <h2 class="font-bold">Price: <span class="font-normal">৳${plant.price}</span></h2>
        <h2 class="font-bold">Description: <span class="font-normal">${plant.description}</span></h2> 
    
    `
    ;
    document.getElementById("detail_modal").showModal();
};


//cart functionalities

document.getElementById("card-container").addEventListener("click", (event) => {

    if (event.target.closest(".card-button")) {
        let addBtn = event.target.closest(".card-button");
        
        
        let cartPrice = Number(document.getElementById("total-amount").innerText);
        
        let productPrice = Number(addBtn.parentNode.children[3].children[1].children[0].innerText);
        
        let treeName = addBtn.parentNode.children[1].children[0].innerText;
        
        let totalPrice = productPrice + cartPrice;
        document.getElementById("total-amount").innerText = totalPrice;

        let singleCartContainer = document.getElementById("cart-divs");
        singleCartContainer.innerHTML += `
                        <div class="single-cart bg-[#F0FDF4] flex items-center justify-between p-2 rounded-lg my-3">
							<div class="single-cart-content">
								<h1 class="font-semibold text-[#1F2937] mb-2">${treeName}</h1>
								<p class="font-normal text-[#1F2937]">৳<span>${productPrice}</span> x 1</p>
							</div>
							<div class="single-cart-icon">
								<i  class="fa-solid fa-x text-[#8C8C8C] cursor-pointer"></i>
							</div>
						</div>
        `
    };
})

document.getElementById("cart-divs").addEventListener("click", (event) => {
    if(event.target.closest(".single-cart-icon")){
        const crossBtn = event.target.closest(".single-cart-icon")
        const price = Number(crossBtn.parentNode.children[0].children[1].children[0].innerText)
        
        const totalPrice = Number(document.getElementById("total-amount").innerText)
        
        const newTotal = totalPrice - price
        document.getElementById("total-amount").innerText = newTotal;

        crossBtn.parentNode.remove()
    }
})