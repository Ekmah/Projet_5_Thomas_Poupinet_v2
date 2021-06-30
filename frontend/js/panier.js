
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
        if (!id.includes("inputEmail")){
            if (value.length >= 1){
                if (id.includes("inputAddres")){
                    addressValid = true
                }
                if (id.includes("inputCity")){
                    cityValid = true
                }
                if (id.includes("inputFirstName")){
                    firstNameValid = true
                }
                if (id.includes("inputLastName")){
                    lastNameValid = true
                }
                checkForm()
                hideError(e.target)
            }
        }
        else {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+/
            if (value.length >= 1 && value.match(regex)){
                emailValid = true
                checkForm()
                hideError(e.target)
            }
        }
    })
}

fetch(`http://localhost:3000/api/furniture/`)
.then(function(res) {
    if (res.ok) {
        return res.json();
    }
})
.then(function(things) {
    for (thing of things){
        for (id of items){
            if (id == thing._id){
                document.getElementById("mainContent").innerHTML += renderProductCart("5", thing)
            }
        }
    }
    for (id of items){
        document.getElementById(id).addEventListener('click', removeProduct)
    }
    listenForm("inputAddress")
    listenForm("inputCity")
    listenForm("inputFirstName")
    listenForm("inputLastName")
    listenForm("inputEmail")
    document.getElementById("send_order").addEventListener('click', function(e) {
        e.preventDefault()
        if (!e.target.classList.contains("disabled")){
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
            fetch(`http://localhost:3000/api/furniture/order`, {
            headers: {
                'Content-Type': "application/json"
            },
            method: 'POST',
            body: JSON.stringify(payload)
            })
            .then(function(res) {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((a) =>{
                Storage.clear('products')
                window.location = `order.html?orderId=${a.orderId}`
            })
        }   
    })
})

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