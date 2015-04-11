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
            window.location.href = "/";
        } else
        {
            $.each( objJSON, function ( key, val )
            {
                $('.' + key).html(val);
            } )
        }
    } )
}
