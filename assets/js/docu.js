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
let formGroup = document.querySelector('.userInput');
let userInput = document.querySelector('#zipCodeInput');


let restaurantFormSubmitHandler = function (event) {

    event.preventDefault();

    console.log(event.target)

    let userSearch = userInput.value

    if (userSearch) {
        getDocUApi(userSearch);
    };
};


let getDocUApi = function (userSearch) {

    let docUApi = `https://api.documenu.com/v2/restaurants/zip_code/${userSearch}?size=20&key=a76c50a39fbd01d6e7e04e48e6c00d79`;

    fetch(docUApi)
        .then(function (response) {
            if (response.ok) {
                console.log(response)
                response.json().then(function (data) {
                    console.log(data.data)
                    displayData(data, userSearch)
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

    restaurantTitle.textContent = data.data[0].restaurant_name
    restaurantTitle2.textContent = data.data[1].restaurant_name
    restaurantTitle3.textContent = data.data[2].restaurant_name
    
    restaurantAddress1.textContent = data.data[0].address.formatted
    restaurantPhone1.textContent = data.data[0].restaurant_phone

    restaurantAddress2.textContent = data.data[1].address.formatted
    restaurantPhone2.textContent = data.data[1].restaurant_phone

    restaurantAddress3.textContent = data.data[2].address.formatted
    restaurantPhone3.textContent = data.data[2].restaurant_phone
};


formGroup.addEventListener('submit', restaurantFormSubmitHandler);