$( document ).ready( function ()
{
    var today = new Date();
    if ( localStorage.getItem( 'settings' ) == null )
    {
        setLS();
    } else {
        lSbuttonChanger('start day of week', 'Sunday begin', 'Monday begin', '#weekBegin');
        lSbuttonChanger('timeFormat', 'AM / PM', '24 Hours', '#timeFormat');
    }
    var firstDayOfWeekOfMonth = '';
    var month = today.getMonth();
    var year = today.getFullYear();
    var day = today.getDate();
    var dayOfWeek = today.getDay();
    var vfirstDayInMS = '';
    var lastDayOfMonthInMS = '';
    var daysInMonth = '';
    var msInDay = 1000 * 60 * 60 * 24;
    if (6 == dayOfWeek) {
        today = new Date(year, month, (day + 2));
    } else if(0 == dayOfWeek){
        today = new Date(year, month, (day + 1));
    }
    firstDayInMS( today );

    function firstDayInMS( inputData )
    {
        var date = new Date( inputData ); //console.log('Today is: ' + date);
        var monthName = GetMonthName(date.getMonth());
        $( '#monthYear' ).html( monthName + '  ' + date.getFullYear() );
        today = date;
       // dayOfWeek = date.getDay(); //console.log('Day of a week: ' + dayOfWeek);
         //console.log('Date of month: ' + day);
       //console.log('Month: ' + day);
         //console.log('Year: ' + year);
        var firstDayOfMonth = new Date( year, month, 1 );
        daysInMonth = 32 - new Date( year, month, 32 ).getDate(); //console.log('Year: ' + daysInMonth);
        lastDayOfMonthInMS = new Date( year, month, daysInMonth, 23, 59, 59 ).getTime();
        firstDayOfWeekOfMonth = firstDayOfMonth.getDay();
        vfirstDayInMS = new Date( year, month, 1 ).getTime();
        var firstDateInCalendar = startDateInCalendar( vfirstDayInMS );
        buildTable( firstDateInCalendar );
    }

    function startDateInCalendar( firstDayInMS )
    {//console.log(lScomm());
        var startDate;
        if ( lScomm() == 'Monday begin' )
        {
            if ( firstDayOfWeekOfMonth == 1 )
            {
                startDate = firstDayInMS - (msInDay * 7);
            } else if ( firstDayOfWeekOfMonth == 0 )
            {
                startDate = (firstDayInMS) - (msInDay * 6);
            } else
            {
                startDate = firstDayInMS - (msInDay * (firstDayOfWeekOfMonth - 1));
            }
        } else
        {
            if ( firstDayOfWeekOfMonth == 0 )
            {
                startDate = firstDayInMS - (msInDay * 7);
            } else if ( firstDayOfWeekOfMonth == 6 )
            {
                startDate = (firstDayInMS) - (msInDay * 6);
            } else
            {
                startDate = firstDayInMS - (msInDay * (firstDayOfWeekOfMonth));
            }
        }
        return startDate;
    }

    function buildTable( startDateBuild )
    {
        var dateIncr = startDateBuild;
        var headData;
        var output = '';
        if ( lScomm() == 'Monday begin' )
        {
            headData += buildHead(lScomm());

        } else
        {
            headData += buildHead(lScomm());
        }
        $.ajax( {
            url   : 'index.php?page=ajaxcalendarbuilder&start=' + vfirstDayInMS + '&end=' + lastDayOfMonthInMS,
            method: 'GET'
        } ).then( function ( data )
        {
            var objJSON = JSON.parse( data );
            for ( var i = 0; i <= 5; i ++ )
            {
                output += "<tr>";
                var outputTD = '';
                var outputTDEvent = '';
                for ( var j = 0; j <= 6; j ++ )
                {
                    if ( dateIncr < vfirstDayInMS || dateIncr > lastDayOfMonthInMS )
                    {
                        outputTD += "<td class='tdHead inactiveDay'><div><p>&nbsp" +"</p></div></td>";

                    } else if ( lScomm() == 'Monday begin')
                    {
                        if ( j == 5 || j == 6 ) {
                            outputTD += "<td class='tdHead inactiveDay weekend'><div><p class='dayOfWeek'>" +
                            new Date( dateIncr ).getDate() +"</p></div></td>";
                        } else {
                            outputTD += "<td class='tdHead'><div><span class='dayOfWeek'>" +
                            new Date( dateIncr ).getDate() +
                            "</span><div class='ulWrapper'><ul>" + listSchedules( objJSON, dateIncr ) +
                            "</ul></div></div></td>";
                        }
                    } else {
                        if ( j == 0 || j == 6 ) {
                            outputTD += "<td class='tdHead inactiveDay weekend'><div><p class='dayOfWeek'>" +
                            new Date( dateIncr ).getDate() +"</p></div></td>";
                        } else {
                            outputTD += "<td class='tdHead'><div><span class='dayOfWeek'>" +
                            new Date( dateIncr ).getDate() +
                            "</span><div class='ulWrapper'><ul>" + listSchedules( objJSON, dateIncr ) +
                            "</ul></div></div></td>";
                        }
                    }
                    dateIncr += msInDay;
                }
                output += outputTD + "</tr>";
            }
            $( '#calendarTable' ).empty();
            $( '#calendarTable' ).append( headData );
            $( '#calendarTable' ).append( output );
        } );

    }

    $( '#previous' ).on( 'click', function ()
    {
        var prevMonth = new Date( year, (month - 1), 1 );
        var prevDate = new Date( prevMonth );
        $( 'td div p' ).fadeOut();
        firstDayInMS( prevDate );

    } );

    $( '#next' ).on( 'click', function ()
    {
        var nextMonth = new Date( year, (month + 1), 1 );
        var nextDate = new Date( nextMonth );

        firstDayInMS( nextDate );
    } );

    $( '#weekBegin' ).on( 'click', function ()
    {
        if ( $( '#weekBegin' ).text() == 'Sunday begin' )
        {
            $( '#weekBegin' ).text( 'Monday begin' );
            lSchanger( "start day of week", 'Sunday begin' );
        } else
        {
            $( '#weekBegin' ).text( 'Sunday begin' );
            lSchanger( "start day of week", 'Monday begin' );
        }
        firstDayInMS( today );
    } );

    $('#timeFormat').on('click', function(){
        if ( $( '#timeFormat' ).text() == '24 Hours' )
        {
            $( '#timeFormat' ).text( 'AM / PM' );
            lSchanger( "timeFormat", '24 Hours' );
        } else
        {
            $( '#timeFormat' ).text( '24 Hours' );
            lSchanger( "timeFormat", 'AM / PM' );
        }

        firstDayInMS( today );
    })

    function listSchedules( objJSON, currentDay )
    {
        var res = '';

        $.each( objJSON, function ( key, val )
        {
            $.each( val, function ( key, val )
            {
                if ( key == 'start_time_ms')
                {
                    if ( new Date( parseInt( val ) ).getMonth() == new Date( currentDay ).getMonth() &&
                        new Date( parseInt( val ) ).getDate() == new Date( currentDay ).getDate() )
                    {
                        res += '<li><a class="appointment" name="'+new Date( currentDay ).getDate()+'">' +
                        timeFormatter(new Date( parseInt( val ) )) + ' - ';
                    }
                } else if(key == 'end_time_ms'){
                    if ( new Date( parseInt( val ) ).getMonth() == new Date( currentDay ).getMonth() &&
                        new Date( parseInt( val ) ).getDate() == new Date( currentDay ).getDate() )
                    {
                        res += timeFormatter(new Date( parseInt( val ) )) + '</a></li>';
                    }
                }
            } );
        } );
        return res;
    }

    var curMonth = '';
    var curDate = '';
    var curYear = '';
    var recType = 7;
    var duration = '';
    function durationCheck(){
        if ($('#recursion_1').prop('disabled')) {
            duration = '';
        } else {
            duration = $('#duration').val();
        }
    }
    $('.bookIt').on('click', function(){
        $('.bookItMonth, .bookItDate, .bookItYear, .startHour, .endHour, .startTimeFormat, .endTimeFormat' ).html('');
        if ('AM / PM' == getLSTimeFormat()) {
            $('.startTimeFormat, .endTimeFormat' ).append(
                '<select class="form-control"><option>AM</option><option>PM</option></select>'
            );
        }
        var dayStart = today.getDate();
        if (new Date().setHours(0,0,0,0) <= today.setHours(0,0,0,0)) {
            fillDateSelect(month, daysInMonth, dayStart, year );
            fillHoursAndMinutes(getTimeFormat(), new Date(year, month, dayStart ));
            validation(year, month, dayStart, '', '', '' );
            curMonth = month;
            curDate = dayStart;
            curYear = year;
        } else {
            curMonth = new Date().getMonth();
            curDate = new Date().getDate();
            curYear = new Date().getFullYear();
            var curLastDay = 32 - new Date( curYear, curMonth, 32 ).getDate();
            fillDateSelect(curMonth, curLastDay, curDate, curYear );
            fillHoursAndMinutes(getTimeFormat(), new Date(curYear, curMonth, curDate));
            validation(curYear, curMonth, curDate, '', '', '' );
        }
        $('.recWrapper *').prop('disabled',true);
        $('.offRec').prop("checked", true);
        $( '.checkRec' ).html( '' );
        $('#duration').val(1);
    })

    $('.bookItMonth').change(function(){
        curMonth = parseInt($(this).val());
        getListOfDays(curYear, curMonth);
        fillHoursAndMinutes(getTimeFormat(), new Date(curYear, curMonth, curDate));
        durationCheck();
        validation(curYear, curMonth, curDate, '', recType, duration );
    });
    $('.bookItDate').change(function(){
        curDate = parseInt($(this).val());
        fillHoursAndMinutes(getTimeFormat(), new Date(curYear, curMonth, curDate));
        durationCheck();
        validation(curYear, curMonth, curDate, '', recType, duration );
    });
    $('.bookItYear').change(function(){
        curYear = parseInt($(this).val());
        getListOfDays(curYear, curMonth);
        fillHoursAndMinutes(getTimeFormat(), new Date(curYear, curMonth, curDate));
        durationCheck();
        validation(curYear, curMonth, curDate, '', recType, duration );
    });
    $('.startHour, .startMin, .endHour, .endMin').change(function(){
        validation(curYear, curMonth, curDate, '', recType, duration );
    });

    $('input[type=radio][name=recurring]').change(function() {
        if (this.value == '0') {
            $('.recWrapper *').prop('disabled',true);
            $( '.checkRec' ).html( '' );
            validation(curYear, curMonth, curDate, '', '', '' );
        }
        else if (this.value == '1') {
            $('.recWrapper *').prop('disabled',false);
            $( '.checkRec' ).html( '' );
            validation(curYear, curMonth, curDate, '', recType, 1);
        }
    });

    $('input[type=radio][name=recurringRes]').change(function() {
        if (this.value == '7') {
            $('#duration').val(1).attr({ max: '4', value: '1' });
        }
        else if (this.value == '14') {
            $('#duration').val(1).attr({ max: '2', value: '1'  });
        } else if (this.value == '28') {
            $('#duration').val(1).attr({ max: '1', value: '1'  });
        }
        recType = parseInt(this.value);
        validation(curYear, curMonth, curDate, '', recType, 1);
    });

    $('#duration').on('keyup change', function(){
        var max = $('#duration' ).attr('max');
        var min = $('#duration' ).attr('min');
        if ($('#duration' ).val() >= max) {
            $('#duration' ).val(max);
        } else if($('#duration' ).val() <= min){
            $('#duration' ).val(min);
        }
        validation(curYear, curMonth, curDate, '', recType, parseInt($('#duration' ).val()));
    })

    $('.newBookItButton').on('click', function(){
        validation(curYear, curMonth, curDate, 'insert', '', '');
    })
     $('#calendarTable').on('click', '.appointment', function(){
        console.log($(this ).attr('name'));
        console.log($(this ).text());
    })
} );