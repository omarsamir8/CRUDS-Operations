let title = document.getElementById("titel");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let catagory = document.getElementById("catagory");
let submit = document.getElementById("submit");
let search = document.getElementById("search");
let searchTitle = document.getElementById("searchTitle");
let searchCategory = document.getElementById("searchCategory");

let mood = "create";
let tmp;
// get total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "green";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "red";
  }
}

// create product && save localstorage
let dataPro;

if (localStorage.product) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    catagory: catagory.value,
  };
  if (mood === "create") {
    if (newPro.count > 1) {
      for (let i = 0; i < newPro.count; i++) {
        dataPro.push(newPro);
      }
    } else {
      dataPro.push(newPro);
    }
  } else {
    dataPro[tmp] = newPro;
    mood = "create";
    submit.innerHTML = "create";
    count.style.display = "block";
  }

  // savedata in localstorage

  localStorage.setItem("product", JSON.stringify(dataPro));
  console.log(dataPro);

  showData();
  clearData();
};

// clear inputs
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  catagory.value = "";
}

// read
function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `
    <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].catagory}</td>
            <td><button onclick="udpateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
          </tr>
    `;
  }

  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deleteAll");
  btnDelete.style.margin = "5px";

  if (dataPro.length > 0) {
    btnDelete.innerHTML = `
    <button onclick="deleteAll()">Delete All(${dataPro.length})</button>
    `;
  } else {
    btnDelete.innerHTML = "";
  }
}
showData();

// delete
function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}

// deleteAll
function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}

// update
function udpateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  getTotal();
  submit.innerHTML = "Update";
  count.style.display = "none";
  catagory.value = dataPro[i].catagory;
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
// search
let searchMood = "title";
function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMood = "title";
    search.placeholder = "Search By Title";
  } else {
    console.log(searchMood);
    searchMood = "catagory";
    search.placeholder = "Search By Category";
  }
  search.focus();
}

function searchData(value) {
  console.log(searchMood);
  let table = "";
  if (searchMood === "title") {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].title.includes(value)) {
        table += `
        <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].catagory}</td>
                <td><button onclick="udpateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
              </tr>
        `;
      }
    }
  } else {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].catagory.includes(value)) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].catagory}</td>
        <td><button onclick="udpateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
      </tr>
        `;
      }
      console.log(searchMood);
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
// clean data
