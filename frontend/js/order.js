const params = new URLSearchParams(window.location.search)
const orderId = params.get("orderId");
console.log(orderId)