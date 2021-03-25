//FIX: remove Jquery
let letsGoBtn = $("#letsGoBtn");
//let nextHtmlPage = 'Page2.html';
let eventId = $("#event-id");
let eventText = $("#event-text");
let eventTitle = $("#event-title");
let eventSearchForm = $("#event-search-form");
let userInputEl = $('input[name="search-input"]');
let userSearchEl = userInputEl.val();
let previousSearchEl = $('#previous-search-el');




$(document).ready(function(){
  $("#myBtn").click(function(){
    $("#myModal").modal();
  });

const savedSearches = (userSearchEl) => {
  let button1 = $('<button>');
  button1.text(userSearchEl);
  //previousSearchEl.addClass('list-group');
  previousSearchEl.append(button1);;
  button1.on('click', function (event) {
    let eventButton = $(this).text();

    getEvents(eventButton);
    event.preventDefault();
    event.stopPropagation();
  })

}

let storedEvent = localStorage.getItem("events");
storedEvent = JSON.parse(storedEvent) || [];
for (var i = 0; i < storedEvent.length; i++) {
  savedSearches(storedEvent[i]);
}






const formSubmitHandler = (event) => {
event.preventDefault();

let userSearchEl = userInputEl.val().trim();
//let postalCode = userInputEl.val().trim()

/*let checkedEl = $('input:radio');
$('input[type="text"]').val(' ');
$('input[type="radio"]').prop('radio', false);*/


  if (userSearchEl) {
  getEvents(userSearchEl);
  userInputEl.val("");
  //getDocApi(userSearchEl);
} else {
  $('#submit-btn').disabled = true;

}
savedSearches(userSearchEl);
let storedEvent = localStorage.getItem("events");
storedEvent = JSON.parse(storedEvent) || [];

storedEvent.push(userSearchEl);
let stringifiedEvents = JSON.stringify(storedEvent);
localStorage.setItem("events", stringifiedEvents);

}



const getEvents = (userSearchEl) => {
  let apiKey = "sHs8K7xQHlo3RLonwkGtJsj8wixf5F5J";
  let apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?&sort=date,asc&locale'en-us,*'&keyword=${userSearchEl}&stateCode""&countryCode=US&startDateTime"03/2021"&endDateTime"05/21/2021"&apikey=${apiKey}`;
  //let apiUrl = `https://app.ticketmaster.com/v2/events.json?&sort=date,name,asc&apikey=${apiKey}`;
  //let apiUrl = `https://app.ticketmaster.com/discovery/v2/events?&sort=date,asc&locale'en-us,*'&postalCode""&keyword=${userSearchEl}&stateCode""&countryCode=US&startDateTime"03/2021"&endDateTime"05/21/2021"&apikey=${apiKey}`;
//console.log(input);  

fetch(apiUrl)
.then(response => response.json())
.then(data => {
  console.log(data);
  console.log(data._embedded);
 displayEvents(data._embedded, userSearchEl);

})

}


//displaying data from the fetch request of Ticketmaster's api
const displayEvents = (data, userSearchEl) => {
  $("#submit-btn").disabled = false;
  //console.log(userSearchEl);
  //console.log(data.events);
//variable set to the events object inside the data


let newEvents = data.events;
//let newEvents = events.filter(event => event.info)
console.log(newEvents);

let eventItems = $('#events .list-group-item');

eventItem = eventItems.first();
console.log(eventItem);


newEvents.forEach((events, index) => {
  
    
  $(`#list-text${index+1}`).text(events.name)
  
  let eventImg = $('<img>');
  let eventImageUrl = events.images[1].url;
  
  eventImg.attr("style", "width:8em;", "ml-5");
  eventImg.attr("src", eventImageUrl);
  $(`#eventText${index+1}`).append(eventImg)
  
  

  $(`#venue${index+1}`)
  .text("Event Date: " + events.dates.start.localDate + `\n`
   + " " + "Event Time: " + events.dates.start.localTime)
   .attr("style", "font-weight:bold;")
   ;
  //$('.list-group-item-text').text(eventItem)


let bookingUrl = events.url
$(`#btn-link${index+1}`).attr("href", bookingUrl)


})






}


let clearHistoryButton = $('<button>');
//clearHistoryButton.addClass("fancy");
//clearHistoryButton.attr("class", "p-5", "color: green; v");

//clearHistoryButton.css("style", "font-weight: 25px", "background-color: green;")
clearHistoryButton.text("Clear History");
previousSearchEl.append(clearHistoryButton);

const removeItem = (event) => {
  localStorage.clear();
  $(event.target).siblings().remove();
  location.reload();
  //console.log(event.children());
}


clearHistoryButton.on("click", removeItem);




//added letsGoBtn "id" to html and my a variable for this. added an event listener that will redirect to
//page2 html
 letsGoBtn.on("click", function (event) {
  event.preventDefault();
  
   window.location.href = "Page2.html";
 
})
letsGoBtn.on("click", formSubmitHandler);

eventSearchForm.on("submit", formSubmitHandler);

});