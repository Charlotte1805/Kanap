// Constante qui permet de récupérer la valeur du paramètre orderId passé en paramètre d'url du navigateur

const orderId = new URL(window.location.href).searchParams.get("orderId");

// On met à jour le numéro de commande dans le DOM

document.getElementById("orderId").innerText = getOrderId()

// On vide le localStorage, le processus est terminé

localStorage.clear()