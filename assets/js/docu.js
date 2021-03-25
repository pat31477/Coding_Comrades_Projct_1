// add zipcode and food menu as a passing argument.
// append the date to the html.

let LetsGoButton = document.getElementById('letsGoBtn');
let restaurantText = document.getElementById('restaurant-text');
let restaurantTitle = document.getElementById('restaurant-title');
let formGroup = document.querySelectorAll('.form-control');
let userInput = document.getElementById('user-search');

console.log(formGroup);

let restaurantFormSubmitHandler = function (event) {

    event.preventDefault();

    console.log(event.target)

    let zipcode = userInput.value.trim();

    if (zipcode) {
        getDocUApi(zipcode);

        restaurantTitle.textContent = '';
        formGroup.value = '';

    };
};


let getDocUApi = function (zipcode) {

    let docUApi = `https://api.documenu.com/v2/restaurants/search/fields?key=a76c50a39fbd01d6e7e04e48e6c00d79&zip_code=${zipcode}&exact=true`;

    fetch(docUApi)
        .then(function (response) {
            if (response.ok) {
                console.log(response)
                response.json().then(function (data) {
                    console.log(data)
                    displayData(data, userSearchEl)
                })
            } else {
                alert('Error: ' + response.statusText)
            }
        })
        .catch(function (error) {
            alert('Unable to connect to docUApi');
        });
};


let displayData = function (data, userSearchEl) {

    // for (let i = 0; i < data.length; i++) {
    //     const element = data[i].restaurant_name;
    //     console.log(element);
    // }

    let storedEvent = data.restaurant_name
    console.log(storedEvent)
};


formGroup.addEventListener('submit', restaurantFormSubmitHandler);