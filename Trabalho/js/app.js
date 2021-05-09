var totalItemQuantity = 0;
var totalItemPrice = 0;

function dragStart(ev) {
   $("#cart-items").removeAttr("hidden");

    const eventTarget = ev.target;

    let productName = eventTarget.querySelector('.card-title').innerHTML;
    let productPrice = eventTarget.querySelector('input[name="price"]').value;
    let productQuantity = eventTarget.querySelector('input[name="quantity"]').value;

    // Alimenta as variáveis que serão utilizadas no dropProduct
    ev.dataTransfer.setData("name", productName);
    ev.dataTransfer.setData("price", productPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}));
    ev.dataTransfer.setData("quantity", productQuantity);
}

function dragEnd(ev) {
    ev.preventDefault();
    $("#cart-items").attr("hidden", true);
}

const refreshCart = () => {
    $("#cart-message").attr("hidden", ($("#cart-list tbody tr").length > 0));
}

calculateTotals(totalItemPrice, totalItemQuantity);

function allowDrop(ev) {
    ev.preventDefault();
}

function deleteProduct(element) {
    const parents = $(element).parents('tr');

    let productQuantity = - Number(parents[0].children[1].innerHTML)
    let productPrice = - Number(parents[0].children[2].innerHTML)
    

    
    parents.remove();
    calculateTotals(productPrice, productQuantity);
}

function dropProduct(ev) {
    ev.preventDefault();

    // Recupera os dados alimentados
    let productName = ev.dataTransfer.getData("name");
    let productPrice = ev.dataTransfer.getData("price");
    let productQuantity = ev.dataTransfer.getData("quantity");

    // Busca a tabela e cria o elemento
    var tbody = $("#cart-list tbody");
    var tr = $("<tr class=\"col-12\"></tr>");
    var nameCol = $(`<td>${productName}</td>`);
    var quantityCol = $(`<td>${productQuantity}</td>`);
    var totalPriceCol = $(`<td>${(productPrice * productQuantity).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>`);
    var buttonCol = $("<td><button type=\"button\" class=\"btn btn-danger\" onclick=\"deleteProduct(this)\">Remover</button></td>");

    tr.append(nameCol, quantityCol, totalPriceCol, buttonCol);
    tbody.append(tr);

    calculateTotals((productPrice * productQuantity), productQuantity);

   $("#cart-items").attr("hidden", true);
}

function calculateTotals(price, quantity) {
    totalItemPrice += Number(price);
    totalItemQuantity += Number(quantity);

    $("#totalQuantity").text(totalItemQuantity);
    if (totalItemPrice > 0) {
        $("#totalPrice").text(totalItemPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}));
    } else {
        $("#totalPrice").text("0");
    }

    refreshCart();

}