$( document ).ready( function ()
{
    $('.glyphicon-remove').on('click', function(){
          var userId = $(this ).attr('name');
        if (confirmDelete()) {
            deleteUser('index.php?page=AdminEmployees&action=delete&userId=', userId);
        }
    })

    $('.newUserButton').on('click', function(){
        newUser('index.php?page=AdminEmployees&action=add');
    })

    $('.userName').hover(function(){
        $( this ).append( $( '<span class="glyphicon glyphicon-envelope" aria-hidden="true"></span>' ) );
    }, function() {
        $( this ).find( "span:last" ).remove();}
    )
});
