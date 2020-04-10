// Added updating date using moment.js to the currentDay id
$("#currentDay").text("Today is: " + moment().format("MMMM Do, YYYY"));
console.log(currentDay);

// Once text is entered into the textarea
// Event listener button on click will save content within local storage
// ?With the time associated with it?
// Will clear text from the field

// Object where user inputted tasks are populated
var workDay = {
    "9 AM": "",
    "10 AM": "",
    "11 AM": "",
    "12 PM": "",
    "1 PM": "",
    "2 PM": "",
    "3 PM": "",
    "4 PM": "",
    "5 PM": "",
};

$(document).ready(function() {
    if (!localStorage.getItem("workDay")) {
        updateCalendarTasks(workDay);
    } else {
        updateCalendarTasks(JSON.parse(localStorage.getItem("workDay")));
    }
})
// For loop that will use a counter to reference each of the text-entry ids in each textarea
var counter = 1;
for(const property in workDay) {
    var textEntry = "#text-entry" + counter;
    // ???????
    $(textEntry).text(workDay[property]);
    var timeId = "#time" + counter;
    console.log(textEntry);
    console.log(presentHour);
    // Setting variable to present hour of the day
    var presentHour = moment().hour();
    var timeString = $(timeId).text();
    var timeNumber = numberHourString(timeString);
    if (timeNumber < presentHour) {
        $(textEntry).addClass("past");
    } else if (timeNumber > presentHour) {
        $(textEntry).addClass("future");
    } else {
        $(textEntry).addClass("present");
    }
    // Last thing function does is increase counter by 1
    counter ++;
}

$("button").click(function() {
    value = $(this).siblings("textarea").val;
    hourString = $(this).siblings("div").text;

    saveSchedule(hourString, value);
});

function numberHourString(hourString) {
    switch(hourString) {
        case "9 AM": return 9;
        case "10 AM": return 10;
        case "11 AM": return 11;
        case "12 PM": return 12;
        case "1 PM": return 13;
        case "2 PM": return 14;
        case "3 PM": return 15;
        case "4 PM": return 16;
        case "5 PM": return 17;
    }
}

function loadDataset() {
    result = localStorage.getItem("workDay")
    return (result ? result : workDay);
}

function runLocalStorage() {
    localStorage.setItem("workDay", JSON.stringify(dayObj));
}

function saveLocalStorage(dayObj) {
    localStorage.setItem("workDay", JSON.stringify(dayObj));
}

function saveSchedule(hourString, val) {
    if(!localStorage.getItem("workDay")) {
        runLocalStorage();
    }

    var workHours = JSON.parse(localStorage.getItem("workDay"));
    val = workHours[hourString];

    saveLocalStorage(workHours);
}

function updateCalendarTasks(dayObject) {
    $(".calendar-row").each(function(index) {
        var res = $(this).children("div");
        $(this).children("textarea").text(dayObject[res.text()]);
    })
}