const params = new URLSearchParams(window.location.search)
const id = params.get("id");

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
        ids = [id]
        array = localStorage.getItem('products')
        console.log(array)
        if (array) {
            array = JSON.parse(array)
            array.push(id)
            localStorage.setItem('products', JSON.stringify(array))
        }
        else {
            localStorage.setItem('products', JSON.stringify(ids))
            console.log("created")
        }
        alert('le produit as bien été ajouté au panier')
        disable("ajouterAuPanier")
        
    })
})
.catch(function(err) {
    // Une erreur est survenue
});

function disable(id) {
    document.getElementById(id).setAttribute('disabled', true);
    document.getElementById(id).style.opacity = 0.5;
    document.getElementById(id).style.cursor = 'not-allowed';
}

function checkIfItemExists (id) {
    const items = localStorage.getItem('products')
    let itemExists = false
    if (items) {
        const itemsData = JSON.parse(items)
        itemExists =  itemsData.includes(id)
    }
  
    return itemExists
}