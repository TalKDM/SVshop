basket = JSON.parse(localStorage.getItem("data")) || [];
let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");
let shopCartItem = document.getElementById("shopCartItem")
let currentUserName = localStorage.getItem("currentUser");

    calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x + y, 0);

}

calculation()


let generateCartItem = () => {
    if(basket.length == 0) {
        shoppingCart.innerHTML = ``
        label.innerHTML = `
        <h2>Cart is Empty!</h2>
        <a href="products.html">
        <button class="HomeBtn">Back to home</button>
        </a>
        `;
    }else {
        fetch("/productsList",{
            method: "get",
            headers: {"Content-Type":"application/json"},
        })
        .then(res=>res.json())
        .then(data=>{
            return (shoppingCart.innerHTML = basket.map((x) =>{
                let {id, item} = x;
                let search = data.find((y) => y.id === id) || []
                return `
                <div class="cart-item">
                <img  width="100" src=${search.img} alt="" />
                <div class=""details>
                <div class="title-price-x">
                    <h4 class="title-price">
                        <p>${search.name}</p>
                        <p class="cart-item-price">₪${search.price}</p>
                    </h4>
                    <i onclick="removeItem(${id})" class="fa-solid fa-xmark"></i>
                </div>

                <div class="buttons">
                    <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
                    <div id=${id} class="quantity">${item}</div>
                    <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
                </div>
                <h3>₪${item * search.price}</h3>
                </div>
                </div>
                `
            })
            .join(""))
        })
    }}

    generateCartItem()


    const increment = (id) => {
        let selectedItem = id;
        let search = basket.find((x) => x.id === selectedItem.id);
        if(search === undefined) {
            basket.push({
                id: selectedItem.id,
                item: 1,
            });
        } else {
            search.item += 1;
        }
        generateCartItem();
        updateCart(selectedItem.id);
        localStorage.setItem("data", JSON.stringify(basket));

    }

    const decrement = (id) => {
        let selectedItem = id;
        let search = basket.find((x) => x.id === selectedItem.id);


        if(search === undefined) return;
        else if(search.item === 0) return;
        else {
            search.item -= 1;
        };
        updateCart(selectedItem.id);
        basket = basket.filter((x) => x.item !== 0);
        generateCartItem();
        localStorage.setItem("data", JSON.stringify(basket));
    }

    const updateCart = (id) => {
        let search = basket.find((x) => x.id === id)
        document.getElementById(id).innerHTML = search.item;
        calculation();
        totalAmount();
    };

    let removeItem = (id) => {
        let selectedItem = id;
        basket = basket.filter((x) => x.id !== selectedItem.id);
        generateCartItem()
        totalAmount();
        calculation();
        localStorage.setItem("data", JSON.stringify(basket));
    }

    let clearCart = (id) => {
        basket = [];
        generateCartItem();
        calculation();
        localStorage.setItem("data", JSON.stringify(basket));
    }

    let totalAmount = () => {
        fetch("/productsList",{
            method: "get",
            headers: {"Content-Type":"application/json"},
        })
        .then(res=>res.json())
        .then(data=>{
        if(basket.length !== 0) {
            let amount = basket.map((x) => {
                let {item, id} = x;
                let search = data.find((y) => y.id === id) || [];
                return item * search.price;
            }).reduce((x,y) => x + y, 0);
            label.innerHTML = `
            <h2>Total Bill : ₪ ${amount}</h2>
            <button onclick="checkOutOrder()" id="checkout"><a href="./checkout.html">Checkout</a></button>
            <button onclick="clearCart()" id="removeAll">Clear Cart</button>
            `;
        } else return;
        })
    }

    totalAmount();

    const checkOutOrder = () => {
        let checkOutBtn = document.getElementById("checkout");
        fetch("/userOrderList", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                currentUserName,
                basket
            })
        }).then(res => res.json())
        .then(data => {
            if(data.message == "ok") {
                alert(`you are redirected to the payment page`)
                location.href = "/checkout";
            }else if (data.message == "error")
                alert(`${currentUserName}error - please try again`)
            }
        )}



