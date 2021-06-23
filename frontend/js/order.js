


const params = new URLSearchParams(window.location.search)
const adress = params.get("adress");
const city = params.get("city");
const email = params.get("email");
const firstName = params.get("firstname");
const lastName = params.get("lastname");

var form = {adress:adress, city:city, email:email, firstNzme:firstName, lastName:lastName}
console.log(JSON.stringify(form))
products = Storage.get("products")