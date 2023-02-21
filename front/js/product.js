const productId = new URL(window.location.href).searchParams.get("id");

console.log( productId );

const prodTitle = document.getElementById("title")

const prodColor = document.getElementById("colors")

const prodImage = document.querySelector(".item__img")

const prodDescription = document.getElementById("description")

const prodPrice = document.getElementById("price")

const prodColors = document.getElementById('colors')

const prodQuantity = document.getElementById('quantity')

const addToCartButton = document.getElementById('addToCart')


fetch(`http://localhost:3000/api/products/${productId}`)

    .then((res) => res.json())

    .then((object) => {

        console.log ( object )

    })

    .catch(function (err) {

        console.log(err);

    });

fetch(`http://localhost:3000/api/products/${productId}`)

    .then((res) => res.json())

    .then((object) => {

        for ( let color 

        of object.colors ) { 
            
            let 
  
            optionColor = document.createElement('option')

            optionColor.value = color

            optionColor.innerText = color

            prodColors.appendChild(optionColor)

        }

         let 
     
             productImg = document.createElement('img')

             productImg.src = object.imageUrl

             productImg.alt = object.altTxt

             productImg.title = object.name

             prodImage.appendChild(productImg)



             prodTitle.innerText = object.name

             prodPrice.innerText = object.price

             prodDescription.innerText = object.description

     })

    .catch(function (err) {

        console.log(err);

    });