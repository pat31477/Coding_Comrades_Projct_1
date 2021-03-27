//getting DOM elements
let letsGoBtn = $("#letsGoBtn");
let eventId = $("#event-id");
let eventText = $("#event-text");
let eventTitle = $("#event-title");
let eventSearchForm = $(".userInput");
let userInputEl = $('input[name="search-input"]');
let postalcodeInputEl = $('input[name="postal-input"]');
let previousSearchEl = $('#previous-search-el');
let nextHtmlPage = 'Page2.html';
let enterBtn = $("#enterBtn");
let userSearchEl;

//event listener on modal on index.html
  $("#myBtn").click(function () {
    $("#myModal").modal();
  });


  $("#enterBtn").click(function () {
    $("#myModal").modal();
  });

//local storage function for event searching. creates a button,styles it, appends to the DOM to display to the user
  const savedSearches = function (userSearchEl) {
    let button1 = $('<button>');
    button1.attr('class', 'btn btn-block')
    button1.css({'background-color': '#d9e9e8',
    color: '#1a1a1a',
    padding: "5px",
    width: "100%",
    display: 'block',
    fontSize: '20px'});
    button1.text(userSearchEl);
    previousSearchEl.append(button1);
    button1.on('click', function (event) {
      event.stopPropagation();
      // let eventButton = $(this).val();
      getEvents(userSearchEl, "");
    })
  }

//if theres something to store from the user's input store it OR if not create an empty array. sets up for loop to push whats in localstorage to the function
  let storedEvent = localStorage.getItem("events");
  storedEvent = JSON.parse(storedEvent) || [];
  for (var i = 0; i < storedEvent.length; i++) {
    savedSearches(storedEvent[i]);
  }

  //big daddy function doing the heavy lifting. sets the values of the user inputs. checks to see if they were, if so run the fetch 
  const formSubmitHandler = (event) => {
    event.preventDefault()
    event.stopPropagation();
    // event.preventDefault();
    
   
    let userSearchEl = userInputEl.val().trim();
    let postalcode = postalcodeInputEl.val().trim();

    if (userSearchEl || postalcode) {
     
      getEvents(userSearchEl, postalcode);
      userInputEl.val("");
      postalcodeInputEl.val("");
    
      $('#submit-btn').disabled = true;
    } else {
      $('#submit-btn').disabled = true;

    }
    //parses/stringifies user's input into local storage
    savedSearches(userSearchEl);
    let storedEvent = localStorage.getItem("events");
    storedEvent = JSON.parse(storedEvent) || [];
    storedEvent.push(userSearchEl);
    let stringifiedEvents = JSON.stringify(storedEvent);
    localStorage.setItem("events", stringifiedEvents);

  }

//function that runs the API fetch
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
    // creates a new array of objects from the fetched events. the events show duplicates and i didnt want to show duplicates
    let uniqueEvents = Array.from(new Set(newEvents.map(a => a.name)))
      .map(name => {
        return newEvents.find(a => a.name === name)
      })
   
    if (userSearchEl || postalcode) {
      $('#events').empty();
    }
    

//loops thru sorted events- and dynamically creates to display on the DOM
    for (var i = 0; i < uniqueEvents.length && i < 3; i++) {
      
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
      eventP3.text("Address: " + venueAddress + " " + venueCity + " " + ", " + " " + venueState)
      eventDiv.append(eventP3)
      eventBody.append(eventDiv)
  

    }

  }

//dynamically created clear history button 
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
//function that removes buttons that have local storage from the DOM
  const removeItem = (event) => {
    
    localStorage.clear();
    $(event.target).siblings().remove();
    window.location.href = "Page2.html";

  }

//event listener calling removeItem function
  clearHistoryButton.on("click", removeItem);




  //added letsGoBtn "id" to html and my a variable for this. added an event listener that will redirect to
  //page2 html with their original inputs
  letsGoBtn.on("click", function (event) {
    event.preventDefault();
    foodChoiceValue = $("#foodChoice1").val();
    zipCode = $('#zipCode').val();
    jQuery('#zipCode').load('Page2.html')
    window.location.href = "Page2.html?food=" + foodChoiceValue + "&zip=" + zipCode;
    formSubmitHandler();
  })



  $('#submit-btn').on("click", formSubmitHandler)



