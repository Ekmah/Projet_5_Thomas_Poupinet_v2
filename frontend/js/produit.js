const params = new URLSearchParams(window.location.search)
const id = params.get("id");
showSaved()

fetch(`http://localhost:3000/api/furniture/${id}`)
.then(function(res) {
    if (res.ok) {
        return res.json();
    }
})
.then(function(thing) {
    document.getElementById("mainContent").innerHTML += renderProductBox(10, thing, "single")
    if (checkIfItemExists(id) !== false) {
        disable("ajouterAuPanier");
    }
    
    document.getElementById("ajouterAuPanier").addEventListener('click', function() {
        let products = [id]
        if (Storage.has('products')) {
            products = Storage.get('products')
            products.push(id)
            
        }
        Storage.store('products', products)
        showSaved()
        disable("ajouterAuPanier")
        alert('le produit as bien été ajouté au panier')
        
    })
})
.catch(function(err) {
    // Une erreur est survenue
});
