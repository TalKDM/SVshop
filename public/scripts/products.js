
let shop = document.getElementById("shop");
let userNameGreeting = document.getElementById("greetingH3");
let basket = JSON.parse(localStorage.getItem("data")) || [];

let userNameGreet = () => {
    let myDate = new Date();
    let hrs = myDate.getHours();

    let greet;

    if (hrs < 12)
        greet = 'Good Morning';
    else if (hrs >= 12 && hrs <= 17)
        greet = 'Good Afternoon';
    else if (hrs >= 17 && hrs <= 24)
        greet = 'Good Evening';
    userNameGreeting.innerHTML = `Welcome  ${localStorage["currentUser"]},${greet}!`
};



userNameGreet()
        let prodList = () => {
            fetch("/productsList",{
                method: "get",
                headers: {"Content-Type":"application/json"},
            })
            .then(res => res.json())
            .then(data => {
                return (shop.innerHTML = data
                    .map((data) => {
                        let {id, name, price, img} = data;
                        let search = basket.find((x) => x.id === id) || [];
                    return `
                    <div id=product-id-${id} class="item">
                    <img width="220" height="300" src=${img} alt="">
                    <div class="details">
                        <h3>${name}</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                        <div class="price-qun">
                            <h2>₪${price}</h2>
                            <div class="buttons">
                                <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
                                <div id=${id} class="quantity">${search.item == undefined ? 0 : search.item}</div>
                                <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
                            </div>
                        </div>
                    </div>
                </div>
                    `
                })
                .join(""))
            })
        } 

        prodList()

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
            updateCart(selectedItem.id);
            localStorage.setItem("data", JSON.stringify(basket))
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
            localStorage.setItem("data", JSON.stringify(basket));
        }

        const updateCart = (id) => {
            let search = basket.find((x) => x.id === id)
            document.getElementById(id).innerHTML = search.item;
            calculation();
        };

        let calculation = () => {
            let cartIcon = document.getElementById("cartAmount");
            cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x + y, 0);
        
        }

        calculation()





        fetch("/productsList",{
            method: "get",
            headers: {"Content-Type":"application/json"},
        })
        .then(res => res.json())
        .then(data => {
            return (shop.innerHTML = data
                .map((data) => {
                    let {id, name, price, img} = data;
                return `
                <div id=product-id-${id} class="item">
                <img width="220" height="300" src=${img} alt="">
                <div class="details">
                    <h3>${name}</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                    <div class="price-qun">
                        <h2>₪${price}</h2>
                        <div class="buttons">
                            <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
                            <div id=${id} class="quantity">${search.item == undefined ? 0 : search.item}</div>
                            <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
                        </div>
                    </div>
                </div>
            </div>
                `
            })
            .join(""))
        })
    