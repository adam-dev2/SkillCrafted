view()
function viewdata(data)
{
    var parent = document.getElementById("course-list").value;
    for(var i=0;i<data.length;i++)
    {
        var child1 = document.createElement("div");
        // child1.classList("course-card");
        var img = document.createElement("img");
        img.src = "#";
        var name = document.createElement("h1");
        name.innerText = data[i].teacher;
        var h3 = document.createElement("h3");
        h3.innerText = data[i].title;
        var desc = document.createElement("p");
        parent.innerText = data[i].description;
        var price = document.createElement("p");
        parent.innerText = data[i].price;

        child1.appendChild(img)
        child1.appendChild(name)
        child1.appendChild(h3)
        child1.appendChild(desc)
        child1.appendChild(price)
        
        parent.appendChild(child1);
    }
}
function view()
{
    fetch("http://localhost:8080/courses",{
        method : "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((resp) => {
        resp.json().then(viewdata)
    })
}