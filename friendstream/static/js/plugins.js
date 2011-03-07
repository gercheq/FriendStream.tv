/*
** FriendStream.TV User Interactions
**
** Author:    Gercek Karakus
** Date:      March 04, 2011
**
*/

/*
** VALIDATION
*/
function validateEmail(email) {
 var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
 return email.match(re)
}

function submit_form(){

   $("#submit-email").attr('disabled','disabled');

    $.ajax({
       type: "POST",
       url: "dynamic/sendmail.php",
       data: {
         email: $('#input-email').attr('value')
       },
       success: function(msg){
         $('#modal-contact-form .inner').html('<h3>Thank You!</h3><p>We will send you an invite as soon as possible.</p>');

         init_cufon();

       }
    });
}

function check_errors(){
  if( validateEmail($('#input-email').attr('value')) ){
    $('.error-msg').fadeOut();
    $("#input-email").removeClass('error');
  }
}

function display_errors(){
  // display errors
  $("#input-email").addClass('error').after('<p class="error-msg">Please enter a valid email address.</p>');

  // check if the errors are fixed
  $("#input-email").keyup(function(){
    check_errors();
  });

  $("#input-email").blur(function(){
    check_errors();
  });
}

/*
** STREAM PANEL
*/
function setup_stream_panel() {

  var $stream_container = $('#stream-container');
  $stream_container.animation_speed = '300';
  $stream_container.width_large = $stream_container.width();
  $stream_container.width_small = '40px';

  var $wrapper = $('#wrapper');

  var $s_items = $('.s-item');

  // Stream Panel On CLICK
  $('#logo a').click(function(){

    // Close the stream panel if it is already open
    if( $('#stream-container').hasClass('active') ) {
      $stream_container.removeClass('active');
      $stream_container.animate({
          width: $stream_container.width_large
        },
        $stream_container.animation_speed,
        'swing', function(){
          calculate_dimensions();
        });

    } else {

      // Open the stream panel if it is already closed
      $stream_container.animate({
          width: $stream_container.width_small
        },
        $stream_container.animation_speed,
        "swing", function(){
          calculate_dimensions();
        });

      $stream_container.addClass('active');
    }


  });

  // Stream Panel On HOVER
  $s_items.hover(function(){
    $(this).addClass('s-hover');
  }, function(){
    $(this).removeClass('s-hover');
  });

}

/*
** SETUP MODALS
*/
function setup_private_beta_modals() {
	$("#yoxview-3").yoxview({
    allowInternalLinks: true,
    onOpen: function(){

      // Update Fonts in the Modal
      init_cufon();

      $("#submit-email").click( function(){
        if( validateEmail($('#input-email').attr('value')) ){
          submit_form();
        } else {
          display_errors();
        }
        return false;
      });
    }
  });

  // Trigger sign up model if user clicks on the tv and the logo as well
  $('#yoxview-1, #yoxview-2').click(function(){
    $('#yoxview-3').click();
  });
}

/*
** LAYOUT MANAGER
*/
function calculate_dimensions(){
  var $window = $(window);
  var $video_container = $('#video-container');
  var $stream_container = $('#stream-container');
  var $stream = $('#stream');
  var $navigation = $('#navigation');
  var $logo = $('#logo');
  var $video_embed = $('#video-embed');
  var $video_details = $('#video-details');



  // Setup #video-container
  var vc_margin_horizontal = $video_container.outerWidth(true) - $video_container.outerWidth();
  var vc_margin_vertical = $video_container.outerHeight(true) - $video_container.outerHeight();

  var vc_width = $window.width() - $stream_container.outerWidth(true) - vc_margin_horizontal;
  $video_container.css({
    'width' : vc_width,
    'height' : $window.height() - vc_margin_vertical
  });

  // Setup #video-embed
  var video_embed_height = $video_container.outerHeight() - $video_details.outerHeight(true) - vc_margin_vertical;
  $video_embed.css({
    'height' : video_embed_height
  });




  // Setup #stream-container
  $stream_container.css({
    'height' : $window.height()
  });

  // Setup #stream
  var stream_height = $window.height();
  $stream.siblings().each(function(){
    stream_height -= $(this).outerHeight(true);
  });
  $stream.css({
    'height' : stream_height
  });



}


/*
** Text Replacement - Cufon
*/
function init_cufon(){
  // Cufon.replace('h3, .button, footer a', { fontFamily: 'Gotham Rounded Medium' });
	// Cufon.replace('p', { fontFamily: 'Gotham Rounded Light' });
	Cufon.replace('.cufon', { fontFamily: 'Gotham Rounded Light' });
}


/**************************************************************
** DOCUMENT READY
***************************************************************/
$(document).ready(function(){
  init_cufon();
  setup_stream_panel();
  setup_private_beta_modals();
  calculate_dimensions();

});



/**************************************************************
** ON WINDOW RESIZE
***************************************************************/
$(window).resize(function() {
  calculate_dimensions();
});
