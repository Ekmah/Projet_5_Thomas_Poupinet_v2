let items = localStorage.getItem("products");
items = JSON.parse(items);
console.log(items)
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
        document.getElementById("enleverDuPanier").addEventListener('click', function() {
            ids = [id]
            array = localStorage.getItem('products')
            if (array) {
                array = JSON.parse(array)
                index = array.indexOf(id)
                array.splice(id, 1)
                localStorage.setItem('products', JSON.stringify(array))
            }
            else {
                localStorage.setItem('products', JSON.stringify(ids))
            }
            alert('le produit as bien été supprimé du panier')
            
        })
    })
}
