$( document ).ready( function ()
{
    var today = new Date();
    var dayBegin = 'Monday begin';
    var firstDayOfWeekOfMonth = '';
    var month = '';
    var year = '';
    var dayOfWeek = '';
    var vfirstDayInMS = '';
    var lastDayOfMothInMS = '';
    var msInDay = 1000 * 60 * 60 * 24;
    firstDayInMS( today );


    function setMonthAndYear( curDate )
    {
        Date.prototype.getMonthName = function ()
        {
            var monthN = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
            return monthN[ this.getMonth() ];
        }
        $( '#monthYear' ).html( new Date( curDate ).getMonthName() + '  ' + curDate.getFullYear() );
        today = curDate;
    }

    function firstDayInMS( inputData )
    {
        $( '#calendarTable' ).empty();
        var date = new Date( inputData ); //console.log('Today is: ' + date);
        setMonthAndYear( date );
        dayOfWeek = date.getDay(); //console.log('Day of a week: ' + dayOfWeek);   
        var day = date.getDate(); //console.log('Date of month: ' + day);  
        month = date.getMonth(); //console.log('Month: ' + day);   
        year = date.getFullYear(); //console.log('Year: ' + year);  
        var firstDayOfMonth = new Date( year, month, 1 );
        var daysInMonth = 32 - new Date( year, month, 32 ).getDate(); //console.log('Year: ' + daysInMonth);
        lastDayOfMothInMS = new Date( year, month, daysInMonth ).getTime(); //console.log('Year: ' + lastDayOfMothInMS);
        firstDayOfWeekOfMonth = firstDayOfMonth.getDay(); //console.log('Day of a week of 1st: ' + firstDayOfWeekOfMonth);  
        vfirstDayInMS = new Date( year, month, 1 ).getTime(); //console.log('First Day in miliseconds: ' + vfirstDayInMS);
        var firstDateInCalendar = startDateInCalendar( firstDayOfWeekOfMonth, vfirstDayInMS );
        buildTable( firstDateInCalendar );
    }

    function startDateInCalendar( firstDate, firstDayInMS )
    {
        var startDate;
        if ( dayBegin == 'Monday begin' )
        {
            if ( firstDayOfWeekOfMonth == 1 )
            {
                startDate = firstDayInMS - (msInDay * 7);
            } else if ( firstDayOfWeekOfMonth == 0 )
            {
                startDate = (firstDayInMS) - (msInDay * 6);
            } else
            {
                startDate = firstDayInMS - (msInDay * (dayOfWeek - 1));
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
                startDate = firstDayInMS - (msInDay * (dayOfWeek));
            }
        }
        return startDate;
    }

    function buildTable( startDateBuild )
    {
        var dateIncr = startDateBuild;
        var headData;
        if ( dayBegin == 'Monday begin' )
        {
            headData = '<tr>' +
            '<th>Monday</th>' +
            '<th>Tuesday</th>' +
            '<th>Wednesday</th>' +
            '<th>Thursday</th>' +
            '<th>Friday</th>' +
            '<th>Saturday</th>' +
            '<th>Sunday</th></tr>';
        } else
        {
            headData = '<tr>' +
            '<th>Sunday</th>' +
            '<th>Monday</th>' +
            '<th>Tuesday</th>' +
            '<th>Wednesday</th>' +
            '<th>Thursday</th>' +
            '<th>Friday</th>' +
            '<th>Saturday</th></tr>';
        }
        $( '#calendarTable' ).append( headData );
        $.ajax( {
            url   : 'models/getSchedules.php?start=' + vfirstDayInMS + '&end=' + lastDayOfMothInMS,
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
                    if ( dayBegin == 'Monday begin' )
                    {
                        if ( dateIncr < vfirstDayInMS || dateIncr > lastDayOfMothInMS )
                        {
                            outputTD += "<td class='tdHead inactiveDay'><div><p>&nbsp" +
                            /*new Date( dateIncr ).getDate() + "</p><p><select><option>" + "%" +
                             new Date( dateIncr ).getDate() + "%" + "</option></select>*/"</p></div></td>";

                        } else if ( j == 5 || j == 6 )
                        {
                            outputTD += "<td class='tdHead inactiveDay weekend'><div><p class='dayOfWeek'>" +
                            new Date( dateIncr ).getDate() + /*+ "</p><p><select><option>" + "%" +
                             new Date( dateIncr ).getDate() + "%" + "</option></select>*/"</p></div></td>";
                        }
                        else
                        {
                            outputTD += "<td class='tdHead'><div><span class='dayOfWeek'>" + new Date( dateIncr ).getDate() +
                            "</span><div class='ulWrapper'><ul>" + listSchedules( objJSON, dateIncr ) +
                            "</ul></div></div></td>";
                        }
                        dateIncr += msInDay;
                    } else
                    {
                        if ( dateIncr < vfirstDayInMS || dateIncr > lastDayOfMothInMS )
                        {
                            outputTD += "<td id='inactiveDay' class='tdHead'><div><p>&nbsp" + /*new Date( dateIncr ).getDate() + "</p><p><select><option>" + "%" + new Date( dateIncr ).getDate() + "%" + "</option></select>*/"</p></div></td>";

                        } else if ( j == 0 || j == 6 )
                        {
                            outputTD += "<td id='inactiveDay' class='tdHead'><div><p>" + new Date( dateIncr ).getDate() + /*"</p><p><select><option>" + "%" + new Date( dateIncr ).getDate() + "%" + "</option></select>*/"</p></div></td>";

                        }
                        else
                        {
                            outputTD += "<td class='tdHead'><div><p id='pWithDate'>" + new Date( dateIncr ).getDate() + "</p><p><select><option>" + "%" + new Date( dateIncr ).getDate() + "%" + "</option></select></p></div></td>";

                        }
                        dateIncr += msInDay;
                    }
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
            dayBegin = 'Sunday begin';
        } else
        {
            $( '#weekBegin' ).text( 'Sunday begin' );
            dayBegin = 'Monday begin';
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
                    if ( new Date( parseInt( val ) ).getMonth() == new Date( currentDay ).getMonth() && new Date( parseInt( val ) ).getDate() == new Date( currentDay ).getDate() )
                    {
                        res += '<li><a>' + new Date( parseInt( val ) ).getHours() + ':' + twoDigitsInMinutes(new Date( parseInt( val )) ) + ' - ';
                    }
                } else if(key == 'end_time_ms'){
                    if ( new Date( parseInt( val ) ).getMonth() == new Date( currentDay ).getMonth() && new Date( parseInt( val ) ).getDate() == new Date( currentDay ).getDate() )
                    {
                        res += new Date( parseInt( val ) ).getHours() + ':' + twoDigitsInMinutes(new Date( parseInt( val ) )) + '</a></li>';
                    }
                }
            } );
        } );
        return res;
    }

} );