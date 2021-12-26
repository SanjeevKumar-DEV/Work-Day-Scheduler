// Javascript to create scheduler on the fly and make it as dynamic as possible
// The container to display the scheduler 
var timeScheduler = $('.container');
// How many number of time chunks a day should be divided into  
var maxNumberOfRows = 24;
// What time of the day should be starting   
//24 hours clock Time. Min Value can be 0 
var intialTimeInHours = 9;
//24 hours clock Time. Max value should be 23 
var finalTimeInHours = 17;
var numberOfRowsRequired = finalTimeInHours - intialTimeInHours + 1;
var currentDayDisplayEl = $('#currentDay');
var initialIdForEventCapture = intialTimeInHours * 10;
var finalIdForEventCapture = initialIdForEventSave + (finalTimeInHours - intialTimeInHours);
var initialIdForEventSave = intialTimeInHours;
var finalIdForEventSave = finalTimeInHours;

// Setting load of events on first load of from the storage

var scheduledEventsForDay = {
    currentDay,
    eventsForTheDay: []
};

if (JSON.parse(localStorage.getItem('dayEventsInStorage')) === null) {
    scheduledEventsForDay.currentDay = moment().format('D');
    localStorage.setItem("dayEventsInStorage", JSON.stringify(scheduledEventsForDay));
}
else {
    scheduledEventsForDay = JSON.parse(localStorage.getItem('dayEventsInStorage'));
}


// Create time scheduler on the fly
function createAndRenderScheduler() {
    for (var i = 0; i < numberOfRowsRequired & i <= maxNumberOfRows; i++) {
        var rowElement = $('<div>');
        rowElement.attr('class', 'row');
        rowElement.attr('id', 'row-' + intialTimeInHours + i);
        for (var j = 0; j < 3; j++) {
            // First column as time to be created and populated accordingly for display progressively
            var colElement;
            if (j == 0) {
                colElement = $('<text>');
                colElement.attr('class', 'col-1 time-block hour description');
                colElement.attr('id', 'row-' + intialTimeInHours + i + '-col-' + j);
                time = intialTimeInHours + i;
                if ((time % 24) >= 0 & (time % 24) < 12) {
                    if (time < 10) {
                        timeToDisplay = '0' + time + ' : 00';
                        timeToDisplay += ' AM';
                    }
                    else {
                        timeToDisplay = time + ' : 00';
                        timeToDisplay += ' AM';
                    }
                }
                else if (time === 12) {
                    timeToDisplay = time + ' : 00';
                    timeToDisplay += ' PM';
                }
                else {
                    time -= 12;
                    if (time < 10) {
                        timeToDisplay = '0' + time + ' : 00';
                        timeToDisplay += ' PM';

                    }
                    else {
                        timeToDisplay = time + ' : 00';
                        timeToDisplay += ' PM';
                    }
                }
                colElement.text(timeToDisplay);
            }
            // Second column for inserting comments about the meeting text
            if (j === 1) {
                colElement = $('<input>');
                colElement.attr('type', 'text');
                colElement.attr('id', initialIdForEventCapture + i);
                // Present Past and Future colour coding handler
                if (parseInt(moment().format('H')) > (intialTimeInHours + i)) {
                    colElement.attr('class', 'col-10 future');
                }
                else if (parseInt(moment().format('H')) === (intialTimeInHours + i)) {
                    colElement.attr('class', 'col-10 present');
                }
                else {
                    colElement.attr('class', 'col-10 past');
                }
                for (var k = 0; k < scheduledEventsForDay.eventsForTheDay.length; k++) {
                    if (scheduledEventsForDay.eventsForTheDay[k].id === (initialIdForEventSave + i)) {
                        colElement.val(scheduledEventsForDay.eventsForTheDay[k].eventDetail);
                    }
                }

            }
            // Third column to save the neeting text. 
            if (j === 2) {
                colElement = $('<div>');
                colElement.attr('class', 'col-1 saveBtn');
                var colElementDiv = $('<div>');
                colElementDiv.attr('class', 'row saveButtonEnhanced');
                var colElementInputImg = $('<input>');
                colElementInputImg.attr('class', 'col-xs-auto col-sm-auto');
                colElementInputImg.attr('id', initialIdForEventSave + i);
                colElementInputImg.attr('type', 'image');
                colElementInputImg.attr('src', './Assets/Images/saveButton.png');
                colElementInputImg.attr('height', '25px');
                colElementDiv.append(colElementInputImg);
                colElement.append(colElementDiv);
            }
            rowElement.append(colElement);
        }
        timeScheduler.append(rowElement);
    }
};

var secondsElapsedSinceAppStarted = 0;

// To Store current list of events in local storage;
function saveEventsInLocalStorage() {
    localStorage.setItem("dayEventsInStorage", JSON.stringify(scheduledEventsForDay));
}

// Previous events and fresh events and stale events are cleared on start of new day. 

function reloadTheEventsOnStartOfNewDay() {
    localStorage.clear();
    location.reload();
}

// Function to update time blocks colour every second and clear the events on start of new day. 

function setTime() {
    var timerInterval = setInterval(function () {
        currentDayDisplayEl.text(moment().format("dddd, MMMM Do YYYY, hh:mm:ss a"));
        if (parseInt(moment().format('mm')) === 0 & parseInt(moment().format('ss')) === 0) {
            location.reload();
        }
        if (moment().format('D') !== scheduledEventsForDay.currentDay)
        {
            reloadTheEventsOnStartOfNewDay();
        }
        secondsElapsedSinceAppStarted++;
    }, 1000);
};

// Create time scheduler on the fly at when initial page load finished. 
$(document).ready(function (event) {
    createAndRenderScheduler();
    setTime();
});

$('.container').on('click', function (event) {
    event.preventDefault();
    var targetId = parseInt(event.target.id);
    var icrementalTargetId = targetId - initialIdForEventSave;
    if (targetId >= initialIdForEventSave & targetId <= finalIdForEventSave) {
        var newEventToSave = $('#' + (initialIdForEventCapture + icrementalTargetId)).val();
        if (newEventToSave != '') {
            var eventContent = {
                id: targetId,
                eventDetail: newEventToSave
            };
            var updateEvent = false;
            for (var i = 0; ((i < scheduledEventsForDay.eventsForTheDay.length) || i === 0) & !updateEvent; i++) {
                // Update an exsting event
                if (scheduledEventsForDay.eventsForTheDay[i] !== null & scheduledEventsForDay.eventsForTheDay.length > 0) {
                    if (targetId === scheduledEventsForDay.eventsForTheDay[i].id) {
                        scheduledEventsForDay.eventsForTheDay[i] = eventContent;
                        updateEvent = true;
                    }
                }
                // Create a new event
                if ((!updateEvent & scheduledEventsForDay.eventsForTheDay.length === 0) || (!updateEvent & scheduledEventsForDay.eventsForTheDay.length > 0 & i === (scheduledEventsForDay.eventsForTheDay.length - 1))) {
                    scheduledEventsForDay.eventsForTheDay.push(eventContent);
                }
                // Sort the events array when required 
                if (scheduledEventsForDay !== null & scheduledEventsForDay.eventsForTheDay !== null & scheduledEventsForDay.eventsForTheDay.length > 0) {
                    if(i === (scheduledEventsForDay.eventsForTheDay.length) - 1)
                    scheduledEventsForDay.eventsForTheDay.sort(function (a, b) {
                        return a.id - b.id;
                    });
                }
            }
            saveEventsInLocalStorage();
        }
    }

});



