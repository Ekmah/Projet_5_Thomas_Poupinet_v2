
fetch('http://localhost:3000/api/furniture')
.then(function(res) {
    if (res.ok) {
        return res.json();
    }
})
.then(function(value) {
    for (thing of value) {
        document.getElementById("mainContent").innerHTML += renderProductBox(5, thing, "multi")
    }
})
.catch(function(err) {
    // Une erreur est survenue
});
