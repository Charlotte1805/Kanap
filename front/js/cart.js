// Fonction saveBasket() qui permet d'enregistrer le contenu du localStorage passé en paramètre et qui stocké dans la clé basket

// stringify : Transforme un objet JavaScript en une chaîne JSON

// setItem : ajout ou met à jour la valeur associée à la clé passée en paramètre

function saveBasket(basket) {

    if (!basket)

        return 
false;

localStorage.setItem("basket",

JSON.stringify(basket));

}

// Fonction getBasket() qui permet de retourner le contenu du localStorage stocké dans la clé basket

// parse : transforme une chaîne JSON en objet JavaScript

// getItem : renvoie la valeur associée à la clé passée en paramètre

function getBasket() {

    let basket = JSON.parse(localStorage.getItem("basket"));

    if (basket === null) {

        return [];

    } else {

        return 
basket

    }

}

// Déclaration des constantes

const cartItems = document.getElementById("cart__items")

// Fonction showCartItems() qui permet d'affichage une ligne article dans le panier

async 

function showCartItems() {

    // On récupère le contenu du panier

    let basket = getBasket()

    // Pour chaque produit

    for ( let product of basket ) {   

        // On appelle l'API pour récupérer les informations manquantes au localStorage

        let productAPI = await 

        fetch("http://localhost:3000/api/products/" + product.id)

                .then((res) => res.json())

                .then((product) => {

                    return product

                })

                .catch(function (err) {

                    console.log(err);

                });

        // On insère dybamiquement une ligne article dans le panier avec les informations du produit

        cartItems.innerHTML += `<article class="cart__item" data-id="${productAPI._id}" data-color="${product.color}">

            <div class="cart__item__img">

              <img src= "${productAPI.imageUrl}" alt="${productAPI.altTxt}">

            </div>

            <div class="cart__item__content">

              <div class="cart__item__content__description">

                <h2>${productAPI.name}</h2>

                <p>${product.color}</p>

                <p>${productAPI.price}
 
                €</p>

              </div>

              <div class="cart__item__content__settings">

                <div class="cart__item__content__settings__quantity">

                  <p>Qté : </p>

                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">

                </div>

                <div class="cart__item__content__settings__delete">

                  <p class="deleteItem">Supprimer</p>

                </div>

              </div>

            </div>

          </article>`;      

    }

};

showCartItems()

// Fonction totalCart() qui calcule les quantités commandées et le prix total du panier

async 

function totalCart() {

    // Initilisation de variables

    let nbProducts = 0

    let totalPrice = 0

    // Récupération des zones cibles à modifier

    let cartQty = document.getElementById('totalQuantity')

    let cartPrice = document.getElementById('totalPrice')

    // On récupère le contenu du panier

    let basket = getBasket()

    // Pour chaque article du panier        

    for ( 
   
         let product 

         of basket ) {

        // On appelle l'API pour récupérer le prix du produit

        let productAPI = await 

fetch("http://localhost:3000/api/products/" + product.id)

                .then((res) => res.json())

                .then((product) => {

                    return product

                })

                .catch(function (err) {

                    console.log(err);

                });

        // On incrément le nombre total de produit avec le nombre de produits commandés

        nbProducts += parseInt( product.quantity )

        // On incrément le montant total à payer

        totalPrice += ( parseInt(product.quantity) * parseInt(productAPI.price) )

    }

    // On mets à jour les informations

    cartQty.innerText = nbProducts

    cartPrice.innerText = totalPrice

}

totalCart()


// Fonction checkQuantity(quantity) qui permet de vérifier la validité de la quantité passée en paramètre

function checkQuantity(quantity) { 

    if (!quantity || quantity <= 0 || quantity > 100)

        alert( 'Quantité(s) saisie(s) incorrecte(s)' );

    return 

true

}

// Fonction manageEvents() qui permet de gérer les évènements JavaScript (change, click)

function manageEvents() {

    // Action pour champ quantité

    // On récupère la liste des champs "quantité"

    const inputsQuantity = document.querySelectorAll(".itemQuantity")

    // Pour chaque champ input

    for (let currentInput of inputsQuantity) {

        // Au changement de valeur

        currentInput.addEventListener("change", function () {

            // On récupère la nouvelle quantité

            let newQty = parseInt(this.value)

            // On récupère le contenu du panier

            let basket = getBasket()

            // On récupère l'identifiant du produit que l'on veut modifier

            let productId = this.closest(".cart__item").dataset.id

            // On récupère la couleur du produit que l'on veut modifier

            let productColor = this.closest(".cart__item").dataset.color

            // On recherche si le produit existe dans le panier et sa position dans le panier

            let indexProduct = basket.findIndex(

                (el) => el.id === productId && el.color == productColor

            );          

            // Si on trouve le produit

            if (indexProduct != -1) {

                // On vérifie la validité de la quantité saisie

                if (checkQuantity(newQty)) {

                    // On mets à jour la nouvelle quantité dans le panier

                    basket[indexProduct].quantity = parseInt(newQty)

                    // On enregistre le panier

                    saveBasket(basket)

                    // On (re) calcule le panier

                    totalCart()

                }

            } else {

                // Si on ne trouve pas le produit, on renvoie false

                return 
false;

            } 

        });

    }

    // Action pour chaque bouton supprimer

    // On récupère la liste des boutons "supprimer"

    const buttonsDelete = document.querySelectorAll(".deleteItem")

    // Pour chaque bouton supprimer

    for (let currentButton of buttonsDelete) {

        // Au clic du bouton supprimer

        currentButton.addEventListener("click", function (event) {

            // On récupère le contenu du panier

            let basket = getBasket()

            // On récupère l'identifiant du produit que l'on veut supprimer

            let productId = event.target.closest("article").getAttribute("data-id")

            // On récupère la couleur du produit que l'on veut supprimer

            let productColor = event.target.closest("article").getAttribute("data-color")

            // On recherche si le produit existe dans le panier et sa position dans le panier

            let indexProduct = basket.findIndex(

                (el) => el.id === productId && el.color == productColor

            );

            // Si on trouve le produit

            if (indexProduct != -1) {

                // On supprimer visuellement la ligne de l'article dans la page

                cartItems.removeChild(event.target.closest("article"));

                // On supprimer l'article du panier

                basket.splice(indexProduct, 1)

                // On enregistre le panier

                saveBasket(basket)

                // On (re) calcule le panier

                totalCart()

            } else {

                // Si on ne trouve pas le produit, on renvoie false

                return 
false;

            } 

        });

    }

    // Actions sur le bouton commander à venir

}
