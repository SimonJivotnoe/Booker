$( document ).ready( function ()
{
    $('body').fadeIn(50);
    $( '#err' ).html( '' );
    $('.glyphicon-remove').on('click', function(){
          var userId = $(this ).attr('name');
        if (confirmDelete()) {
            deleteUser('index.php?page=AdminEmployees&action=delete&userId=', userId);
        }
    })

    $('.newUserButton').on('click', function(){
        $( '#err' ).html( '' );
        var name = $('.login').val();
        var pass = $('.pass').val();
        var mail = $('.mail').val();
        newUser('index.php?page=AdminEmployees&action=add', name, pass, mail);
    })

    $('.userName').hover(function(){
        $( this ).append( $( '<span class="glyphicon glyphicon-envelope" aria-hidden="true"></span>' ) );
    }, function() {
        $( this ).find( "span:last" ).remove();}
    )

    $('.save').on('click', function(){
        var errSpan = $(this ).parent().find('.errEdit' );
        errSpan.html( '' );
        var name = $(this).parent().find('.editName').val();
        var pass = $(this).parent().find('.editPass').val();
        var mail = $(this).parent().find('.editEmail').val();
        var user_id = $(this).attr('name');
        editUser('index.php?page=AdminEmployees&action=edit', name, pass, mail, user_id, errSpan);
    })

});
