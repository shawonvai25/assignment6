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
      
  <hr class="w-4/5 mx-auto">

     <div class="flex gap-7 px-1 mx-auto py-6">
     <button class="w-[30px] hover:scale-75 border border-gray-300 rounded-md "><img  src="https://img.icons8.com/?size=48&id=82788&format=png" /></button>
     <button class="border btn btn-outline btn-accent btn-sm  border-gray-300 rounded-md font-semibold text-[#0E7A81]">Adopt</button>
     <button class="border btn btn-outline btn-accent btn-sm border-gray-300  rounded-md font-semibold text-[#0E7A81]"  onclick="customModal.showModal()">Details</button>
     </div>
   </div>
     `;
     cardContainer.appendChild(div);

     const modal = document.getElementById("customModal");
     modal.innerHTML= `
     <div class="modal-box ">
     
    <div class="mx-auto flex flex-col items-center w-full">
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

  <hr class="w-4/5 mx-auto">
   
  <p class="-= text-gray-500" >${array.pet_details}</p>

    </div>

          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn">Close</button>
            </form>
          </div>
        </div>
     `
    });


};



const loadCategories = async () => {
   

    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`);
    const data = await response.json();
   
    displayCategories(data.categories);
}
const displayCategories = (items) => {
    const categoryContainer = document.querySelector('.category-container')
    items.forEach((item) => {
        console.log(item)

        const categories = document.createElement('button');
        categories.innerHTML = `
        <button 
            class="flex items-center  btn btn-outline btn-accent category py-2 px-8 gap-2 rounded-2xl border border-gray-300" 
         >
           <div class="w-[30px]"> <img  src="${item.category_icon}" alt="" /></div>
            <p class="text-xl font-semibold" >${item.category}</p>
          </button>
        `;
        
        categoryContainer.appendChild(categories);
    } );
};

loadCategories();
 
loadAllFiles();


