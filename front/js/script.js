//le lien du catalogue des images à récuperer
fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((objetProduits) => {

console.log(  objetProduits )
 
})
