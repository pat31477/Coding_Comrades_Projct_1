let LetsGoButton = document.getElementById('letsGoBtn');
let restaurantText = document.getElementById('restaurant-text');
let restaurantTitle = document.getElementById('restaurant-title1');
let restaurantTitle2 = document.getElementById('restaurant-title2');
let restaurantTitle3 = document.getElementById('restaurant-title3');
let restaurantAddress1 = document.getElementById('restaurant-address1');
let restaurantAddress2 = document.getElementById('restaurant-address2');
let restaurantAddress3 = document.getElementById('restaurant-address3');
let restaurantPhone1 = document.getElementById('restaurant-phone1');
let restaurantPhone2 = document.getElementById('restaurant-phone2');
let restaurantPhone3 = document.getElementById('restaurant-phone3');
let foodChoice = document.querySelector('#foodChoice')
let formGroup = document.querySelector('.userInput');
let userInput = document.querySelector('#zipCodeInput');


let restaurantFormSubmitHandler = function (event) {

    event.preventDefault();

    console.log(event.target)
    let foodChoiceValue = foodChoice.value

    let zipCode = userInput.value

    if (zipCode) {
        getDocUApi(zipCode, foodChoiceValue);
    };
};


let getDocUApi = function (zipCode, foodChoiceValue) {

    // positioning of the parameter in my url is messing this up?
    let docUApi = `https://api.documenu.com/v2/restaurants/zip_code/${zipCode}?size=20&key=a414d27ec8621fd597b54e3526b1c8a1`;
    // let docUApi2 = `https://api.documenu.com/v2/restaurant/4072702673999819?key=a76c50a39fbd01d6e7e04e48e6c00d79`

    fetch(docUApi)
        .then(function (response) {
            if (response.ok) {
                console.log(response)
                response.json().then(function (data) {
                    console.log(data.data)
                    let cuisinesData = data.data.filter( function(restaurant) {
                        return restaurant.cuisines[0] === foodChoiceValue
                    })
                    console.log(cuisinesData)
                    displayData(cuisinesData, zipCode)
                })
            } else {
                alert('Error: ' + response.statusText)
            }
        })
        .catch(function (error) {
            alert('Unable to connect to docUApi');
        });
};


let displayData = function (data) {

    restaurantTitle.textContent = data[0].restaurant_name
    restaurantTitle2.textContent = data[1].restaurant_name
    restaurantTitle3.textContent = data[2].restaurant_name

    restaurantAddress1.textContent = data[0].address.formatted
    restaurantPhone1.textContent = data[0].restaurant_phone

    restaurantAddress2.textContent = data[1].address.formatted
    restaurantPhone2.textContent = data[1].restaurant_phone

    restaurantAddress3.textContent = data[2].address.formatted
    restaurantPhone3.textContent = data[2].restaurant_phone
};


formGroup.addEventListener('submit', restaurantFormSubmitHandler);


// add zipcode and food menu as a passing argument.
// append the date to the html.
// check other indexes, create a for loop.