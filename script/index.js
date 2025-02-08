const loadAllFiles = async () => {
  const response = await  fetch(`https://openapi.programming-hero.com/api/peddy/pets`);
  const data = await response.json();
  displayPets(data.pets);
}



const displayPets = (arrays) => {
    const cardContainer = document.querySelector('.container');
    cardContainer.classList = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 w-11/12 mx-auto"
    
    arrays.forEach((array) => {
        
     const div = document.createElement('div');
     div.innerHTML = `
     <div class="card bg-base-100 w-80 shadow-xl border border-gray-200">
     <figure class="px-10 pt-10">
       <img
         src=${array.image}
         alt="Shoes"
         class="rounded-xl" />
     </figure>
     <div class="card-body mx-auto ">
       <h2 class="font-bold text-2xl">${array.breed}</h2> 
       <p><span class="text-gray-500 font-bold">Breed:</span> ${array.breed}</p>
       <p class="flex items-center"> <img class="w-[20px]" src="https://img.icons8.com/?size=48&id=84997&format=png"> <span>Birth:</span>${array.date_of_birth}</p>
       <p class="flex items-center">
       <img class="w-[20px]" src="https://img.icons8.com/?size=100&id=1665&format=png">
       <span>Gender:${array.gender}</span>
       </p>
       <p class="flex"><img class="w-[20px]" src="https://img.icons8.com/?size=48&id=85782&format=png"> <span>Price:${array.price}</span></p>
     </div>
   </div>
     `;
     cardContainer.appendChild(div);
    });

};



const loadCategories = async () => {
   

    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`);
    const data = await response.json();
   
    // displayCategories(data);
}
const displayCategories = (items) => {
    const categoryContainer = document.querySelector('.category-container')
    items.forEach((item) => {
        console.log(item)

        const categories = document.createElement('div');
        categories.innerHTML = `
        <div
            class="flex items-center category px-8 rounded-2xl border border-red-500"
         >
            <img src="${item.category_icon}" alt="" />
            <p>${item.category}</p>
          </div>
        `;
        
        categoryContainer.appendChild(categories);
    } );
};

loadCategories();







loadAllFiles();

