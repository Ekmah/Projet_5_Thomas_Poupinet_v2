
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
        let firstname = false
        let lastname = false
        let email = false
        document.getElementById("inputAddress").addEventListener('keyup', function(k) {
            let value = k.target.value
            if (value.length >= 1){
                adress = true
                if (email === true && lastname === true && firstname === true && city === true && adress === true){
                    document.getElementById("send_order").classList.remove("disabled")
                }
            }
        })
        document.getElementById("inputCity").addEventListener('keyup', function(k) {
            let value = k.target.value
            if (value.length >= 1){
                city = true
                if (email === true && lastname === true && firstname === true && city === true && adress === true){
                    document.getElementById("send_order").classList.remove("disabled")
                }
            }
        })
        document.getElementById("inputFirstName").addEventListener('keyup', function(k) {
            let value = k.target.value
            if (value.length >= 1){
                firstname = true
                if (email === true && lastname === true && firstname === true && city === true && adress === true){
                    document.getElementById("send_order").classList.remove("disabled")
                }
            }
        })
        document.getElementById("inputLastName").addEventListener('keyup', function(k) {
            let value = k.target.value
            if (value.length >= 1){
                lastname = true
                if (email === true && lastname === true && firstname === true && city === true && adress === true){
                    document.getElementById("send_order").classList.remove("disabled")
                }
            }
        })
        document.getElementById("inputEmail").addEventListener('keyup', function(k) {
            let value = k.target.value
            if (value.length >= 1 && value.includes("@")){
                email = true
                if (email === true && lastname === true && firstname === true && city === true && adress === true){
                    document.getElementById("send_order").classList.remove("disabled")
                }
            }
        })
        document.getElementById("send_order").addEventListener('click', function(z) {
            
            
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