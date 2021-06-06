const params = new URLSearchParams(window.location.search)
const id = params.get("id");

fetch(`http://localhost:3000/api/furniture/${id}`)
.then(function(res) {
    if (res.ok) {
        return res.json();
    }
})
.then(function(thing) {
    document.getElementById("mainContent").innerHTML += renderProductBox(10, thing, "single");
    document.getElementById("ajouterAuPanier").addEventListener('click', function()
    {
        localStorage.setItem('products', id);
        alert('le produit as bien été ajouté au panier');
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