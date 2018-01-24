function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

$(document).ready(function(){

	$('#contactForm').submit(function(e){
        e.preventDefault();

        $('.input-wrap:not(.no-error)').addClass('error');
        isvalidate = false;


        if( IsEmail($('#c-account-email').val() )) {
            $('#c-account-email').closest('.input-wrap').removeClass('error');
            isvalidate = true;
        } else {
            isvalidate = false;
        }

        if( !$('#full-name').val() == '') {
            $('#full-name').closest('.input-wrap').removeClass('error');
            isvalidate = true;
        } else {
            isvalidate = false;
        }

        if($('#inquiry-type').val() != 0) {
            $('.contact-options').removeClass('error');
            isvalidate = true;
        } else {
            isvalidate = false;
        }

        if( $('#c-contact-message').val() != ''){
            $('#c-contact-message').closest('.input-wrap').removeClass('error');
            isvalidate = true;
        } else {
            isvalidate = false;
        }

        if( IsEmail($('#c-account-email').val()) && !$('#full-name').val() == '' && $('#c-contact-message').val() != '' && $('#inquiry-type').val() != 0 ) {
            $('.loading-spinner-wrapper').addClass('active');
            //$('#contactForm').submit();

            return false;
        } else {
            e.preventDefault();
        }
    });
});