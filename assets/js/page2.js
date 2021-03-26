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

    button1.text(userSearchEl);
    previousSearchEl.append(button1);

    button1.on('click', function (event) {
      event.preventDefault();
      let eventButton = $(this).val();
      console.log(eventButton);
      console.log($(this));

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
    console.log(apiUrl);
   

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        
        console.log(data._embedded);
        let events = data._embedded
        displayEvents(events, userSearchEl, postalcode);

      })

  }



  //displaying data from the fetch request of Ticketmaster's api
  const displayEvents = (events, userSearchEl, postalcode) => {
    $("#submit-btn").disabled = false;
    console.log(postalcode)
    
    let newEvents = events.events;
    console.log(newEvents)
    //console.log(newEvents.name);

    let uniqueEvents = Array.from(new Set(newEvents.map(a => a.name)))
      .map(name => {
        return newEvents.find(a => a.name === name)
      })
    console.log(uniqueEvents)

  
    if (userSearchEl || postalcode) {
      $('#events').empty();
    }
    //if ()


    for (var i = 0; i < uniqueEvents.length && i < 3; i++) {
      //removeDupes(newEvents)
      let eventBody = $('#events');
      let h4 = $('<h4>');
      let eventP = $('<p>');
      let eventP2 = $('<p>');

      let eventDiv = $('<a>');
      let directEvent = uniqueEvents[i].url;
      eventDiv.attr("href", directEvent);

      eventP.text(uniqueEvents[i].dates.start.localDate);


      eventDiv.addClass('list-group-item').css({
        margin: "3rem"
      });
      h4.text(uniqueEvents[i].name);
      eventDiv.append(h4);
      eventDiv.append(eventP);
     

      // if (uniqueEvents.find(element => element.dates.start.localTime)) {
      //   console.log(element);
      //   //eventP2.text(element.localTime)
      //   //eventDiv.append(eventP2);

      // } else {
      //   //eventP2.text("There is no local time for this event");
      //   //eventDiv.append(eventP2)
        
      // }
      // let arr = [];


      // uniqueEvents.filter(element => {
      //   element.dates.start.localTime;


      //   arr.push(element.dates.start.localTime)
      




      //   console.log(arr.shift())
      // })









      eventBody.append(eventDiv)
      //eventBody.append(h4);

      //let eventTime = $('<p>');

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