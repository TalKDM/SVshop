
const sendData = () => {
    const nameInput = document.getElementById("nameInput").value;
    const mailInput = document.getElementById("mailInput").value;
    const passInput = document.getElementById("passInput").value;
    if (!nameInput || !mailInput || !passInput) {
        let errDiv = document.getElementById("error");
        errDiv.innerHTML = "All fields must be filled!"
    }else {
        fetch("/signup",{
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nameInput,
                mailInput,
                passInput
            })
        }).then(res => res.json())
        .then(data => {
            if(data.message == "error") {
                alert(`${mailInput} is already taken!,choose another email address!`);
                location.href = "/";
            }else 
            alert(`${nameInput} has register to Sv-Shop`)
            location.href = "/";
        })
    }
}

