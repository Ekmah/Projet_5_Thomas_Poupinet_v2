
fetch('http://localhost:3000/api/furniture')
.then(function(res) {
    if (res.ok) {
        return res.json();
    }
})
.then(function(value) {
    for (thing of value) {
        price = thing.price/100
        let content = document.getElementById("mainContent")
        const widthproduct = 5
        content.innerHTML +=`
        <div class='col-sm-${widthproduct}'>
            <div class='card' style='margin:25px;'>
                <img src='${thing.imageUrl}' class='card-img-top' alt='...' style='height:150px;object-fit: cover;'> 
                <div class='card-body'> 
                    <h5 class='card-title'>${thing.name}</h5>
                    <p class='card-text'>${thing.description}</p>
                    <p class='card-text'> Prix: ${price}€</p>
                    <a href='produit.html?id=${thing._id}' class='btn btn-success'>Voir le produit</a>
                </div>
            </div>
        </div>`
    }
})
.catch(function(err) {
    // Une erreur est survenue
});
