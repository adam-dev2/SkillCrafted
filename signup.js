function signup()
{
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    console.log(username);
    console.log(password)
    fetch("http://localhost:8080/user/signup",{
        method : "POST",
        body : JSON.stringify({
            username : username,
            password: password
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((resp) => {
        resp.json().then(
            (data) => {
                console.log(data);
            }
        )
    })
}