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

    // Actions sur le bouton commander 
        const orderButton = document.getElementById('order')
        orderButton.addEventListener("click", async function(event) {
            // On stoppe le submit
            event.preventDefault()
            
            // Initialisation d'un compteur d'erreurs
            let nbErrors = 0
    
            // Récupération des valeurs saisies dans les champs du formulaire
            let valFirstName = inputFirstName.value
            let valLastName = inputLastName.value
            let valAddress = inputAddress.value
            let valCity = inputCity.value
            let valEmail = inputEmail.value
            
            // On vérifie la saisie et la validité du prénom
            firstNameErrorMsg.innerHTML = "";
            if (firstNameRegex.test(valFirstName) == false || valFirstName === null) {
                firstNameErrorMsg.innerHTML = "Prénom invalide";
                // On ajoute +1 au compteur d'erreur
                nbErrors++
            } 
            
            // On vérifie la saisie et la validité du npm
            lastNameErrorMsg.innerHTML = "";
            if (lastNameRegex.test(valLastName) == false || valLastName === null ) {
                lastNameErrorMsg.innerHTML = "Nom invalide";
                // On ajoute +1 au compteur d'erreur
                nbErrors++
            }
            
            // On vérifie la saisie et la validité de l'adresse postale
            addressErrorMsg.innerHTML = "";
            if (addressRegex.test(valAddress) == false || valAddress === null) {
                addressErrorMsg.innerHTML = "Adresse postale invalide";
                // On ajoute +1 au compteur d'erreur
                nbErrors++
            } 
            
            // On vérifie la saisie et la validité de la ville
            cityErrorMsg.innerHTML = "";
            if (cityRegex.test(valCity) == false || valCity === null) {
                cityErrorMsg.innerHTML = "Ville invalide";
                // On ajoute +1 au compteur d'erreur
                nbErrors++
            }
            
            // On vérifie la saisie et la validité de l'adresse email
            emailErrorMsg.innerHTML = "";
            if (emailRegex.test(valEmail) == false || valEmail === null) {
                emailErrorMsg.innerHTML = "Adresse email invalide";
                // On ajoute +1 au compteur d'erreur
                nbErrors++
            }
    
            // Si le formulaire est correctement saist, on appelle la fonction sendAPI()
            if (!nbErrors)
                sendAPI()
    
            // Retourne false si on a des erreurs dans le formulaire
            return false;
        });

    
}

const inputFirstName = document.getElementById("firstName");

const inputLastName = document.getElementById("lastName");

const inputAddress = document.getElementById("address");

const inputCity = document.getElementById("city");

const inputEmail = document.getElementById("email");

// Déclaration des regex pour le formulaire de la page panier

const firstNameRegex = /^[a-zA-Zàâäéèêëïîôöùûüÿç-]+$/i

const lastNameRegex = /^[a-zA-Zàâäéèêëïîôöùûüÿç-]+$/i

const addressRegex = /^[0-9]{1,5}\s+[A-Za-zéèàïêç\-\s]{2,50}$/

const cityRegex = /^(?![\s.]+$)[A-zÀ-ú\s\-']{1,25}$/

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

// Déclaration des cibles erreurs pour le formulaire de la page panier

const firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");

const lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");

const addressErrorMsg = document.querySelector("#addressErrorMsg");

const cityErrorMsg = document.querySelector("#cityErrorMsg");

const emailErrorMsg = document.querySelector("#emailErrorMsg");

// Fonction sendAPI() qui permet l'appel de l'API en méthode POST de la route /products/order

async 
function sendAPI() {

    // On récupère le contenu du panier

    let basket = getBasket()

    // On initialise un tableau vide

    let products = []

    // Création d'un tableau d'identifiants de produits commandés issus du panier

    for (let product of basket) {

        products.push(product.id);

    }

    // Paramètres pour API : un objet contact et un tableau d'identifiants de produit

    let datas = {

        contact: {

            firstName: valFirstName,

            lastName: valLastName,

            address: valAddress,

            city: valCity,

            email: valEmail

        },

        products: products

    }     

    // Appel de l'API commande

    let order = await 

    fetch("http://localhost:3000/api/products/order", {

        method: "POST",

        body: JSON.stringify( datas ),

        headers: {

            "Content-type": "application/json",

        },

    }).then((res) => res.json())

      .then((order) => {

            return order

        })

        .catch(function (err) {

            console.log(err);

        });

    // Si l'API retourne un numéro de commande, on redirige sur la page confirmation

    if (order.orderId)

        document.location.href = "confirmation.html?orderId=" + order.orderId

    // Si l'API ne retourne rien, on retourne false

    return 
false;

}
