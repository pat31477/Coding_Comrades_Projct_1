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


  //figure out how to fetch from query string on page2.js
  //



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



  const getEvents = (userSearchEl, postalcode) => {
    //console.log(userSearchEl)
    let apiKey = "sHs8K7xQHlo3RLonwkGtJsj8wixf5F5J";
    //let apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?&sort=date,asc&locale'en-us,*'&keyword=${userSearchEl}&stateCode""&countryCode=US&startDateTime"03/2021"&endDateTime"05/21/2021"&apikey=${apiKey}`;
    let apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?&sort=date,asc&locale'en-us,*'&keyword=${userSearchEl}&postalCode=${postalcode}&countryCode=US&startDateTime"03/2021"&endDateTime"05/21/2021"&apikey=${apiKey}`;
    console.log(apiUrl);
    //console.log(userSearchEl)
    //let apiUrl = `https://app.ticketmaster.com/v2/events.json?&sort=date,name,asc&apikey=${apiKey}`;
    //let apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?&sort=date,asc&locale'en-us,*'&postalCode="08904"&countryCode=US&startDateTime="03/2021"&endDateTime="05/21/2021"&apikey=${apiKey}`;
    //let apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?&sort=date&postalCode=08904&apikey=${apiKey}&keyword=basketball`;
    //console.log(input);  

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        //console.log(postalcode);
        console.log(data._embedded);
        let events = data._embedded
        displayEvents(events, userSearchEl, postalcode);

      })

  }



  //displaying data from the fetch request of Ticketmaster's api
  const displayEvents = (events, userSearchEl, postalcode) => {
    $("#submit-btn").disabled = false;
    console.log(postalcode)
    // let eventItems = $('#events .list-group-item');

    // eventItem = eventItems.first();
    // console.log(eventItem);
    let newEvents = events.events;
    console.log(newEvents)
    //console.log(newEvents.name);

    let uniqueEvents = Array.from(new Set(newEvents.map(a => a.name)))
      .map(name => {
        return newEvents.find(a => a.name === name)
      })
    console.log(uniqueEvents)

    // let newEventNames = newEvents[0].name;
    // console.log(newEventNames)
    // const removeDupes = (newEvents) => {
    //   let unique = {};
    //   newEvents.forEach(function(i) {
    //     if(!unique[i]) {
    //       unique[i] = true;
    //       console.log(unique[i]);
    //     }
    //   })
    //    console.log(Object.keys(unique));
    // }
    if (userSearchEl || postalcode) {
      $('#events').empty();
    }





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


      //eventDiv.text("click")
      //eventDiv.append(eventTag)

      eventDiv.append(h4);
      eventDiv.append(eventP);
      // let element = uniqueEvents[i].dates.start.localTime;
      // console.log(element)

      if (uniqueEvents.find(element => element == true)) {

        eventP2.text(element.localTime)
        eventDiv.append(eventP2);

      } else {
        eventP2.text("There is no local time for this event");
        eventDiv.append(eventP2)
      }


      eventBody.append(eventDiv)
      //eventBody.append(h4);

      //let eventTime = $('<p>');

    }


    //  newEvents.forEach((events, index) => {


    //   $(`#list-text${index+1}`).text(events.name)

    //   let eventImg = $('<img>');
    //   let eventImageUrl = events.images[1].url;

    //   eventImg.attr("style", "width:8em;", "ml-5");
    //   eventImg.attr("src", eventImageUrl);
    //   $(`#eventText${index+1}`).append(eventImg)



    //   $(`#venue${index+1}`)
    //    .text("Event Date: " + events.dates.start.localDate + `\n`
    //     + " " + "Event Time: " + events.dates.start.localTime)
    //    .attr("style", "font-weight:bold;")
    //     ;
    // //   //$('.list-group-item-text').text(eventItem)


    // // let bookingUrl = events.url
    // // $(`#btn-link${index+1}`).attr("href", bookingUrl)
    //  })










  }


  let clearHistoryButton = $('<button>');
  //clearHistoryButton.addClass("fancy");
  //clearHistoryButton.attr("class", "p-5", "color: green; v");
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
    //$('.panel').hide();
    localStorage.clear();
    $(event.target).siblings().remove();
    //location.reload();
    window.location.href = "Page2.html";

    //console.log(event.children());
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


  //letsGoBtn.on("click", formSubmitHandler);

  //eventSearchForm.on("submit", formSubmitHandler);
  $('#submit-btn').on("click", formSubmitHandler)



// });