let LetsGoButton = document.getElementById('letsGoBtn');
let restaurantId = document.getElementById('restaurant-id');
let restaurantText = document.getElementById('restaurant-text');
let restaurantTitle = document.getElementById('restaurant-title');
let eventSearchFormEl = document.getElementById('event-search-form');
let userInput = document.getElementById('user-search');
// let userInputValue = userInput.value()

let formSubmitHandler = function (event) {

    event.preventDefault();

    console.log(event.target)

    let zipcode = userInput.value.trim();

    if (zipcode) {
        getDocUApi(zipcode);

        // cityName.textContent = '';
        // cityInput.value = '';

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
                    // input function here
                })
            } else {
                alert('Error: ' + response.statusText)
            }
        })
        .catch(function (error) {
            alert('Unable to connect to docUApi');
        });
};

getDocUApi('07024')

