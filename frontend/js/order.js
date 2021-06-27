const params = new URLSearchParams(window.location.search)
const orderId = params.get("orderId");
let el = document.getElementById("orderId")
el.innerText += orderId