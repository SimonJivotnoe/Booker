$( document ).ready( function ()
{
    var today = new Date();
    if ( localStorage.getItem( 'settings' ) == null )
    {console.log('if');
        localStorage[ 'settings' ] = JSON.stringify( [ { "start day of week": 'Monday begin'} ] );
        $( '#weekBegin' ).text( 'Sunday begin' );
    } else {
        if ('Sunday begin' == lScomm()) {
            $( '#weekBegin' ).text( 'Monday begin' );
        } else {
            $( '#weekBegin' ).text( 'Sunday begin' );
        }
    }
    var firstDayOfWeekOfMonth = '';
    var month = '';
    var year = '';
    var dayOfWeek = '';
    var vfirstDayInMS = '';
    var lastDayOfMothInMS = '';
    var daysInMonth = '';
    var msInDay = 1000 * 60 * 60 * 24;
    firstDayInMS( today );
    console.log('here');

    function firstDayInMS( inputData )
    {
        $( '#calendarTable' ).empty();
        var date = new Date( inputData ); //console.log('Today is: ' + date);
        var monthName = GetMonthName(date.getMonth());
        $( '#monthYear' ).html( monthName + '  ' + date.getFullYear() );
        today = date;
        dayOfWeek = date.getDay(); //console.log('Day of a week: ' + dayOfWeek);
        var day = date.getDate(); //console.log('Date of month: ' + day);  
        month = date.getMonth(); //console.log('Month: ' + day);   
        year = date.getFullYear(); //console.log('Year: ' + year);  
        var firstDayOfMonth = new Date( year, month, 1 );
        daysInMonth = 32 - new Date( year, month, 32 ).getDate(); //console.log('Year: ' + daysInMonth);
        lastDayOfMothInMS = new Date( year, month, daysInMonth ).getTime(); //console.log('Year: ' + lastDayOfMothInMS);
        firstDayOfWeekOfMonth = firstDayOfMonth.getDay(); //console.log('Day of a week of 1st: ' + firstDayOfWeekOfMonth);
        vfirstDayInMS = new Date( year, month, 1 ).getTime(); //console.log('First Day in miliseconds: ' + vfirstDayInMS);
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
        if ( lScomm() == 'Monday begin' )
        {
            headData += buildHead(lScomm());

        } else
        {
            headData += buildHead(lScomm());
        }
        $( '#calendarTable' ).append( headData );
        $.ajax( {
            url   : 'index.php?page=ajaxcalendarbuilder&start=' + vfirstDayInMS + '&end=' + lastDayOfMothInMS,
            method: 'GET'
        } ).then( function ( data )
        {
            var objJSON = JSON.parse( data );
            for ( var i = 0; i <= 5; i ++ )
            {
                var output = "<tr>";
                var outputTD = '';
                var outputTDEvent = '';
                for ( var j = 0; j <= 6; j ++ )
                {
                    if ( dateIncr < vfirstDayInMS || dateIncr > lastDayOfMothInMS )
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
                //console.log(output);

                $( '#calendarTable' ).append( output );
            }
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
            //dayBegin = 'Sunday begin';
            localStorage[ 'settings' ] = JSON.stringify( [ { "start day of week": 'Sunday begin'} ] );
        } else
        {
            $( '#weekBegin' ).text( 'Sunday begin' );
            //dayBegin = 'Monday begin';
            localStorage[ 'settings' ] = JSON.stringify( [ { "start day of week": 'Monday begin'} ] );
        }
        firstDayInMS( today );

    } );

    function twoDigitsInMinutes(minutes) {
        var result = ( minutes.getMinutes()<10?'0':'') + minutes.getMinutes();
        return result;
    }

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
                        res += '<li><a>' + new Date( parseInt( val ) ).getHours() + ':' +
                        twoDigitsInMinutes(new Date( parseInt( val )) ) + ' - ';
                    }
                } else if(key == 'end_time_ms'){
                    if ( new Date( parseInt( val ) ).getMonth() == new Date( currentDay ).getMonth() &&
                        new Date( parseInt( val ) ).getDate() == new Date( currentDay ).getDate() )
                    {
                        res += new Date( parseInt( val ) ).getHours() + ':' +
                        twoDigitsInMinutes(new Date( parseInt( val ) )) + '</a></li>';
                    }
                }
            } );
        } );
        return res;
    }
    var curMonth = '';
    var curDate = '';
    var curYear = '';
    $('.bookIt').on('click', function(){
        $('.bookItMonth, .bookItDate, .bookItYear' ).html('');
        var dayStart = today.getDate();
        if (new Date().setHours(0,0,0,0) <= today.setHours(0,0,0,0)) {
            fillDateSelect(month, daysInMonth, dayStart, year );
            curMonth = month;
            curDate = dayStart;
            curYear = year;
        } else {
            curMonth = new Date().getMonth();
            curDate = new Date().getDate();
            curYear = new Date().getFullYear();
            var curLastDay = 32 - new Date( curYear, curMonth, 32 ).getDate();
            fillDateSelect(curMonth, curLastDay, curDate, curYear );
        }
    })
    $('.bookItMonth').change(function(){
        curMonth = $(this).val();
        getListOfDays(curYear, curMonth);
    });
    $('.bookItDate').change(function(){
        curDate = $(this).val();
        console.log(curDate);
    });
    $('.bookItYear').change(function(){
        curYear = $(this).val();
        getListOfDays(curYear, curMonth);
    });

} );