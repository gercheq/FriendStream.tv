/*
** FriendStream.TV User Interactions
**
** Author:    Gercek Karakus
** Date:      March 08, 2011
**
*/


function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return email.match(re)
}

function submit_form(){

  $("#facebox #submit-email").attr('disabled','disabled');

  $.ajax({
     type: "POST",
     url: post_url_from_home,
     data: {
       email: $('#facebox #input-email').attr('value')
     },
     success: function(msg){
       $('#facebox #modal-contact-form .inner').html('<h3>Thank You!</h3><p>We will send you an invite as soon as possible.</p>');
       init_cufon();
     }
  });
}

function check_errors(){
  if( validateEmail($('#facebox #input-email').attr('value')) ){
    $('#facebox .error-msg').fadeOut();
    $("#facebox #input-email").removeClass('error');
  }
}

function display_errors(){
  // display errors
  if( !$("#facebox #input-email").hasClass('error') ){
    $("#facebox #input-email").addClass('error').after('<p class="error-msg">Please enter a valid email address.</p>');
  }

  // check if the errors are fixed
  $("#facebox #input-email").keyup(function(){
    check_errors();
  });

  $("#facebox #input-email").blur(function(){
    check_errors();
  });
}


/**************************************************************
** Setup Stream Panel
***************************************************************/
function setup_stream_panel() {

  var $stream_container = $('#stream-container');
  $stream_container.animation_speed = '300';
  $stream_container.width_large = $stream_container.width();
  $stream_container.width_small = '30px';

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

  /*
  ** Stream Panel On HOVER
  */
  $s_items.live('mouseover mouseout', function(event) {
    if (event.type == 'mouseover') {
      $(this).addClass('s-hover');
    } else {
      $(this).removeClass('s-hover');
    }
  });

  /*
  ** Stream Item On CLICK
  */
  $s_items.live('click',function(event){
    $this = $(this);
    $video_container = $('#video-container');

    // Add .selected to currently clicked element
    $('.selected', $stream_container).removeClass('selected');
    $this.addClass('selected');

    // Update the embed code
    var video_id = $this.find('.siv-id').html();
    var video_provider = $this.find('.siv-provider').html();
    var embed_code = generate_embed_code(video_provider, video_id);
    $video_container.find('#video-embed').html(embed_code);

    // Update user details
    var video_title = $this.find('.siv-title').html();
    var video_service = $this.find('.friend-provider').html().split('.',1);
    var friend_avatar = $this.find('.friend-avatar').html();
    var friend_name = $this.find('.friend-name').html();
    var friend_message = $this.find('.friend-message').html();

    $video_container.find('h3').html(video_title);
    // WTF - The code below is not working.
    // video_service is assigned correctly but
    // class is not getting added to the p element :/
    // alert(video_service);
    // $video_container.find('.metadata').addClass(video_service);
    $video_container.find('.avatar').html(friend_avatar);
    $video_container.find('blockquote').html(friend_message);
    $video_container.find('.friend-name').html(friend_name);

  });
}

function show_first_video() {
  $('.s-item').eq(0).click();
}


/**************************************************************
** Setup Modals
***************************************************************/
function setup_private_beta_modals() {

  $('a[rel*=facebox]').facebox({
    loadingImage : 'css/images/loading.gif',
    closeImage   : 'css/images/closelabel.png'
  });

  $(document).bind('reveal.facebox', function() {
    init_cufon();

    $("#facebox #submit-email").live('click', function(){
      if( validateEmail($('#facebox #input-email').attr('value')) ){
        submit_form();
      } else {
        display_errors();
      }
      return false;
    });
  });

}

