(function($){

	
	$(document).ready( function(){

		new WOW().init();

		// Invoke the Placeholder plugin
		$('input, textarea').placeholder();

		// Validate newsletter form
		$('<div class="spinner"><div class="square"></div><div class="square"></div><div class="square"></div><div class="square"></div></div>').hide().appendTo('.newsletter');
		$('<div class="success"></div>').hide().appendTo('.newsletter');
		$('#newsletter-form').validate({
			rules: {
				newsletter_email: { required: true, email: true }
			},
			messages: {
				newsletter_email: {
					required: 'Email address is required',
					email: 'Email address is not valid'
				}
			},
			errorElement: 'span',
			errorPlacement: function(error, element){
				error.appendTo(element.parent());
			},
			submitHandler: function(form){
				$(form).hide();
				$('#privacy').hide();
				$('.newsletter').find('.spinner').css({ opacity: 0 }).show().animate({ opacity: 1 });
				$.post($(form).attr('action'), $(form).serialize(), function(data){
					$('.newsletter').find('.spinner').animate({opacity: 0}, function(){
						$(this).hide();
						$('.newsletter').find('.success').show().html('<i class="icon icon-checkmark"></i> Thank you for subscribing!').animate({opacity: 1});
					});
				});
				return false;
			}
		});

		$('#mc_form').ajaxChimp({
			language: 'pix',
			// Replace url with your unique list
    		url: 'http://your-list.us1.list-manage.com/subscribe/post?u=000fff0000fffff000000fff0&id=0f0f0f0f0f0'
		});

		// Mailchimp translation
	    //
	    // Defaults:
	    //'submit': 'Submitting...',
	    //  0: 'We have sent you a confirmation email',
	    //  1: 'Please enter a value',
	    //  2: 'An email address must contain a single @',
	    //  3: 'The domain portion of the email address is invalid (the portion after the @: )',
	    //  4: 'The username portion of the email address is invalid (the portion before the @: )',
	    //  5: 'This email address looks fake or invalid. Please enter a real email address'

	    $.ajaxChimp.translations.pix = {
	      'submit': 'Submitting...',
	      0: '<i class="icon-checkmark2"></i> Thank you! We have sent you a confirmation email',
	      1: '<i class="icon-cross"></i> You must enter a valid e-mail address.',
	      2: '<i class="icon-cross"></i> E-mail address is not valid.',
	      3: '<i class="icon-cross"></i> E-mail address is not valid.',
	      4: '<i class="icon-cross"></i> E-mail address is not valid.',
	      5: '<i class="icon-cross"></i> E-mail address is not valid.'
	    }

	});

})(jQuery);