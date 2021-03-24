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

/*let checkedEl = $('input:radio');
$('input[type="text"]').val(' ');
$('input[type="radio"]').prop('radio', false);*/


  if (userSearchEl) {
  getEvents(userSearchEl);
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
  console.log(userSearchEl);
  console.log(data.events);
//variable set to the events object inside the data
let events = data.events;
//slicing first 3 events
let mostRecentEvents = events.filter(event => event.info);
console.log(mostRecentEvents);
//mostRecentEvents.length;

console.log(mostRecentEvents)

/*for (var i = 0; i < mostRecentEvents.length; i++) {
  //getting event name and creating an element
  //let newEventTitle = document.createElement('h3');
  //setting textContent
  eventTitle.textContent = mostRecentEvents[i].name;
  console.log(eventTitle);
  //getting event date and creating element to store
  let newEventDate = document.createElement('h6');
  //setting date textContent
  newEventDate.textContent = mostRecentEvents[i].dates.start.localDate;
  console.log(newEventDate);

  let newEventTime = document.createElement('h6');
  newEventTime.textContent = mostRecentEvents[i].dates.start.localTime;
  console.log(newEventTime);

  let newEventInfo = document.createElement('h6');
  newEventInfo.textContent = mostRecentEvents[i].info;
  console.log(newEventInfo);

  let newEventSalesInfo = document.createElement('h6');
  newEventSalesInfo.textContent = "Sales end on: " +  mostRecentEvents[i].sales.public.endDateTime;
  console.log(newEventSalesInfo);



  if (mostRecentEvents[i].priceRanges) {
      console.log(mostRecentEvents[i].priceRanges[0].min);
      console.log(mostRecentEvents[i].priceRanges[0].max);
      if (mostRecentEvents[i].priceRanges[0].min && mostRecentEvents[i].priceRanges[0].max < 25) {
        console.log("$");
      } else if (mostRecentEvents[i].priceRanges[0].min && mostRecentEvents[i].priceRanges[0].max > 25 && mostRecentEvents[i].priceRanges[0].min && mostRecentEvents[i].priceRanges[0].max < 50) {
        console.log("$$")
      } else if (mostRecentEvents[i].priceRanges[0].min && mostRecentEvents[i].priceRanges[0].max > 50) {
        console.log("$$$");
      }
      //newEventPrice.textContent = mostRecentEvents[i].priceRanges[0].min
  } else {
      console.log("no price information for this event");
  }
  
}*/


/*mostRecentEvents.filter(event => {
  let searchedEvent = event;
  console.log(searchedEvent);
  //console.log(searchedEvent.images[0]);
  let searchEventImg = searchedEvent.images[0].url;
  console.log(searchedEvent.priceRanges[0].min);
 console.log(event.type)
console.log(searchedEvent);


//let eventDiv = $("<p>");
//eventDiv.append($(".card-body"));
//eventDiv.html(searchedEvent.dates.start.localDate);

  $('#event-id').attr("src", searchEventImg);
  $('#event-title').html(searchedEvent.name)
  $('#event-text').html(searchedEvent.info);
 

  ;

})*/
mostRecentEvents.forEach((events,index) => {
  console.log(events.dates.start.localDate)

  let eventImg = $('<img>');
  
  let eventUrl = events.images[1].url;
  
  eventImg.attr("style", "width:8em;", "ml-5");
  eventImg.attr("src", eventUrl);
  $('#event1').attr('ml-5');
  $(`#event${index+1}`).html(events.name + `\n` + events.info + events.dates.start.localDate).addClass("list-group-item", "ml-5");
  //$(`#event${index+1}`).append(eventImg);
  //$(`#eventTitle${index+1}`).html(events.info);
  //eventTitle.html(events.name);
  eventText.html(events.info)

})
/*mostRecentEvents.forEach((events,index) => {
  $(`#event1Text${index+1}`).html(events.info);
})*/






}


let clearHistoryButton = $('<button>');
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
//working on event listener on first page html
//letsGoBtn.on("click", formSubmitHandler);

eventSearchForm.on("submit", formSubmitHandler);

});