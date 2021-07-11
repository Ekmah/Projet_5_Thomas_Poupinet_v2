const params = new URLSearchParams(window.location.search)
showSaved()
const orderId = params.get("orderId");
let el = document.getElementById("orderId")
el.innerText += orderId
const totalPrice = params.get("totalPrice");
el.innerHTML += `<div class="orderPrice">Le prix total de votre commande est:</div>${totalPrice}`