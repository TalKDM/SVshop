let div = document.getElementById("div");

const arrayFun = () => {
    fetch("/allOrders", {
        method: "get",
        headers: {"Content-Type":"application/json"},
    })
    .then(res => res.json())
    .then(data => {
        return div.innerHTML = data.map((data) => {
            let {name, product} = data;
            let id = [];
            let item = [];
            for(let i = 0; i < product.length; i++) {
                id.push(product[i].id)
                item.push(product[i].item)
            }
            return `
            <div class="name">
            <h1>Name:${name}</h1>
            </div>
            <div class="items">
            <h1>Items ID:${id}</h1>
            </div>
            <div class="quan">
            <h1>Quantity:${item}</h1>
            </div>
            `
        })
        .join("")
    }
    )
}


arrayFun()




