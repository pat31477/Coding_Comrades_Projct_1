//FIX: remove Jquery
// let letsGoBtn = $("#letsGoBtn");
let nextHtmlPage = 'Page2.html';



// $(document).ready(function () {
//   $("#enterBtn").click(function () {
//     $("#myModal").modal();
//   });
// });

// const formSubmitHandler = (events) => {
//   if (events) getDocApi(events);
//   //getApi(events);
// };

// var myHeaders = new Headers();
// myHeaders.append(
//   "Authorization",
//   "Bearer 9zvfPtRi9NUOq6elkyH7gEYOnBkV3DmqQq98JwqD-K09lObLJ_8OL2l_YxkcnZWKnPM5uHjTp_CudeelwDrfvlSOcDmWRRsPf2xfMdP9UwqPzJCDVQdPsQJc5_JRYHYx"
// );
// myHeaders.append("Access-Control-Allow-Origin", "*");
// myHeaders.append("Accept", "application/json");
// myHeaders.append(
//   "Cookie",
//   "wdi=1|6F3E803B30CC8CEA|0x1.81635de893cf7p+30|721e0bfdadfa6069"
// );
// var requestOptions = {
//   method: "GET",
//   headers: myHeaders,
//   redirect: "follow",
// };
// fetch(
//     "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=Brooklyn",
//     requestOptions
//   )
//   .then((response) => response.json())
//   .then((result) => console.log(result))
//   .catch((error) => console.log("error", error));

const getDocApi = () => {
  let apiUrl = `https://api.documenu.com/v2/restaurant/4072702673999819?key=a414d27ec8621fd597b54e3526b1c8a1&zip_code&restaurant_website`;

  fetch(apiUrl)
    .then((response) => response.json())

    .then((data) => {
      console.log(data);
      console.log(data._embedded);
    });
};


//added letsGoBtn "id" to html and my a variable for this. added an event listener that will redirect to
//page2 html
letsGoBtn.on("click", function (event) {
  event.preventDefault();

  window.location.href = "Page2.html";

})

// eventSearchForm.on("submit", formSubmitHandler);

// formSubmitHandler()