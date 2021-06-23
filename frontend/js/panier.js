
let items = Storage.get("products");
showSaved()
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
        let adress = false
        let city = false
        let firstName = false
        let lastName = false
        let email = false
        document.getElementById("inputAddress").addEventListener('keyup', function(k) {
            let value = k.target.value
            if (value.length >= 1){
                adress = value
                if (email && lastName && firstName && city && adress ){
                    document.getElementById("send_order").classList.remove("disabled")
                }
            }
        })
        document.getElementById("inputCity").addEventListener('keyup', function(k) {
            let value = k.target.value
            if (value.length >= 1){
                city = value
                if (email && lastName && firstname && city && adress ){
                    document.getElementById("send_order").classList.remove("disabled")
                }
            }
        })
        document.getElementById("inputFirstName").addEventListener('keyup', function(k) {
            let value = k.target.value
            if (value.length >= 1){
                firstName = value
                if (email && lastName && firstName && city && adress ){
                    document.getElementById("send_order").classList.remove("disabled")
                }
            }
        })
        document.getElementById("inputLastName").addEventListener('keyup', function(k) {
            let value = k.target.value
            if (value.length >= 1){
                lastName = value
                if (email && lastName && firstName && city && adress ){
                    document.getElementById("send_order").classList.remove("disabled")
                }
            }
        })
        document.getElementById("inputEmail").addEventListener('keyup', function(k) {
            let value = k.target.value
            if (value.length >= 1 && value.includes("@")){
                email = value
                if (email && lastName && firstName && city && adress ){
                    document.getElementById("send_order").classList.remove("disabled")
                }
            }
        })
        document.getElementById("send_order").addEventListener('click', function(z) {
            request = {
                "contact": {
                    "firstName": firstName,
                    "lastName": lastName,
                    "address": adress,
                    "city": city,
                    "email": email
                },
                "products":Storage.get("produtcs")
            }
            fetch(`http://localhost:3000/api/furniture/order`, request)
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