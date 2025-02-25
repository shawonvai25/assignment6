const loadAllFiles = async () => {
try {
  const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
  if(!response.ok){
    throw new Error(`HTTP error status: ${response.status}`);
  }
  const data = await response.json();
  displayPets(data.pets);
 }
 catch(error){
  console.error("Error happened",error);
 }
/*  */
}
const cardContainer = document.querySelector('.container');

function buttonChange(btn) {
  btn.innerText = 'adopted';
}

/* sorted button functionality */

const sortedDisplay = () => {
const sortContainer = document.querySelector(".sortBtn-container");
sortContainer.innerHTML = `
<button
id="sortBtn"
class="mt-5 py-2 px-3 text-white rounded-md font-semibold text-sm bg-[#0E7A81] hover:scale-125 btn-viewMore"
onclick ="displaySortedPrice()"
>
Sort by price
</button>`;
};
sortedDisplay();


const displaySortedPrice = async () => {
const response  = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
const data  = await response.json();
const infos = await (data.pets);
const converted = await infos.sort((a,b) => a.price - b.price);

displayPets(converted);
};

 
const displayPets = (arrays) => {
  cardContainer.innerHTML = "";
    cardContainer.classList= "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-8/12 mx-auto"; 
    if(arrays.length === 0 ){
      cardContainer.classList = "w-full h-full flex flex-col items-center justify-center  "
      cardContainer.innerHTML = `
     
      <img class=" h-[300px] w-[300px] mx-auto" src="../images/error.webp" />
      <h2 class="font-bold text-3xl">No information available </h2>
      `
    }  
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
     <button onclick= "selectedPets(${array.petId})" class="w-[30px] hover:scale-75 border border-gray-300 rounded-md "><img  src="https://img.icons8.com/?size=48&id=82788&format=png" /></button>
     <button  onclick="buttonChange(this)" class="  border btn btn-outline btn-accent btn-sm  border-gray-300 rounded-md font-semibold text-[#0E7A81]">Adopt</button>
     <button class="border btn btn-outline btn-accent btn-sm border-gray-300  rounded-md font-semibold text-[#0E7A81]"    onclick="showModalDetails(${array.petId})" >Details</button>
     </div>
   </div>
     `;
   
     cardContainer.appendChild(div);   
    });
};
//-------------///

const showModalDetails = async (id) => {
  
  try{
    const modalBox = document.getElementById("modal");
  

  const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
  const data = await response.json();
  console.log(data.petData);
  
  modalBox.innerHTML = `
  <dialog id="pets-modal" class="modal w-full mx-auto">
  
  <div class="modal-box">
  <div class="mx-auto flex flex-col w-full items-center">
  <figure class="w-full">
  <img src="${data.petData.image}" class="object-cover  rounded-xl w-full" />   
  </figure>
  <div class="card-body mx-auto">
  <h2 class="font-bold text-2xl">${data.petData.breed}</h2>
  </div>
  </div>
  <div>
  <h3 class="font-bold text-lg">Details Information</h3>
  <p>${data.petData.pet_details}</p>
  </div>
  <div class="modal-action  rounded-md">
    <form method="dialog " class="w-full ">
      <!-- if there is a button in form, it will close the modal -->
      <button class="btn w-full  bg-green-300">Cancel</button>
    </form>
  </div>
</div>

  </dialog> `;

  const dialog = document.getElementById('pets-modal');
  dialog.showModal();

  }
  
  catch(error){
    
    console.log(error);
  }

};

//------------------

const selectedPets = async (id) =>{
const likedContainer = document.querySelector('.adopted-container');
const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
const data = await response.json();
const img = document.createElement('img');
img.src = data.petData.image;
img.classList.add("rounded-md");
img.classList.add("mb-px")

likedContainer.appendChild(img);

};
selectedPets();
//--------------------



const loadCategoryPets = async (id) => {
 
  try{
    const response = await  fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`);
    const data  = await response.json();
    displayPets(data.data)
    console.log(data.data)
   
  }
  catch(error){
    console.error(error)
  }
};




const loadCategories = async () => {  
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`);
    const data = await response.json();
   
    displayCategories(data.categories);
};



const displayCategories = (items) => {
    const categoryContainer = document.querySelector('.category-container');
    items.forEach((item) => {
       

        const button = document.createElement('button');
        button.innerHTML = `
        <button 
        class="flex items-center btn btn-outline btn-accent category py-2 px-8 gap-2 rounded-2xl border border-gray-300"  onclick="loadCategoryPets('${item.category}')"
     >
       <div class="w-[30px]"> <img  src="${item.category_icon}" alt="" /></div>
        <p class="text-xl font-semibold" >${item.category}</p>
      </button>
        `;
        
        categoryContainer.appendChild(button);
    } );
};



loadCategories();
 
loadAllFiles();


