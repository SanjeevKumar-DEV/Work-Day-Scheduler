// Javascript to create scheduler on the fly and make it as dynamic as possible
// The container to display the scheduler 
var timeScheduler = $('.container');
// How many number of time chunks a day should be divided into  
var maxNumberOfRows = 24;
// What time of the day should be starting   
var intialTimeInHours = 9; //24 hours clock Time
var finalTimeInHours = 17; //24 hours clock Time
var numberOfRowsRequired  =  finalTimeInHours -  intialTimeInHours + 1;

// Create time scheduler on the fly
function createAndRenderScheduler() {
    for (var i = 0; i < numberOfRowsRequired & i <= maxNumberOfRows; i++) {
        var rowElement = $('<div>');
        rowElement.attr('class', 'row');
        rowElement.attr('id', 'row-' + intialTimeInHours + i);
        console.log(i + ' : ' + j)
        for (var j = 0; j < 3; j++) {
            var colElement = $('<div>');
            colElement.attr('class', 'col');
            colElement.attr('id', 'row-' + intialTimeInHours + i + '-col-' + j);
            if (j == 0) {
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
        rowElement.append(colElement);
    }
    timeScheduler.append(rowElement);
}
};

// Create time scheduler on the fly at when initial page load finished. 
$(document).ready(function (event) {
    createAndRenderScheduler();
});
