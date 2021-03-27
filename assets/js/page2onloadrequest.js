$(function() {

    var queryParams = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    var foodInput;
    var zipInput;
    var foodValue = $('#foodChoice');
    var zipZip = $('#zipCodeInput');

    if (queryParams) {
        foodInput = queryParams[0].slice(queryParams[0].indexOf('=') + 1);
        zipInput = queryParams[1].slice(queryParams[1].indexOf('=') + 1);
        foodValue.val(foodInput);
        zipZip.val(zipInput);
        //postalcode.val(zipInput);

        var fakeEvent = {
            preventDefault: function() {

            }
        }
        restaurantFormSubmitHandler(fakeEvent);
        formSubmitHandler(fakeEvent);
    } 




})