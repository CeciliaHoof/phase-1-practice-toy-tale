let addToy = false;
let toyArr;
let selectedToy;

fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(data => {
    toyArr = data
    renderToyArr(data)})


const toyDiv = document.querySelector('#toy-collection');
const toyForm = document.querySelector('.add-toy-form');

function createToyArr(data){
  return toyArr = data
}

function renderToyArr(toysArr){
  toysArr.forEach(toy => {

    const cardDiv = document.createElement('div');
    cardDiv.className = "card";
    
    const toyName = document.createElement('h2');
    toyName.textContent = toy.name;

    const toyImg = document.createElement('img');
    toyImg.src = toy.image;
    toyImg.className = "toy-avatar";

    const toyLikes = document.createElement('p');
    let currLikes = toy.likes; /*if this is declared in event, it will 
    automatically reset to info from db.json every time, you click*/
    toyLikes.textContent = toy.likes + " likes";
    
    const likeBtn = document.createElement('button');
    likeBtn.id = toy.id;
    likeBtn.className = "like-btn";
    likeBtn.textContent = "Like ❤️"

    likeBtn.addEventListener('click', ()=>{
      currLikes++;
      toyLikes.textContent = currLikes + " likes";
      //
      
      // fetch(`http://localhost:3000/toys/${toyId}`,{
      //   method :'PATCH',
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json"},
      //   body: JSON.stringify({likes : currentLikes})
      // })
    })

    cardDiv.append(toyName, toyImg, toyLikes, likeBtn);
    toyDiv.appendChild(cardDiv);
  })
}


toyForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let indexValue = toyArr.length + 1;
  const newToyObj = {
    id : indexValue,
    name : e.target.name.value,
    image : e.target.image.value,
    likes : 0 
  }
  toyArr.push(newToyObj)
  renderToyArr([newToyObj]);
  // fetch('http://localhost:3000/toys', {
  //   method: 'POST',
  //   headers: {
  //     "Content-Type": "application/json",
  //     Accept: "application/json"},
  //   body: JSON.stringify(newToyObj)
  // })
    // .then(resp => resp.json())
    // .then(data => renderChars([data]))
})

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});