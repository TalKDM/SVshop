
const signIn = () => {
    const mailInput = document.getElementById("mailInput").value;
    const passInput = document.getElementById("passInput").value;
    let errDiv = document.getElementById("error");
    if (!mailInput || !passInput) {
        let errDiv = document.getElementById("error");
        errDiv.innerHTML = "All fields must be filled!"
    }else {
        fetch("/sign-in",{
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                mailInput,
                passInput
            })
        }).then(res => res.json())
        .then(data => {
            if(data.message == "ok") {
                alert(`${data.result.name} Welcome to Sv-shop, you are now redirected to Sv-shop`)
                localStorage.setItem("currentUser", (data.result.name))
                location.href = "/products";
            }else if (data.message == "error") {
                alert(`${mailInput} is not register to Sv-shop database,please register!`);
                location.href = "/signup";
            }
                }
        )}}



//             if(data.message == "ok"){
//                 errDiv.innerHTML = `${mailInput} is not in Sv-shop database,please sign up!`
//             }else (data.message == "ok") {
//                 alert(`Welcome back ${data.result.name}`)
//                 localStorage.setItem("currentUser",data.result.name)
//                 location.href = "/products"
//             }
//         })
//     }
// })