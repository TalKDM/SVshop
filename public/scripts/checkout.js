basket = JSON.parse(localStorage.getItem("data")) || [];

let productOrderList = document.getElementById("productsOrderList");

calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x + y, 0);

}

calculation()

let orderListShow = () => {
    if(basket.length == 0) {
        productOrderList.innerHTML = `
        <h3>Cart is Empty!</h3>
        `;
    } else {
        fetch("/productsList",{
            method: "get",
            headers: {"Content-Type":"application/json"},
        })
        .then(res=>res.json())
        .then(data=>{
            return (productOrderList.innerHTML = basket.map((x) =>{
                let {id, item} = x;
                let search = data.find((y) => y.id === id) || []
                return `
                <div class="cart-item">
                <img  width="50" src=${search.img} alt="" />
                <div class=""details>
                <div class="title-price-x">
                    <h3 class="title-price">
                        <p>${search.name}</p>
                    </h3>
                </div>

                <div class="buttons">
                    <div id=${id} class="quantity">quantity:${item}</div
                </div>
                <h3>₪${item * search.price}</h3>
                </div>
                <hr>
                </div>
                `
            })
            .join(""))
        })
    }}
    
orderListShow()
    

const updateCart = (id) => {
    let search = basket.find((x) => x.id === id)
    document.getElementById(id).innerHTML = search.item;
    calculation();
};
