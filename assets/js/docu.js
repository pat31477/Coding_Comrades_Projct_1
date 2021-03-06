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
let foodContainer = document.querySelector('#food-container')
let foodChoice = document.querySelector('#foodChoice')
let formGroup = document.querySelector('.userInput');
let userInput = document.querySelector('#zipCodeInput');
let submitBtn = document.querySelector('#submit-btn')
let previousSearchEl = $('#previous-search-el');
let foodChoiceValue;
let zipCode;
// export default zipCode;

let restaurantFormSubmitHandler = function (event) {

    event.preventDefault();

    console.log(event.target)

    foodChoiceValue = foodChoice.value

    zipCode = userInput.value

    if (zipCode) {
        getDocUApi(zipCode, foodChoiceValue);
        let button1 = $('<button>');
        button1.attr('class', 'btn btn-block')
        button1.attr('zipcode', zipCode)
        button1.css({
            'background-color': '#d9e9e8',
            color: '#1a1a1a',
            padding: "5px",
            width: "100%",
            display: 'block',
            fontSize: '20px'
        });
        button1.text(zipCode);
        previousSearchEl.append(button1);
        button1.on('click', function (event) {
            zipCode = $(this).attr("zipcode")
            event.stopPropagation();
            event.preventDefault()
            // let eventButton = $(this).val();
            getDocUApi(zipCode, foodChoiceValue);
        })
    }
};



let getDocUApi = function (zipCode, foodChoiceValue) {

    // positioning of the parameter in my url is messing this up?
    let docUApi = `https://api.documenu.com/v2/restaurants/zip_code/${zipCode}?size=20&key=c4e036bae88e13a2e20916c5c2a5b12d`;

    fetch(docUApi)
        .then(function (response) {
            if (response.ok) {
                console.log(response)
                response.json().then(function (data) {
                    console.log(data)
                    let cuisinesData = data.data.filter(function (restaurant) {
                        for (let i = 0; i < restaurant.cuisines.length; i++) {
                            return restaurant.cuisines[i] === foodChoiceValue
                        }
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


let displayData = function (cuisinesData) {

    let uniqueRestaurants = Array.from(new Set(cuisinesData.map(a => a.restaurant_name)))
        .map(restaurant_name => {
            return cuisinesData.find(a => a.restaurant_name === restaurant_name)
        })

    foodChoiceValue = foodChoice.value
    zipCode = userInput.value

    if (foodChoiceValue || zipCode) {
        $('#food-container').empty();
    }

    for (let i = 0; i < uniqueRestaurants.length && i < 3; i++) {
        let h4 = document.createElement('h4');
        let p = document.createElement('p');
        let p2 = document.createElement('p');
        let h5 = document.createElement('h5');
        let directRestaurant = uniqueRestaurants[i].restaurant_website;
        let restaurantDiv = document.createElement('a')
        restaurantDiv.className += 'list-group-item'
        restaurantDiv.style.margin = '3rem';
        h4.textContent = uniqueRestaurants[i].restaurant_name
        h4.setAttribute("style", "color: red;");
        p.textContent = uniqueRestaurants[i].address.formatted
        p.setAttribute("style", "font-weight: bold");
        p2.textContent = uniqueRestaurants[i].restaurant_phone
        p2.setAttribute("style", "font-weight: bold");
        restaurantDiv.setAttribute("href", directRestaurant)
        restaurantDiv.setAttribute('target', '_blank')
        restaurantDiv.appendChild(h4)
        restaurantDiv.appendChild(p)
        restaurantDiv.appendChild(p2)
        foodContainer.appendChild(restaurantDiv)

        if (directRestaurant === "") {
            h5.textContent = "NO WEBSITE!"
            h5.setAttribute("style", "color: orange;");
            restaurantDiv.appendChild(h5)
            foodContainer.appendChild(restaurantDiv)
        }
    }
};


submitBtn.addEventListener('click', restaurantFormSubmitHandler);


// merge zipcode search box.

// link module 

// fix local storage buttons. ?

// make a function where it alerts the user if results show up

// make conditional.

// everytime the user searches a new zipcode, refresh the page.