const baseUr = "https://questioner1.herokuapp.com/api/v1";
const baseUrl = `http://localhost:3000/api/v1`;

function get(url) {
  return new Request(url, {
    method: "GET",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  });
}

function post(url, data) {
  return new Request(url, {
    method: "POST",
    body: data,
    headers: {
      Accept: "application/json, text/plain, */*"
    }
  });
}
const myform = () => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const category = document.getElementById("category").value;
  const image = document.getElementById("image").files[0];
  const color = document.getElementById("color").value;

  const url = `${baseUrl}/products`;
  const data = new FormData();
  data.append("image", image);
  data.append("name", name);
  data.append("description", description);
  data.append("price", price);
  data.append("category", category);
  data.append("color", color);
  let request = post(url, data);
  async function postProduct(payLoad) {
    try {
      let response = await fetch(payLoad);
      let data = await response.json();
      if(response.ok){
        document.getElementById('product').classList.toggle('flex');
        document.getElementById('product').innerHTML = `
        <div id="image-product">
          <img src=${data.data[0].image} alt="">
        </div>
        <div id="details-product">
          <h3>${data.data[0].name}</h3>
          <p>${data.data[0].category}</p>
          <h4>Description</h4>
          <p>${data.data[0].description}</p>
          <h5>Select Size</h5>
          <div id="color-pick" style="background-color:${data.data[0].color}; width:20px; height:20px;" width></div>
          <h1>${data.data[0].price}</h1>
        </div>
        `;
      }
      return response.status;
    } catch (err) {
      alert('Server Error Try Again');
      throw err;
    }
  }
  postProduct(request);
};

// Validation
const file = document.getElementById("image");
file.onchange = function() {
  if (this.files[0].size > 1000000) {
    alert("File is too big! Max of 1mb");
    this.value = "";
  }
};
