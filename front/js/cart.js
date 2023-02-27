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