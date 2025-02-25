
document.addEventListener("DOMContentLoaded", () => {
  
  const cardContainer = document.querySelector('.container');
  const sortContainer = document.querySelector(".sortBtn-container");
  const likedContainer = document.querySelector('.adopted-container');
  const modalBox = document.getElementById("modal");

  // Load all pets
  const loadAllFiles = async () => {
    try {
      const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
      if (!response.ok) throw new Error(`HTTP error status: ${response.status}`);
      
      const data = await response.json();
      displayPets(data.pets);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  // Button text change when adopted
  function buttonChange(btn) {
    btn.innerText = 'Adopted';
  }

  // Display sorting button
  const sortedDisplay = () => {
    if (!sortContainer) return console.error("Error: .sortBtn-container not found in the DOM.");
    
    sortContainer.innerHTML = `
      <button id="sortBtn"
        class="mt-5 py-2 px-3 text-white rounded-md font-semibold text-sm bg-[#0E7A81] hover:scale-125"
        onclick="displaySortedPrice()">
        Sort by price
      </button>`;
  };
  sortedDisplay();

  // Display pets sorted by price
  const displaySortedPrice = async () => {
    try {
      const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
      const data = await response.json();
      const sortedPets = data.pets.sort((a, b) => a.price - b.price);
      displayPets(sortedPets);
    } catch (error) {
      console.error("Error sorting pets:", error);
    }
  };

  // Display pets
  const displayPets = (petsArray) => {
    cardContainer.innerHTML = "";
    cardContainer.classList = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-8/12 mx-auto";

    if (petsArray.length === 0) {
      cardContainer.classList = "w-full h-full flex flex-col items-center justify-center";
      cardContainer.innerHTML = `
        <img class="h-[300px] w-[300px] mx-auto" src="../images/error.webp" />
        <h2 class="font-bold text-3xl">No information available</h2>`;
      return;
    }

    petsArray.forEach((pet) => {
      const div = document.createElement('div');
      div.innerHTML = `
        <div class="card bg-base-100 w-80 shadow-xl border border-gray-200">
          <figure class="px-10 pt-10">
            <img src="${pet.image}" alt="Pet" class="rounded-xl" />
          </figure>
          <div class="card-body mx-auto">
            <h2 class="font-bold text-2xl">${pet.breed}</h2> 
            <p><span class="text-gray-500 font-bold">Breed:</span> ${pet.breed}</p>
            <p><span>Birth:</span> ${pet.date_of_birth}</p>
            <p><span>Gender:</span> ${pet.gender}</p>
            <p><span>Price:</span> ${pet.price}</p>
          </div>
          <hr class="w-4/5 mx-auto">
          <div class="flex gap-7 px-1 mx-auto py-6">
            <button onclick="selectedPets(${pet.petId})" class="w-[30px] hover:scale-75 border border-gray-300 rounded-md">
              <img src="https://img.icons8.com/?size=48&id=82788&format=png" />
            </button>
            <button onclick="buttonChange(this)" class="border btn btn-outline btn-accent btn-sm border-gray-300 rounded-md font-semibold text-[#0E7A81]">Adopt</button>
            <button class="border btn btn-outline btn-accent btn-sm border-gray-300 rounded-md font-semibold text-[#0E7A81]" onclick="showModalDetails(${pet.petId})">Details</button>
          </div>
        </div>`;

      cardContainer.appendChild(div);
    });
  };

  // Show pet details in a modal
  const showModalDetails = async (id) => {
    try {
      const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
      const data = await response.json();
      
      modalBox.innerHTML = `
        <dialog id="pets-modal" class="modal w-full mx-auto">
          <div class="modal-box">
            <figure class="w-full">
              <img src="${data.petData.image}" class="object-cover rounded-xl w-full" />
            </figure>
            <div class="card-body mx-auto">
              <h2 class="font-bold text-2xl">${data.petData.breed}</h2>
            </div>
            <div>
              <h3 class="font-bold text-lg">Details Information</h3>
              <p>${data.petData.pet_details}</p>
            </div>
            <div class="modal-action rounded-md">
              <button onclick="document.getElementById('pets-modal').close()" class="btn w-full bg-green-300">Close</button>
            </div>
          </div>
        </dialog>`;

      document.getElementById('pets-modal').showModal();
    } catch (error) {
      console.error("Error fetching pet details:", error);
    }
  };

  // Add pet to adopted container
  const selectedPets = async (id) => {
    try {
      const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
      const data = await response.json();

      const img = document.createElement('img');
      img.src = data.petData.image;
      img.classList.add("rounded-md");
      likedContainer.appendChild(img);
    } catch (error) {
      console.error("Error adding pet to adopted list:", error);
    }
  };

  // Load categories
  const loadCategories = async () => {
    try {
      const response = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`);
      const data = await response.json();
      displayCategories(data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const displayCategories = (categories) => {
    const categoryContainer = document.querySelector('.category-container');
    categoryContainer.innerHTML = ""; // Clear previous items

    categories.forEach((category) => {
      const button = document.createElement('button');
      button.innerHTML = `
        <button class="flex items-center btn btn-outline btn-accent py-2 px-8 gap-2 rounded-2xl border border-gray-300"
          onclick="loadCategoryPets('${category.category}')">
          <img class="w-[30px]" src="${category.category_icon}" />
          <p class="text-xl font-semibold">${category.category}</p>
        </button>`;
      categoryContainer.appendChild(button);
    });
  };

  // Load category pets
  const loadCategoryPets = async (id) => {
    try {
      const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`);
      const data = await response.json();
      displayPets(data.data);
    } catch (error) {
      console.error("Error fetching category pets:", error);
    }
  };

  // Initial data load
  loadCategories();
  loadAllFiles();
});

