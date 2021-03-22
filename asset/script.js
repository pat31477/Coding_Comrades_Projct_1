

const formSubmitHandler = (events) => {
    if (events)
    getApi(events);
    
}


const getApi = () => {
    let apiKey = "sHs8K7xQHlo3RLonwkGtJsj8wixf5F5J";
    let apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?&sort=name,date,asc&locale'en-us,*'&postalCode&countryCode=US&startDateTime"03/21/2021"&apikey=${apiKey}`;
    

fetch(apiUrl)
.then(response => response.json())

.then(data => {
    console.log(data);
    console.log(data._embedded);
    displayApi(data._embedded);

})

}


//displaying data from the fetch request of Ticketmaster's api
const displayApi = (data) => {
//variable set to the events object inside the data
let events = data.events;
//slicing first 3 events
let mostRecentEvents = events.slice(0,5);
mostRecentEvents.length;

console.log(mostRecentEvents)

for (var i = 0; i < mostRecentEvents.length; i++) {
    //getting event name and creating an element
    let newEventTitle = document.createElement('h3');
    //setting textContent
    newEventTitle.textContent = mostRecentEvents[i].name;
    console.log(newEventTitle);
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

    let newEventPrice = document.createElement('h5');
    //newEventPrice.textContent = mostRecentEvents[i].priceRanges[0].min;

    if (mostRecentEvents[i].priceRanges) {
        console.log(mostRecentEvents[i].priceRanges[0].min);
        console.log(mostRecentEvents[i].priceRanges[0].max);
        //newEventPrice.textContent = mostRecentEvents[i].priceRanges[0].min
    } else {
        console.log("no price information for this event");
    }
    
    if (mostRecentEvents[i].images) {
        let newEventImage = document.createElement('img');
        let newEventUrl = mostRecentEvents[i].images[1].url;
        newEventImage.setAttribute("src", newEventUrl);
        document.body.appendChild(newEventImage);
        console.log(mostRecentEvents[i].images[1].url);
    } else {
        console.log("there are no images to display for this event");
    }


}


}



getApi();


let displayResultsBtn = document.createElement("button");
displayResultsBtn.textContent = "Display Results";
displayResultsBtn.setAttribute("style", "padding:2px; margin:5px;");
document.body.appendChild(displayResultsBtn);

displayResultsBtn.addEventListener("click", formSubmitHandler);





let clearSearchBtn = document.createElement('button');
clearSearchBtn.textContent = "Clear Search";
clearSearchBtn.setAttribute("style", "padding:2px; margin:5px;");
document.body.appendChild(clearSearchBtn);


clearSearchBtn.addEventListener("click",)








