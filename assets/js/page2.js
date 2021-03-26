//FIX: remove Jquery
let letsGoBtn = $("#letsGoBtn");
//let nextHtmlPage = 'Page2.html';
let eventId = $("#event-id");
let eventText = $("#event-text");
let eventTitle = $("#event-title");
let eventSearchForm = $(".userInput");
console.log(eventSearchForm)
let userInputEl = $('input[name="search-input"]');
console.log(userInputEl)
//let userSearchEl = userInputEl.val();
let postalcodeInputEl = $('input[name="postal-input"]');
let previousSearchEl = $('#previous-search-el');
let nextHtmlPage = 'Page2.html';
let enterBtn = $("#enterBtn");
let userSearchEl;
let events = [];

// import zipCode from './docu';

console.log(zipCode)



// $(document).ready(function () {

  $("#myBtn").click(function () {
    $("#myModal").modal();
  });


  $("#enterBtn").click(function () {
    $("#myModal").modal();
  });



  const savedSearches = (userSearchEl) => {
    console.log(userSearchEl)
    let button1 = $('<button>');
    button1.attr('class', 'btn btn-block')
    button1.css({'background-color': '#d9e9e8',
    color: '#1a1a1a',
    padding: "5px",
    width: "100%",
    display: 'block',
    fontSize: '20px'});
    button1.text(userSearchEl[0].toUpperCase() + userSearchEl.substring(1).toLowerCase());
    previousSearchEl.append(button1);

    button1.on('click', function (event) {
      event.preventDefault();
      let eventButton = $(this).val();
     
      getEvents(userSearchEl, "");
      //displayEvents(eventButton)

    })

  }

  let storedEvent = localStorage.getItem("events");
  storedEvent = JSON.parse(storedEvent) || [];
  for (var i = 0; i < storedEvent.length; i++) {
    savedSearches(storedEvent[i]);
    //savedSearches(storedZip[i]);
  }






  const formSubmitHandler = (event) => {

    //console.log(event.target)
    event.preventDefault();
    // event.stopPropagation();

    let userSearchEl = userInputEl.val().trim();
    let postalcode = postalcodeInputEl.val().trim();



    if (userSearchEl || postalcode) {
     

      getEvents(userSearchEl, postalcode);
      userInputEl.val("");
      postalcodeInputEl.val("")

      
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



  const getEvents = (userSearchEl, postalcode) => {
    
    let apiKey = "sHs8K7xQHlo3RLonwkGtJsj8wixf5F5J";
    let apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?&sort=date,asc&locale'en-us,*'&keyword=${userSearchEl}&postalCode=${postalcode}&countryCode=US&startDateTime"03/2021"&endDateTime"05/21/2021"&apikey=${apiKey}`;
    
   

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        
        let events = data._embedded
        displayEvents(events, userSearchEl, postalcode);

      })

  }



  //displaying data from the fetch request of Ticketmaster's api
  const displayEvents = (events, userSearchEl, postalcode) => {
    $("#submit-btn").disabled = false;
    
    
    let newEvents = events.events;
    
    let uniqueEvents = Array.from(new Set(newEvents.map(a => a.name)))
      .map(name => {
        return newEvents.find(a => a.name === name)
      })
   
    if (userSearchEl || postalcode) {
      $('#events').empty();
    }
    


    for (var i = 0; i < uniqueEvents.length && i < 3; i++) {
      //removeDupes(newEvents)
      let eventBody = $('#events');
      let h4 = $('<h4>');
      let eventP = $('<p>');
      let eventP2 = $('<p>');
      let eventP3 = $('<p>')

      let eventDiv = $('<a>');
      let directEvent = uniqueEvents[i].url;
      eventDiv.attr("href", directEvent);
      eventP.attr("style", "font-weight:bold")
      eventP.text(uniqueEvents[i].dates.start.localDate);


      eventDiv.addClass('list-group-item').css({
        margin: "3rem"
      });
      h4.attr("style", "color:#FF3333")
      h4.text(uniqueEvents[i].name);
      eventDiv.append(h4);
      eventDiv.append(eventP);

      console.log(uniqueEvents[i]._embedded.venues[0])

      let foo = uniqueEvents[i]._embedded.venues[0];
      console.log(foo)
      let venueName = foo.name;
      let venueAddress = foo.address.line1;
      let venueCity = foo.city.name
      let venueState = foo.state.name
      eventP2.attr("style", "font-weight: bold", "font-size: 6rem;")
      eventP2.text("Event " + venueName)
      eventDiv.append(eventP2)

      eventP3.attr("style", "font-weight: bold", "font-size: 4rem;");
      eventP3.text("Address: " + venueAddress + venueCity + " " + ", " + " " + venueState)
      eventDiv.append(eventP3)
      eventBody.append(eventDiv)
  

    }

  }


  let clearHistoryButton = $('<button>');
  clearHistoryButton.text("Clear History");
  clearHistoryButton.attr('class', 'btn btn-block')
  clearHistoryButton.css({
    'background-color': '#d9e9e8',
    color: '#1a1a1a',
    padding: "5px",
    width: "100%",
    display: 'block',
    fontSize: '10px'
  })

  previousSearchEl.append(clearHistoryButton);

  const removeItem = (event) => {
    
    localStorage.clear();
    $(event.target).siblings().remove();
    //location.reload();
    window.location.href = "Page2.html";

  }


  clearHistoryButton.on("click", removeItem);




  //added letsGoBtn "id" to html and my a variable for this. added an event listener that will redirect to
  //page2 html
  letsGoBtn.on("click", function (event) {
    event.preventDefault();
    foodChoiceValue = $("#foodChoice1").val();
    zipCode = $('#zipCode').val();
    console.log(foodChoiceValue)

    console.log(zipCode)
    jQuery('#zipCode').load('Page2.html')


    window.location.href = "Page2.html?food=" + foodChoiceValue + "&zip=" + zipCode;
    formSubmitHandler();


  })

  $('#submit-btn').on("click", formSubmitHandler)



// });