
const url = "https://jsonplaceholder.typicode.com/users"
let information = [];
document.addEventListener("DOMContentLoaded", async () => {
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error("Cards can't be loaded");
        }

       information = await response.json();
       renderUsers(information);

    }catch(error){
       htmlError=  document.getElementById("error-container").style.display = "block";
    }
        

})

function renderUsers(users) {
    const grid = document.querySelector(".grid");
    grid.innerHTML = "";
    const showInfo = users.map(user => Container(user));
    grid.append(...showInfo);
}

function Container(user){
    const container = document.createElement('div');
    const userName = user.name.toUpperCase();
    const splitted = userName.split(" ");

    const html = `
        <div class="card">
          <div class="card-header">
            <div class="card-avatar">${splitted[0][0]}${splitted[1][1]}</div>
          </div>
          <div class="card-body">
            <h3 class="card-title">${user.name}</h3>
            <p class="card-username">${user.username}</p>

            <div class="card-details">
              <p class="card-details-title">ADDRESS</p>
              <p class="card-address">
                ${user.address.street}, ${user.address.suite}<br />
                ${user.address.city}
              </p>
            </div>

            <div class="card-details">
              <p class="card-details-title">Company</p>
              <p class="card-company">${user.company.name}</p>
            </div>
          </div>
        </div>
    `
    container.innerHTML = html;
    return container;
}

document.querySelector(".search-input").addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase();

    const filtered = information.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query)
    );

    renderUsers(filtered); 
});