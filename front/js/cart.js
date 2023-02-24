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