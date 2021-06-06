const params = new URLSearchParams(window.location.search)
const id = params.get("id");

fetch(`http://localhost:3000/api/furniture/${id}`)
.then(function(res) {
    if (res.ok) {
        return res.json();
    }
})
.then(function(thing) {
    console.log(thing);
    price = thing.price/100
    let content = document.getElementById("mainContent")
    const widthproduct = 10
    content.innerHTML +=`
    <div class='col-sm-${widthproduct}'>
        <div class='card' style='margin:25px;'>
            <img src='${thing.imageUrl}' class='card-img-top' alt='...' style='height:350px;object-fit: cover;'> 
            <div class='card-body'> 
                <h5 class='card-title'>${thing.name}</h5>
                <p class='card-text'>${thing.description}</p>
                <select class="form-select" aria-label="Default select example">
                </select>
                <p class='card-text'> Prix: ${price}€</p>
                <a href='panier.html' class='btn btn-success'>Ajouter au panier</a>
            </div>
        </div>
    </div>`
    let select = document.getElementsByClassName("form_select")
    for (element of thing.varnish){
        console.log(element)
        select.innerHTML +=`<option value='${element}'>${element}</option>`
    }
})
.catch(function(err) {
    // Une erreur est survenue
});