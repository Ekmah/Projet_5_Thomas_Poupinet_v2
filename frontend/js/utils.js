// ajout largeur variable
const html_product_card = `
<div class='col-sm-10'>
    <div class='card' style='margin:25px;'>
        <img src='${thing.imageUrl}' class='card-img-top' alt='...' style='height:150px;object-fit: cover;'> 
        <div class='card-body'> 
            <h5 class='card-title'>${thing.name}</h5>
            <p class='card-text'>${thing.description}</p>
            <select class="form-select" aria-label="Default select example">
            </select>
            <p class='card-text'> Prix: ${price}€</p>
            <a href='panier.html}' class='btn btn-success'>Ajouter au panier</a>
        </div>
    </div>
</div>`