/**************************************************************
** Layout Manager
***************************************************************/
function calculate_dimensions(){
  var $window = $(window);
  var $video_container = $('#video-container');
  var $stream_container = $('#stream-container');
  var $stream = $('#stream');
  var $navigation = $('#navigation');
  var $logo = $('#logo');
  var $video_embed_shadow = $('#video-embed-shadow');
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
  var video_embed_height = $video_container.outerHeight() - $video_details.outerHeight(true);
  $video_embed.css({
    'height' : video_embed_height
  });

  //Setup #video-embed-shadow
  $video_embed_shadow.css({
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


/**************************************************************
** Text Replacement - Cufon
***************************************************************/
function init_cufon(){
  Cufon.replace('#home h3, .button, footer a', { fontFamily: 'Gotham Rounded Medium' });
	Cufon.replace('#home p', { fontFamily: 'Gotham Rounded Light' });
	Cufon.replace('.cufon', { fontFamily: 'Gotham Rounded Medium' });
}


/**************************************************************
** Setup Video Stream
***************************************************************/
/*
    {
        "poster": {
            "ident": "22915745",
            "display_name": "Kenneth Kufluk",
            "service": "twitter.com",
            "avatar_url": "http://a3.twimg.com/profile_images/1224766800/i_really_need_a_haircut_shave_newshirt_normal.jpg"
        },
        "message": "Current status: http://t.co/ltgYjyB (NSFW)",
        "video": {
            "ident": "RJC8pJ7xbB0",
            "service": "youtube.com"
        },
        "id": 30,
        "posted": "2011-03-09T00:45:47"
    }
*/
var video_json;

function load_videos(json_url){

  $.getJSON(json_url, function(json_data) {
    video_json = json_data;
    var items = [];
    $.each(json_data, function(key, val) {

      // clean up twitter avatar_url
      if (json_data[key].poster.service == "twitter.com"){
        var avatar_url_small = json_data[key].poster.avatar_url;
        var avatar_url = avatar_url_small.replace("_normal", "_reasonably_small");
      } else {
        var avatar_url = json_data[key].poster.avatar_url;
      }

      var video ='<div class="s-item clearfix ' + json_data[key].poster.service.split('.',1) + '" id="video-'+ json_data[key].id + '">\
                    <div class="si-thumb"><img src="css/images/video_thumb_default.jpg"/></div>\
                    <div class="si-info">\
                      <div class="si-video">\
                        <h3 class="siv-title">Video Title</h3>\
                        <div class="siv-desc hidden">Video Description</div>\
                        <div class="siv-id hidden">' + json_data[key].video.ident + '</div>\
                        <div class="siv-provider hidden">' + json_data[key].video.service + '</div>\
                      </div>\
                      <div class="si-user">\
                        <span class="icon"></span> \
                        <span class="friend-name ' + json_data[key].poster.ident + '">' + json_data[key].poster.display_name + '</span>\
                        <div class="hidden friend-avatar">\
                          <img src="' +  avatar_url + '">\
                        </div>\
                        <div class="hidden friend-provider">' + json_data[key].poster.service + '</div>\
                        <div class="hidden friend-message">' +  json_data[key].message + '</div>\
                      </div>\
                    </div>\
                  </div>';
      items.push(video);
    });

    var tmp = items.join('');
    $('#stream').html(tmp);

    // Get video details for each video in the stream from APIs
    $('.s-item').each(function(){
      get_video_details($(this));
    });

    // Show the first video
    show_first_video();

  });
}

/*
** Generate embed code from video_provider name and video_id
** Embed code is going to be included in the #video-container
*/
function generate_embed_code(video_provider, video_id){

  var embed_code = "";

  if (video_provider == "youtube.com") {
    embed_code = '<iframe title="YouTube video player" width="100%" height="100%" src="http://www.youtube.com/embed/' + video_id + '" frameborder="0" allowfullscreen></iframe>';
  } else if (video_provider == "vimeo.com") {
    embed_code = '<iframe src="http://player.vimeo.com/video/' + video_id + '?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=1"  width="100%" height="100%" frameborder="0"></iframe>';
  }

  return embed_code;
}


/*
** Get video details such as thumbnail, title, description
** from respective APIs. Currently supporting only Youtube and Vimeo
*/
function get_video_details($stream_video) {

  var video_id = $stream_video.find('.siv-id').html();
  var video_provider = $stream_video.find('.siv-provider').html();

  if (video_provider == "youtube.com"){
    var url = "http://gdata.youtube.com/feeds/api/videos/" + video_id + "?v=2&alt=json"
    $.get(url, function(data) {
        $stream_video.find('h3').html( data.entry.title.$t );
        $stream_video.find('.siv-desc').html( data.entry.media$group.media$description.$t );
        $stream_video.find('.si-thumb img').attr('src', data.entry.media$group.media$thumbnail[0].url );
    });
  } else if (video_provider == "vimeo.com") {
    var url =  "http://vimeo.com/api/v2/video/" + video_id + ".json?callback=?";

    $.getJSON(url, {format: "json"}, function(data) {
        $stream_video.find('h3').html( data[0].title);
        $stream_video.find('.siv-desc').html( data[0].description );
        $stream_video.find('.si-thumb img').attr('src', data[0].thumbnail_small);
    });
  }
}


/*
** DEPRECATED
**
function get_thumbnail(video_provider, video_id, size)
{
  if (video_id === null){ return ""; }

  size = (size === null) ? "small" : size;

  if (video_provider == "youtube.com") {
    if(size == "small"){
      return "http://img.youtube.com/vi/" + video_id + "/2.jpg";
    } else {
      return "http://img.youtube.com/vi/" + video_id + "/0.jpg";
    }
  } else if (video_provider == "vimeo.com") {
    return "no vimeo support"
  }
}
*/


/**************************************************************
** DOCUMENT READY
***************************************************************/
$(document).ready(function(){
  init_cufon();

  // App
  setup_stream_panel();
  calculate_dimensions();
  load_videos('videos.json');

  // Home
  setup_private_beta_modals();

});

/**************************************************************
** ON WINDOW RESIZE
***************************************************************/
$(window).resize(function() {
  calculate_dimensions();
});