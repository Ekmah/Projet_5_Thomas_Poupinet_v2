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
                <p class='card-text'> Prix: ${moneyConvert(thing.price)}</p>
                ${button}
            </div>
        </div>
    </div>
    `
}

function renderProductCart(width, thing) {
    let options = '';
    let height = '250';
    return `
    <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0" style=''>
            <img class="col-sm-4" src="${thing.imageUrl}" alt="..." style='object-fit: cover;'>
            <div class="col-sm-8">
                <div class="card-body">
                    <h5 class="card-title">${thing.name}</h5>
                    <p class="card-text">${thing.description}</p>
                    <p class="card-text"> Prix: ${moneyConvert(thing.price)}</p>
                    <span class='btn btn-danger' id='${thing._id}'>Supprimer</span>
                </div>
            </div>
        </div>
    </div>`
}

function moneyConvert(price) {
    return Math.round(price/100, 2) + ' €' //divise par 100 et arrondis
}

function checkIfItemExists (id) {
    if(!Storage.has('products')){
        return false
    }
    return (Storage.get('products').includes(id))
}

function showSaved () {
    let number_items = numberOfProductsINCart()
    if (number_items>0){
        document.getElementById("notify-bubble").innerText = number_items
        document.getElementById("notify-bubble").style.display = 'block';
    }
}

function numberOfProductsINCart(){
    if (!Storage.has('products')){
        return 0
    }
    return Storage.get('products').length
}

function disable(id) {
    document.getElementById(id).setAttribute('disabled', true);
    document.getElementById(id).style.opacity = 0.5;
    document.getElementById(id).style.cursor = 'not-allowed';
}

function testFormSimple() {
    let value = adress.val()
    if ( value.length == 0) {
        disable(send_order)
    }
}