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
function renderProductCart(width, thing) {
    let options = '';
    let height = '250';
    return `
    <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0" style='height:${height}px;'>
            <img class="col-sm-4" src="${thing.imageUrl}" alt="..." style='height:${height}px;object-fit: cover;'>
            <div class="col-sm-8">
                <div class="card-body">
                    <h5 class="card-title">${thing.name}</h5>
                    <p class="card-text">${thing.description}</p>
                    <p class="card-text"> Prix: ${moneyConvert(thing.price)}€</p>
                    <a href="panier.html" class='btn btn-danger' id='enleverDuPanier' onclick='delLocalElement(${thing._id})'>Supprimer</a>
                </div>
            </div>
        </div>
    </div>`
}
function delLocalElement(id){
    array = localStorage.getItem('products')
    array = JSON.parse(array)
    index = array.indexOf(id)
    array.splice(id, 1)
    localStorage.setItem('products', JSON.stringify(array))
    alert('le produit as bien été supprimé du panier')
}

function moneyConvert(price) {
    return Math.round(price/100, 2) + ' €' //divise par 100 et arrondis
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
function showSaved () {
    let items = localStorage.getItem("products");
    items = JSON.parse(items);
    let number_items = 0
    for (item in items){
        number_items+=1
    }
    if (number_items>0){
        document.getElementById("notify-bubble").innerText = number_items
        document.getElementById("notify-bubble").style.display = 'block';
    }
}