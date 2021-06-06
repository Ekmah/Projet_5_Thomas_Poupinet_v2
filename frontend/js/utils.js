// ajout largeur variable
function renderProductBox(width, thing, type) {
    let options = '';
    let button = `<a href='produit.html?id=${thing._id}' class='btn btn-success'>Voir le produit</a>`;
    let height = '150';
    if (type == "single") {
        height = '350'
        options = `<select class="form-select" aria-label="Default select example">`;
        for (element of thing.varnish) {
            options += `<option value='${element}'>${element}</option>`
        }
        options += `</select>`
        button = `<button type='button' class='btn btn-success' id='ajouterAuPanier'>Ajouter au panier</button>`
    };
    return `
    <div class='col-sm-${width}'>
        <div class='card' style='margin:25px;'>
            <img src='${thing.imageUrl}' class='card-img-top' alt='...' style='height:${height}px;object-fit: cover;'> 
            <div class='card-body'> 
                <h5 class='card-title'>${thing.name}</h5>
                <p class='card-text'>${thing.description}</p>
                ${options}
                <p class='card-text'> Prix: ${moneyConvert(thing.price)}€</p>
                ${button}
            </div>
        </div>
    </div>
    `
}
function moneyConvert(price) {
    return Math.round(price/100, 2) + ' €' //divise par 100 et arrondis
}