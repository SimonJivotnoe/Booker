function checkInputs( url )
{
    $.ajax( {
        url   : url,
        method: 'POST',
        data  : $( ".authForm" ).serialize()
    } ).then( function ( data )
    {
        var objJSON = JSON.parse( data );
        console.log(data);
        if ( Object.keys( objJSON ).length == 0 )
        {
            window.location.href = "/index.php";
        } else
        {
            $.each( objJSON, function ( key, val )
            {
                $('.' + key).html(val);
            } )
        }
    } )
}

function deleteUser(url, userId) {
    console.log(url + userId);
    $.ajax( {
        url   : url + userId,
        method: 'GET'
    } ).then( function ( data )
    {
        var objJSON = JSON.parse( data );
        if (objJSON[0]) {
            $('body' ).find('.panel-default[name*='+userId+']' ).empty();
        }
    } )
}
