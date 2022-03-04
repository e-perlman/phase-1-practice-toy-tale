let addToy = false;

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
  //Getting cards from server
  fetch('http://localhost:3000/toys')
  .then(res=>res.json())
  .then(toys=>addToyCard(toys))

  //Creating a card for each toy
  function addToyCard(toyList){
    toyList.forEach(toy=>makeToyCard(toy))
  }
//Creating a toy card
  function makeToyCard(toy){   
    const toyCard=document.createElement('div')
    toyCard.className='card'

    const name=document.createElement('h2')
    name.textContent=`${toy.name}`
    toyCard.appendChild(name)

    const img=document.createElement('img')
    img.src=`${toy.image}`
    img.className='toy-avatar'
    toyCard.appendChild(img)

    const likes=document.createElement('p')
    likes.textContent=`${toy.likes} Likes`
    toyCard.appendChild(likes)

    const likeButton=document.createElement('button')
    likeButton.textContent='Like'
    likeButton.id=`${toy.id}`
    likeButton.className='like-btn'
    toyCard.appendChild(likeButton)

    //updating dom when like button is clicked
    toyCard.querySelector(`button`).addEventListener('click',()=>{
      toy.likes+=1
      toyCard.querySelector('p').textContent=`${toy.likes} Likes`
      updateLikes(toy)
    })
    document.querySelector('#toy-collection').appendChild(toyCard)
  }
    
  //Collecting toy from form and posting to server
  document.querySelector('.add-toy-form').addEventListener('submit',handleSubmit)
  function handleSubmit(e){
    e.preventDefault()
    let toyObj={
      name:e.target.name.value,
      image:e.target.image.value,
      likes:0
    }
    fetch('http://localhost:3000/toys',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json',
        Accept:'application/json'
      },
      body:JSON.stringify(toyObj)
    })
    .then(res=>res.json())
    .then(toy=>makeToyCard(toy)) //making the toy a card on dom
  }
  
  function updateLikes(toyObj){
    fetch(`http://localhost:3000/toys/${toyObj.id}`,{
      method: 'PATCH',
      headers:{
        'Content-Type':'application/json',
        Accept:'application/json'
      },
      body:JSON.stringify(toyObj)
    })
    .then(res=>res.json())
     
  }
  
});
