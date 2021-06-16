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
            document.getElementById(thing._id).addEventListener('click', function(e) {
                let itemId = e.target.getAttribute('id')
                let products = [itemId]
                if (Storage.has('products')) {
                    products = Storage.get('products')
                    index = products.indexOf(itemId)
                    products.splice(index, 1)
                }
                Storage.store('products', products)
                window.location.reload()
            })
        },1000)
        let adress = $('#inputAddress')
        adress.change(testFormSimple()).keyup(function() {
            $(this).change();
        });
        let city = $('#inputCity')
        city.change(testFormSimple()).keyup(function() {
            $(this).change();
        });
        let FirstName = $('#inputFirstName')
        FirstName.change(testFormSimple()).keyup(function() {
            $(this).change();
        });
        let LastName = $('#inputLastName')
        LastName.change(testFormSimple()).keyup(function() {
            $(this).change();
        });
    })
}
