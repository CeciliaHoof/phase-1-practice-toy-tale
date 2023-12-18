let addToy = false;
let toysArr;

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

fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(data => {
    toysArr = data;  
    createCards(toysArr);
    buttonHandler()
  })

const cardContainer = document.querySelector("#toy-collection")
function createCards(toysArr){
  toysArr.forEach(toy => {
    let card = document.createElement("div");
    card.className = "card";
    
    let name = document.createElement("h2");
    name.textContent = toy.name;

    let img = document.createElement("img");
    img.className = "toy-avatar"
    img.src = toy.image;

    let like = document.createElement("p");
    let pID = toy.id + "_likes";
    like.setAttribute('id', pID)
    like.textContent = toy.likes;

    let likeBtn = document.createElement("button");
    likeBtn.className = "like-btn";
    likeBtn.setAttribute('id', toy.id);
    likeBtn.textContent= "Like ❤️"

    card.appendChild(name);
    card.appendChild(img);
    card.appendChild(like);
    card.appendChild(likeBtn);
    cardContainer.appendChild(card);
  })
}

const newToyForm = document.querySelector("form");
newToyForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let newToy = {
    name: (e.target.name.value),
    image: (e.target.image.value),
    likes: 0
  }
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers:{
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newToy)
  })
  .then((resp) => resp.json())
  .then((data) => { createCards([data])
    buttonHandler()})
})

function buttonHandler(){
  document.querySelectorAll(".like-btn").forEach(button => {
    button.addEventListener('click', handleclick)
  })
  
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(data => {
    toysArr = data;})
  
    function handleclick(e){
    let id = e.target.id;
    let likesId = id +"_likes";
    let toy = toysArr[id-1];
    let numberOfLikes = toy.likes + 1;
    let likesDisplay = document.getElementById(likesId);
    likesDisplay.textContent++;
    let fetchURL = "http://localhost:3000/toys/" + id
    fetch(fetchURL, {
      method: "PATCH",
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": numberOfLikes
      })
    })
  }
}