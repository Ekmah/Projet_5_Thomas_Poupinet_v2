
let items = Storage.get("products");
let addressValid = false
let cityValid = false
let firstNameValid = false
let lastNameValid = false
let emailValid = false

showSaved()

function checkForm(){

    disableSubmitButton()

    if (addressValid && cityValid && firstNameValid && lastNameValid && emailValid) {
        enableSubmitButton()
    }
}

function showError(element){
    element.classList.add('is-invalid')
}

function hideError(element){
    element.classList.remove('is-invalid')
}

function listenForm(id){
    document.getElementById(id).addEventListener('keyup', function(e) {
        let value = e.target.value
        showError(e.target)
        if (!id.includes("mail")){
            if (value.length >= 1){
                checkForm()
                hideError(e.target)
            }
        }
        else {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+/
            if (value.length >= 1 && value.match(regex)){
                checkForm()
                hideError(e.target)
            }
        }
    })
}

for (id of items) {
    fetch(`http://localhost:3000/api/furniture/${id}`)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(thing) {
        document.getElementById("mainContent").innerHTML += renderProductCart("5", thing)
        window.setTimeout(() => {
        document.getElementById(thing._id).addEventListener('click', removeProduct)
        }, 1000)
        listenForm("inputAddress")
        listenForm("inputCity")
        listenForm("inputFirstName")
        listenForm("inputLastName")
        listenForm("inputEmail")
        document.getElementById("send_order").addEventListener('click', function(e) {
            e.preventDefault()
            payload = {
                "contact": {
                    "firstName": document.getElementById("inputFirstName").value,
                    "lastName": document.getElementById("inputLastName").value,
                    "address": document.getElementById("inputAddress").value,
                    "city": document.getElementById("inputCity").value,
                    "email": document.getElementById("inputEmail").value
                },
                "products":Storage.get("products")
            }
            console.log(payload)
            // fetch(`http://localhost:3000/api/furniture/order`, payload)
        })
    })
}

function removeProduct (e) {
    let itemId = e.target.getAttribute('id')
    let products = [itemId]
    if (Storage.has('products')) {
        products = Storage.get('products')
        index = products.indexOf(itemId)
        products.splice(index, 1)
    }
    Storage.store('products', products)
    window.location.reload()
}

function enableSubmitButton() {
    let element = document.getElementById("send_order")
    if (element.classList.contains('disabled')){
        element.classList.remove("disabled")
    }
}
function disableSubmitButton() {
    let element = document.getElementById("send_order")
    if (!element.classList.contains('disabled')){
        element.classList.add("disabled")
    }
}