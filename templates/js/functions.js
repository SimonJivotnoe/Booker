function buildHead(day){
    var headData = '<tr>';
    var nameDayOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    if (day == 'Monday begin' ) {
        for (var i = 0; i <= 6; i++) {
            headData += '<th>'+ nameDayOfWeek[i]+'</th>';
        }
        headData += '</tr>';
        return headData;
    } else {
        nameDayOfWeek.splice(0, 0, nameDayOfWeek.splice(-1, 5)[0]);
        for (var i = 0; i <= 6; i++) {
            headData += '<th>'+ nameDayOfWeek[i]+'</th>';
        }
        headData += '</tr>';
        return headData;
    }

}

function lScomm() {
    var objLS = JSON.parse(localStorage[ 'settings' ]);
    return objLS[0]['start day of week'];
}
var months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
function GetMonthName(monthNumber) {

    return months[monthNumber];
}

function generateDaysList(month, lastDayOfMonth, dayStart, year) {
    for (var i = 1; i <= lastDayOfMonth; i++) {
        if (i < dayStart) {
            $('.bookItDate' ).append('<option disabled value="' + i + '">' + i +  '</option>');
        } else if(i == dayStart) {
            if (weekEnds(new Date(year, month, i))) {
                $('.bookItDate' ).append('<option selected value=" ' + i + '" class="activeDay">' + i +  '</option>');
            } else {
                $('.bookItDate' ).append('<option disabled value="' + i + '">' + i +  '</option>');
            }

        } else {
            if (weekEnds(new Date(year, month, i))) {
                $('.bookItDate' ).append('<option value="' + i + '" class="activeDay">' + i +  '</option>');
            } else {
                $('.bookItDate' ).append('<option disabled value="' + i + '">' + i +  '</option>');
            }

        }
    }
}
function fillDateSelect(month, lastDayOfMonth, dayStart, year ) {
    for (var i = 0; i <= 11; i++) {
        if (i == month) {
            $('.bookItMonth' ).append('<option selected="selected" value="' + i + '">' + months[i] +  '</option>');
        } else {
            $('.bookItMonth' ).append('<option value="' + i + '">' + months[i] +  '</option>');
        }

    }
    generateDaysList(month, lastDayOfMonth, dayStart, year);

    for (var i = 0; i <= 11; i++) {
        var count = new Date().getFullYear() + i;
        if (count == year) {
            $('.bookItYear' ).append('<option selected="selected" value="' + count + '">' + count +  '</option>');
        } else {
            $('.bookItYear' ).append('<option value="' + count + '">' + count +  '</option>');
        }

    }
}

function weekEnds(date){
    if (date.getDay() == 0 || date.getDay() == 6) {
        return false;
    } else {
        return true;
    }
}

function getListOfDays(curYear, curMonth) {
    console.log('ok');
    $('.bookItDate' ).html('');
    var curDate = new Date(new Date().setHours(0,0,0,0));
    var daysInMonth = 32 - new Date( curYear, curMonth, 32 ).getDate();
    if (curDate.getFullYear() == curYear) {
        if (curDate.getMonth() == curMonth) {
            generateDaysList(curMonth, daysInMonth, new Date().getDate(), curYear);
        } else if(curDate.getMonth() > curMonth){
            generateDaysList(curMonth, daysInMonth, 32, curYear);
        } else {
            generateDaysList(curMonth, daysInMonth, 1, curYear);
        }
    } else if (curDate.getFullYear() > curYear){
        generateDaysList(curMonth, daysInMonth, 32, curYear);
    } else {
        generateDaysList(curMonth, daysInMonth, 1, curYear);
    }
}