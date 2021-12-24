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
        rowElement.attr('class', 'row');
        rowElement.attr('id', 'row-' + intialTimeInHours + i);
        // console.log(i + ' : ' + j)
        for (var j = 0; j < 3; j++) {
            // First column as time to be created and populated in deparate 
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
            if (j === 1) {
                colElement = $('<input>');
                colElement.attr('type', 'text');
                colElement.attr('class', 'col-10');
                colElement.attr('id', 'row-' + intialTimeInHours + i + '-col-' + j);
            }
            if (j === 2) {
                colElement = $('<div>');
                colElement.attr('class', 'col-1 saveBtn');
                colElement.attr('id', 'row-' + intialTimeInHours + i + '-col-' + j);
                var colElementDiv = $('<div>');
                colElementDiv.attr('class', 'row saveButtonEnhanced');
                var colElementInputImg = $('<input>');
                colElementInputImg.attr('class', 'col-xs-auto col-sm-auto');
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

// Create time scheduler on the fly at when initial page load finished. 
$(document).ready(function (event) {
    createAndRenderScheduler();
});
