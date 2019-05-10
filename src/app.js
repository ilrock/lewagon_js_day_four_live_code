// TODO: Build an awesome garage!
const GARAGE = "leswagons";

// Get form data
const brand = document.getElementById('brand');
const model = document.getElementById('model');
const plate = document.getElementById('plate');
const owner = document.getElementById('owner');
const carsList = document.querySelector('.cars-list');
const form = document.getElementById('new-car');

// Get cars from server
const addToDom = (data) => {
  carsList.innerHTML = '';
  data.forEach((element) => {
    carsList.insertAdjacentHTML('beforeend', `<div class="car">
            <div class="car-image">
              <img src="http://loremflickr.com/280/280/Ferrari 308 GTS" />
            </div>
            <div class="car-info">
              <h4>${element.brand} ${element.model}</h4>
              <p><strong>Owner:</strong> ${element.owner}</p>
              <p><strong>Plate:</strong> ${element.plate}</p>
            </div>
          </div>`);
  });
};

const getCars = () => {
  fetch(`https://wagon-garage-api.herokuapp.com/${GARAGE}/cars`)
    .then(response => response.json())
    .then((data) => {
      addToDom(data);
    });
};

getCars();

// Build the POST request
const pushCar = (event) => {
  event.preventDefault();
  fetch(`https://wagon-garage-api.herokuapp.com/${GARAGE}/cars`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      brand: brand.value,
      model: model.value,
      owner: owner.value,
      plate: plate.value
    })
  })
    .then(response => response.json())
    .then(() => getCars());
};

// Add the cars to the website
form.addEventListener('submit', pushCar);
