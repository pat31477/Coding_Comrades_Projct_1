//FIX: remove Jquery
let letsGoBtn = document.querySelector("#letsGoBtn");
let nextHtmlPage = 'Page2.html';



$(document).ready(function(){
  $("#enterBtn").click(function(){
    $("#myModal").modal();
  });
});

const formSubmitHandler = (events) => {
  if (events) getDocApi(events);
  getApi(events);
};

var myHeaders = new Headers();
myHeaders.append(
  "Authorization",
  "Bearer 9zvfPtRi9NUOq6elkyH7gEYOnBkV3DmqQq98JwqD-K09lObLJ_8OL2l_YxkcnZWKnPM5uHjTp_CudeelwDrfvlSOcDmWRRsPf2xfMdP9UwqPzJCDVQdPsQJc5_JRYHYx"
);
myHeaders.append("Access-Control-Allow-Origin", "*");
myHeaders.append("Accept", "application/json");
myHeaders.append(
  "Cookie",
  "wdi=1|6F3E803B30CC8CEA|0x1.81635de893cf7p+30|721e0bfdadfa6069"
);
var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};
fetch(
  "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=Brooklyn",
  requestOptions
)
  .then((response) => response.json())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));

const getDocApi = () => {
  let apiUrl = `https://api.documenu.com/v2/restaurant/4072702673999819?key=a414d27ec8621fd597b54e3526b1c8a1&zip_code&restaurant_website`;

  fetch(apiUrl)
    .then((response) => response.json())

    .then((data) => {
      console.log(data);
      console.log(data._embedded);
    });
};

const getApi = () => {
  let apiKey = "sHs8K7xQHlo3RLonwkGtJsj8wixf5F5J";
  let apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?&sort=name,date,asc&locale'en-us,*'&postalCode&countryCode=US&startDateTime"03/21/2021"&apikey=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())

    .then((data) => {
      console.log(data);
      console.log(data._embedded);
      displayApi(data._embedded);
    });
};

//displaying data from the fetch request of Ticketmaster's api
const displayApi = (data) => {
  //variable set to the events object inside the data
  let events = data.events;
  //slicing first 3 events
  let mostRecentEvents = events.slice(0, 5);
  mostRecentEvents.length;

  console.log(mostRecentEvents);

  for (var i = 0; i < mostRecentEvents.length; i++) {
    //getting event name and creating an element
    let newEventTitle = document.createElement("h3");
    //setting textContent
    newEventTitle.textContent = mostRecentEvents[i].name;
    console.log(newEventTitle);
    //getting event date and creating element to store
    let newEventDate = document.createElement("h6");
    //setting date textContent
    newEventDate.textContent = mostRecentEvents[i].dates.start.localDate;
    console.log(newEventDate);

    let newEventTime = document.createElement("h6");
    newEventTime.textContent = mostRecentEvents[i].dates.start.localTime;
    console.log(newEventTime);

    let newEventInfo = document.createElement("h6");
    newEventInfo.textContent = mostRecentEvents[i].info;
    console.log(newEventInfo);

    let newEventSalesInfo = document.createElement("h6");
    newEventSalesInfo.textContent =
      "Sales end on: " + mostRecentEvents[i].sales.public.endDateTime;
    console.log(newEventSalesInfo);

    let newEventPrice = document.createElement("h5");
    //newEventPrice.textContent = mostRecentEvents[i].priceRanges[0].min;

    if (mostRecentEvents[i].priceRanges) {
      console.log(mostRecentEvents[i].priceRanges[0].min);
      console.log(mostRecentEvents[i].priceRanges[0].max);
      //newEventPrice.textContent = mostRecentEvents[i].priceRanges[0].min
    } else {
      console.log("no price information for this event");
    }

    if (mostRecentEvents[i].images) {
      let newEventImage = document.createElement("img");
      let newEventUrl = mostRecentEvents[i].images[1].url;
      newEventImage.setAttribute("src", newEventUrl);
      document.body.appendChild(newEventImage);
      console.log(mostRecentEvents[i].images[1].url);
    } else {
      console.log("there are no images to display for this event");
    }
  }
};

let displayResultsBtn = document.createElement("button");
displayResultsBtn.textContent = "Display Results";
displayResultsBtn.setAttribute("style", "padding:2px; margin:5px;");
document.body.appendChild(displayResultsBtn);

displayResultsBtn.addEventListener("click", formSubmitHandler);

let clearSearchBtn = document.createElement("button");
clearSearchBtn.textContent = "Clear Search";
clearSearchBtn.setAttribute("style", "padding:2px; margin:5px;");
document.body.appendChild(clearSearchBtn);

//clearSearchBtn.addEventListener("click",)

getApi();
getDocApi();

displayResultsBtn.addEventListener("click", formSubmitHandler);
// getApi();
// getDocApi()


displayResultsBtn.addEventListener("click", formSubmitHandler);

//added letsGoBtn "id" to html and my a variable for this. added an event listener that will redirect to
//page2 html
letsGoBtn.addEventListener("submit", function (event) {
  event.preventDefault();

  window.location.assign(nextHtmlPage);
 

  //window.location.replace(nextHtmlPage);
})
