function validateEmail(email)
{
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

function init_cufon(){
  Cufon.replace('h3, .button, footer a', { fontFamily: 'Gotham Rounded Medium' });
	Cufon.replace('p', { fontFamily: 'Gotham Rounded Light' });
	Cufon.replace('.cufon', { fontFamily: 'Gotham Rounded Light' });
}


function load_videos(json_url){
  $.getJSON(json_url, function(json_data) {
    var items = [];
    $.each(json_data, function(key, val) {
      var video ='<div class="s-item clearfix" id="video-'+ json_data[key].id + '"><div class="si-thumb"><img src="'+ json_data[key].poster.avatar_url + '"/></div><div class="si-info"><h3>TODO: WE NEED THE VIDEO TITLE</h3><p><span class="icon ' +json_data[key].video.service.split('.',1) + '">TODO: Shared on Facebook</span> <span class="friend-name"><a href="#" target="_blank">' + json_data[key].poster.display_name + '</a></span></p></div><div class="si-more"></div></div>';
      items.push(video);
    });
    var tmp = items.join('');
    $('#stream').html(tmp);
  });
}





init_cufon();

/************************************************************************************
DOCUMENT READY
************************************************************************************/


$(document).ready(function(){

  load_videos('videos.json');

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

});