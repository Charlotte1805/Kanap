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
 
    //cree le h3
    let kanap_h3 = document.createElement("h3");
    kanap_h3.innerText = kanap.name;
    kanap_h3.classList.add("productName");
    //cree le paragraphe
    let kanap_p = document.createElement("p");
    kanap_p.innerText = kanap.description;
    kanap_p.classList.add("productDescription");

    //ajouter l'élément img dans la balise article
    kanap_article.appendChild(kanap_img);
    //ajouter l'élément h3 dans la balise article
    kanap_article.appendChild(kanap_h3);
    //ajouter l'élément p dans la balise article
    kanap_article.appendChild(kanap_p);
    //ajouter l'élément article dans la balise a
    kanap_a.appendChild(kanap_article);
    //ajouter l'élément a dans la balise items
    section_product.appendChild(kanap_a);
  }
})
