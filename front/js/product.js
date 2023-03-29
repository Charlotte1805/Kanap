// Constante qui permet de récupérer la valeur du paramètre id passé en paramètre d'url du navigateur

const productId = new URL(window.location.href).searchParams.get("id");

// Déclarations des éléments du DOM

const prodTitle = document.getElementById("title")
const prodColor = document.getElementById("colors")
const prodImage = document.querySelector(".item__img")
const prodDescription = document.getElementById("description")
const prodPrice = document.getElementById("price")
const prodColors = document.getElementById('colors')
const prodQuantity = document.getElementById('quantity')
const addToCartButton = document.getElementById('addToCart')

// Appel de l'API pour récupérer toutes les informations associées au produit

fetch(`http://localhost:3000/api/products/${productId}`)
    .then((res) => res.json())
    .then((object) => {

        // Pour chaque couleur disponible
        for ( let color of object.colors) {
            // On crée une option pour la liste déroulante des couleurs proposées
            let optionColor = document.createElement('option')
            optionColor.value = color
            optionColor.innerText = color
            // On ajoute la couleur à la liste déroulante des couleurs proposées
            prodColors.appendChild(optionColor)
        }
         // On crée dynamiquement l'image du produit avec ses caractéristiques
        let productImg = document.createElement('img')
        productImg.src = object.imageUrl
        productImg.alt = object.altTxt
        productImg.title = object.name
        // On ajoute l'image dans le DOM
        prodImage.appendChild(productImg)
        // On insère le nom du produit
        prodTitle.innerText = object.name
        // On insère le prix du produit
        prodPrice.innerText = object.price
        // On insère la description du produit
        prodDescription.innerText = object.description
    })

    .catch(function (err) {
        console.log(err);
    });

// Fonction addToCart() qui permet d'ajouter un produit au panier ( + localStorage )
function addToCart() {

    // Si on a pas d'identifiant de produit

    if (!productId)
        return false;

    // Si la couleur sélectionnée est incorrecte

    if (prodColors.value === "") {
        alert("Couleur sélectionnée incorrecte");
        // Si la quantité sélectionnée est incorrecte
    } else if (prodQuantity.value <= 0 || prodQuantity.value > 100) {
            alert("Quantité sélectionnée incorrecte");
            // Si tout est OK
        } else {
            // On vient stocker l'identifiant du produit, la couleur et la quantité dans un objet JavaScript
            let newProduct = {
                id: productId,
                color: prodColors.value,
                quantity: prodQuantity.value
                }

            // On récupère le contenu du panier
            let basket = getBasket();

            // Si le panier n'est pas vide

            if ( basket != null) {

                // On recherche si le produit que l'on essaye d'ajouter existe déjà
                let indexProduct = basket.findIndex( (element) => element.id === productId && element.color == prodColors.value );

                // Si le produit existe déjà
                if (indexProduct != -1) {
                    // On cumule l'ancienne quantité avec la nouvelle quantité
                    let newQuantity = parseInt(basket[indexProduct].quantity) + parseInt(prodQuantity.value)
                    // On met à jour la nouvelle quantité dans le localStorage
                    basket[indexProduct].quantity = newQuantity
                    // On ajoute le produit au panier
                    basket.push(newProduct)
                    basket.pop()
                    // Si le produit n'existe pas

                } else {
                    // On ajoute le produit au panier
                    basket.push(newProduct)
                }

                // Si le panier est vide
            } else {
                // On ajoute le produit au panier
                basket.push(newProduct)
            }

            // On sauvegarde le panier
            saveBasket(basket);

            // On redirige sur la page panier
            document.location.href = "cart.html";
        }
}

// Fonction saveBasket() qui permet d'enregistrer le contenu du localStorage passé en paramètre et qui stocké dans la clé basket
// stringify : Transforme un objet JavaScript en une chaîne JSON
// setItem : ajout ou met à jour la valeur associée à la clé passée en paramètre

function saveBasket(basket) {

    if (!basket)
        return false;

    localStorage.setItem("basket", JSON.stringify(basket));
}

// Fonction getBasket() qui permet de retourner le contenu du localStorage stocké dans la clé basket
// parse : transforme une chaîne JSON en objet JavaScript
// getItem : renvoie la valeur associée à la clé passée en paramètre

function getBasket() {

    let basket = JSON.parse(localStorage.getItem("basket"));

    if (basket === null) {
        return [];
    } else {
        return basket
    }
}

// On ajoute un évènement JavaScript sur le bouton "ajouter au panier" avec la fonction associée addToCart

addToCartButton.addEventListener('click', addToCart);
