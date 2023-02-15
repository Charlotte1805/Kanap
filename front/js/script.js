//le lien du catalogue des images à récuperer
fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((objetProduits) => {

console.log(  objetProduits )

let section_product = document.getElementById("items");
    for (let i = 0; i < objetProduits.length; i++) {
    let kanap = objetProduits[i];
 
    //cree le lien balise a
    let kanap_a = document.createElement("a");
    kanap_a.href = "./product.html?id="+kanap._id;
    //cree l'article
    let kanap_article = document.createElement("article");
   
    //cree l'image
    let kanap_img = document.createElement("img");
    kanap_img.src = kanap.imageUrl;
    kanap_img.alt = kanap.altTxt;
 
 
})
