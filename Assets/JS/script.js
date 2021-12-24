// Javascript to create scheduler on the fly and make it as dynamic as possible
// The container to display the scheduler 
var timeScheduler = $('.container');
// How many number of time chunks a day should be divided into  
var maxNumberOfRows = 24;
// What time of the day should be starting   
//24 hours clock Time. Min Value can be 0 
var intialTimeInHours = 9;
//24 hours clock Time. Max value should be 23 
var finalTimeInHours = 18;
var numberOfRowsRequired = finalTimeInHours - intialTimeInHours + 1;

// Create time scheduler on the fly
function createAndRenderScheduler() {
    for (var i = 0; i < numberOfRowsRequired & i <= maxNumberOfRows; i++) {
        var rowElement = $('<div>');
        rowElement.attr('class', 'row justify-content-center');
        rowElement.attr('id', 'row-' + intialTimeInHours + i);
        console.log(i + ' : ' + j)
        for (var j = 0; j < 3; j++) {
            // First column as time to be created and populated in deparate 
            var colElement;
            if (j == 0) {
                colElement = $('<div>');
                colElement.attr('class', 'col-2 time-block hour');
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
            if (j === 1) {
                colElement = $('<input>');
                colElement.attr('type', 'text');
                colElement.attr('class', 'col-8');
                colElement.attr('id', 'row-' + intialTimeInHours + i + '-col-' + j);
            }
            if (j === 2) {
                colElement = $('<input>');
                colElement.attr('class', 'col-2 saveBtn');
                colElement.attr('type', 'button');
                colElement.attr('value', 'Save');
                colElement.attr('id', 'row-' + intialTimeInHours + i + '-col-' + j);
            }
            rowElement.append(colElement);
        }
        timeScheduler.append(rowElement);
    }
};

// Create time scheduler on the fly at when initial page load finished. 
$(document).ready(function (event) {
    createAndRenderScheduler();
});
