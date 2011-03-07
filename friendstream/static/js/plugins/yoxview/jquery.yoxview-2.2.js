if (!jQuery.jsonp)
{
	// jquery.jsonp 1.0.4 (c) 2009 Julian Aubourg | MIT License
	// http://code.google.com/p/jquery-jsonp/
	(function($){var x=function(o){return o!==undefined&&o!==null;},H=$("head"),Z={},K={callback:"C",url:location.href};$.jsonp=function(d){d=$.extend({},K,d);if(x(d.beforeSend)){var t=0;d.abort=function(){t=1;};if(d.beforeSend(d,d)===false||t)return d;}
	var _="",y="success",n="error",u=x(d.url)?d.url:_,p=x(d.data)?d.data:_,s=(typeof p)=="string",k=function(f){setTimeout(f,1);},S,P,i,j,U;p=s?p:$.param(p);x(d.callbackParameter)&&(p+=(p==_?_:"&")+escape(d.callbackParameter)+"=?");!d.cache&&!d.pageCache&&(p+=[(p==_?_:"&"),"_xx",(new Date()).getTime(),"=",1].join(_));S=u.split("?");if(p!=_){P=p.split("?");j=S.length-1;j&&(S[j]+="&"+P.shift());S=S.concat(P);}
	i=S.length-2;i&&(S[i]+=d.callback+S.pop());U=S.join("?");if(d.pageCache&&x(Z[U])){k(function(){if(x(Z[U].e)){x(d.error)&&d.error(d,n);x(d.complete)&&d.complete(d,n);}else{var v=Z[U].s;x(d.dataFilter)&&(v=d.dataFilter(v));x(d.success)&&d.success(v,y);x(d.complete)&&d.complete(d,y);}});return d;}
	var f=$("<iframe />");H.append(f);var F=f[0],W=F.contentWindow||F.contentDocument,D=W.document;if(!x(D)){D=W;W=D.getParentNode();}
	var w,e=function(_,m){d.pageCache&&!x(m)&&(Z[U]={e:1});w();m=x(m)?m:n;x(d.error)&&d.error(d,m);x(d.complete)&&d.complete(d,m);},t=0,C=d.callback,E=C=="E"?"X":"E";D.open();W[C]=function(v){t=1;d.pageCache&&(Z[U]={s:v});k(function(){w();x(d.dataFilter)&&(v=d.dataFilter(v));x(d.success)&&d.success(v,y);x(d.complete)&&d.complete(d,y);});};W[E]=function(s){(!s||s=="complete")&&!t++&&k(e);};w=function(){W[E]=undefined;W[C]=undefined;try{delete W[E];}catch(_){}
	try{delete W[C];}catch(_){}
	D.open()
	D.write(_);D.close();f.remove();}
	k(function(){D.write(['<html><head><script src="',U,'" onload="',E,'()" onreadystatechange="',E,'(this.readyState)"></script></head><body onload="',E,'()"></body></html>'].join(_));D.close();});d.timeout>0&&setTimeout(function(){!t&&e(_,"timeout");},d.timeout);d.abort=w;return d;}
	$.jsonp.setup=function(o){$.extend(K,o);};})(jQuery);
}

if (!jQuery().flash)
{
	// jQuery SWFObject v1.1.1 MIT/GPL @jon_neal
	// http://jquery.thewikies.com/swfobject
	(function(f,h,i){function k(a,c){var b=(a[0]||0)-(c[0]||0);return b>0||!b&&a.length>0&&k(a.slice(1),c.slice(1))}function l(a){if(typeof a!=g)return a;var c=[],b="";for(var d in a){b=typeof a[d]==g?l(a[d]):[d,m?encodeURI(a[d]):a[d]].join("=");c.push(b)}return c.join("&")}function n(a){var c=[];for(var b in a)a[b]&&c.push([b,'="',a[b],'"'].join(""));return c.join(" ")}function o(a){var c=[];for(var b in a)c.push(['<param name="',b,'" value="',l(a[b]),'" />'].join(""));return c.join("")}var g="object",m=true;try{var j=i.description||function(){return(new i("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version")}()}catch(p){j="Unavailable"}var e=j.match(/\d+/g)||[0];f[h]={available:e[0]>0,activeX:i&&!i.name,version:{original:j,array:e,string:e.join("."),major:parseInt(e[0],10)||0,minor:parseInt(e[1],10)||0,release:parseInt(e[2],10)||0},hasVersion:function(a){a=/string|number/.test(typeof a)?a.toString().split("."):/object/.test(typeof a)?[a.major,a.minor]:a||[0,0];return k(e,a)},encodeParams:true,expressInstall:"expressInstall.swf",expressInstallIsActive:false,create:function(a){if(!a.swf||this.expressInstallIsActive||!this.available&&!a.hasVersionFail)return false;if(!this.hasVersion(a.hasVersion||1)){this.expressInstallIsActive=true;if(typeof a.hasVersionFail=="function")if(!a.hasVersionFail.apply(a))return false;a={swf:a.expressInstall||this.expressInstall,height:137,width:214,flashvars:{MMredirectURL:location.href,MMplayerType:this.activeX?"ActiveX":"PlugIn",MMdoctitle:document.title.slice(0,47)+" - Flash Player Installation"}}}attrs={data:a.swf,type:"application/x-shockwave-flash",id:a.id||"flash_"+Math.floor(Math.random()*999999999),width:a.width||320,height:a.height||180,style:a.style||""};m=typeof a.useEncode!=="undefined"?a.useEncode:this.encodeParams;a.movie=a.swf;a.wmode=a.wmode||"opaque";delete a.fallback;delete a.hasVersion;delete a.hasVersionFail;delete a.height;delete a.id;delete a.swf;delete a.useEncode;delete a.width;var c=document.createElement("div");c.innerHTML=["<object ",n(attrs),">",o(a),"</object>"].join("");return c.firstChild}};f.fn[h]=function(a){var c=this.find(g).andSelf().filter(g);/string|object/.test(typeof a)&&this.each(function(){var b=f(this),d;a=typeof a==g?a:{swf:a};a.fallback=this;if(d=f[h].create(a)){b.children().remove();b.html(d)}});typeof a=="function"&&c.each(function(){var b=this;b.jsInteractionTimeoutMs=b.jsInteractionTimeoutMs||0;if(b.jsInteractionTimeoutMs<660)b.clientWidth||b.clientHeight?a.call(b):setTimeout(function(){f(b)[h](a)},b.jsInteractionTimeoutMs+66)});return c}})(jQuery,"flash",navigator.plugins["Shockwave Flash"]||window.ActiveXObject);
}

if (typeof Yox == "undefined")
Yox={addStylesheet:function(a,b){var d=a.createElement("link");d.setAttribute("rel","Stylesheet");d.setAttribute("type","text/css");d.setAttribute("href",b);a.getElementsByTagName("head")[0].appendChild(d)},compare:function(a,b){function d(g){var h=0,i;for(i in g)i!=null&&h++;return h}if(typeof a!=typeof b)return false;else if(typeof a=="function")return a==b;if(d(a)!=d(b))return false;for(var e in a){var c=a[e],f=b[e];if(typeof c!=typeof f)return false;if(c&&c.length&&c[0]!==undefined&&c[0].tagName){if(!f||
f.length!=c.length||!f[0].tagName||f[0].tagName!=c[0].tagName)return false}else if(typeof c=="function"||typeof c=="object"){c=Yox.compare(c,f);if(!c)return c}else if(c!=f)return false}return true},hasProperties:function(a){var b=false;for(pName in a){b=true;break}return b},dataSources:[],fitImageSize:function(a,b,d,e){var c={width:a.width,height:a.height};if(a.width>b.width||d&&a.width<b.width){c.height=Math.round(b.width/a.width*a.height);c.width=b.width}if(!e&&c.height>b.height){c.width=Math.round(b.height/
c.height*c.width);c.height=b.height}else if(e&&c.height<b.height&&(b.height<=a.height||d)){c.height=b.height;c.width=Math.round(b.height/a.height*a.width)}return c},flashVideoPlayers:{jwplayer:function(a,b,d,e,c){a={swf:a||"/jwplayer/player.swf",flashVars:{file:b,image:d,stretching:"fill",title:e,backcolor:"000000",frontcolor:"FFFFFF"}};$.extend(a.flashVars,c);return a}},getDataSourceName:function(a){for(dataSourceIndex in Yox.Regex.data)if(a.match(Yox.Regex.data[dataSourceIndex]))return dataSourceIndex;
return null},getPath:function(a){for(var b=document.getElementsByTagName("script"),d=0;d<b.length;d++){var e=b[d].src.match(a);if(e)return e[1]}return null},getTopWindow:function(){var a=window;if(window.top)a=window.top;else for(;a.parent;)a=a.parent;return a},getUrlData:function(a){a=a.match(Yox.Regex.url);if(!a)return null;var b={path:a[1],anchor:a[3]};if(a[2])b.queryFields=this.queryToJson(a[2]);return b},hex2rgba:function(a,b){a=parseInt(a.replace("#","0x"),16);return"rgba("+((a&16711680)>>16)+
", "+((a&65280)>>8)+", "+(a&255)+", "+(typeof b!="undefined"?b:"1")+")"},queryToJson:function(a){if(!a)return null;a=a.split("&");for(var b={},d=0;d<a.length;d++){var e=a[d].split("=");if(e.length==2)b[e[0]]=e[1]}return b},loadDataSource:function(a,b){var d;if(a.dataUrl)(d=Yox.getDataSourceName(a.dataUrl))&&$.extend(a,{dataSource:dataSourceIndex});if(a.dataSource&&!Yox.dataSources[d])$.ajax({url:a.dataFolder+a.dataSource+".js",async:false,dataType:"script",success:function(e){eval(e);eval("Yox.dataSources['"+
a.dataSource+"'] = new yox_"+a.dataSource+"();");b(Yox.dataSources[a.dataSource])},error:function(e,c,f){console.log(e,c,f)}});else b&&b()},Regex:{data:{picasa:/http:\/\/(?:www\.)?picasaweb\.google\..*/i,flickr:/http:\/\/(?:www\.)?flickr.com/i,smugmug:/http:\/\/.*\.smugmug.com/i,youtube:/^http:\/\/(?:www\.)?youtube.com\//},flash:/^(.*\.(swf))(\?[^\?]+)?/i,flashvideo:/^(.*\.(flv|f4v|f4p|f4a|f4b|aac))(\?[^\?]+)?/i,image:/^[^\?#]+\.(?:jpg|jpeg|gif|png)$/i,url:/^([^#\?]*)?(?:\?([^\?#]*))?(?:#([A-Za-z]{1}[A-Za-z\d-_\:\.]+))?$/,
video:{youtube:/.*youtube.com\/watch.*(?:v=[^&]+).*/i,vimeo:/vimeo.com\/\d+/i,hulu:/hulu.com\/watch\//i,viddler:/viddler.com\//i,flickr:/.*flickr.com\/.*/i,myspace:/.*vids.myspace.com\/.*/i,qik:/qik.com/i,revision3:/revision3.com/i,dailymotion:/dailymotion.com/i,"5min":/.*5min\.com\/Video/i}},Sprites:function(a,b,d){this.spritesImage=(new Image).src=b;var e=0;jQuery.each(a,function(c,f){f.top=e;e+=f.height});this.getSprite=function(c,f,g){return jQuery("<img/>",{src:d,alt:f,title:g,css:{width:a[c].width,
height:a[c].height,"background-image":"url("+b+")","background-repeat":"no-repeat","background-position":this.getBackgroundPosition(c,f)}})};this.getBackgroundPosition=function(c,f){return"-"+jQuery.inArray(f,a[c].sprites)*(a[c].width||0)+"px -"+a[c].top+"px"}},Support:{rgba:function(){if(!("result"in arguments.callee)){var a=document.createElement("div"),b=false;try{a.style.color="rgba(0, 0, 0, 0.5)";b=/^rgba/.test(a.style.color)}catch(d){}arguments.callee.result=b}return arguments.callee.result}},
urlDataToPath:function(a){var b=a.path||"";if(a.queryFields&&this.hasProperties(a.queryFields)){b+="?";for(field in a.queryFields)b+=field+"="+a.queryFields[field]+"&";b=b.substring(0,b.length-1)}if(a.anchor)b+="#"+a.anchor;return b}};

// yoxthumbs:
(function(h){function n(d,a){function k(b){var c=f("<a>",{href:b.link,className:a.thumbnailsClass||"yoxthumbs_thumbnail"}),e=jQuery("<img>",{src:b.thumbnailSrc,alt:b.media.alt,title:b.media.title});b.data&&c.data("yoxthumbs",b.data);b.thumbnailDimensions&&e.css({width:b.thumbnailDimensions.width,height:b.thumbnailDimensions.height});e.appendTo(c);if(a.setTitles&&b.media.title)f(a.titlesElement||"<span>",{html:l.title(b.media.title),className:a.titlesClass}).appendTo(c);if(a.setDescriptions&&b.media.description)f(a.descriptionsElement||
"<div>",{html:l.description(b.media.description),className:a.descriptionsClass}).appendTo(c);return c}var i=this;d.data("yoxview")&&d.data("yoxview");var f=jQuery,m=d[0].tagName=="A",l={};this.thumbnails=[];(function(){f.each(["title","description"],function(b,c){var e=a[c+"MaxLength"];l[c]=function(g){return!e||g.length<=e?g:g.substr(0,e)+(a.addEllipsis!==false?"&hellip;":"")}})})();a.images&&f.each(a.images,function(b,c){d.append(k(c))});var o=0,p=m?d:d.find("a:has(img)");f.each(p,function(b,c){var e=
f(c),g=true;if(a.enableOnlyMedia)if(!c.href.match(Yox.Regex.image)){var j=false;for(dataProvider in Yox.Regex.data)if(c.href.match(Yox.Regex.data[dataProvider])){j=true;break}if(!j){j=false;for(videoProvider in Yox.Regex.video)if(c.href.match(Yox.Regex.video[videoProvider])){j=true;break}j||(g=false)}}if(g){e.data("yoxthumbs",f.extend({imageIndex:o++},e.data("yoxthumbs")));i.thumbnails.push(e)}});if(a.thumbsOpacity){this.thumbnails.css("opacity",a.thumbsOpacity);d.delegate("a:has(img)","mouseenter.yoxthumbs",
function(b){if(i.currentSelectedIndex===undefined||f(b.currentTarget).data("yoxthumbs").imageIndex!=i.currentSelectedIndex)f(b.currentTarget).stop().animate({opacity:1},a.thumbsOpacityFadeTime)}).delegate("a:has(img)","mouseout.yoxthumbs",function(b){if(i.currentSelectedIndex===undefined||f(b.currentTarget).data("yoxthumbs").imageIndex!=i.currentSelectedIndex)f(b.currentTarget).stop().animate({opacity:a.thumbsOpacity},a.thumbsOpacityFadeTime)})}if(a.onClick)m?d.bind("click.yoxthumbs",function(b){a.onClick(b);
return false}):d.delegate("a:has(img)","click.yoxthumbs",function(b){if(!f(b.currentTarget).data("yoxthumbs"))return true;a.onClick(b);return false});this.select=function(b){if(this.currentSelectedIndex===undefined||this.currentSelectedIndex!=b){var c=this.thumbnails.eq(b),e=d.data("yoxslide");e&&e.show(c);if(this.currentSelectedIndex!==undefined){e=this.thumbnails.eq(this.currentSelectedIndex);e.removeClass(a.selectedThumbnailClassName);a.thumbsOpacity&&e.animate({opacity:a.thumbsOpacity},a.thumbsOpacityFadeTime)}c.addClass(a.selectedThumbnailClassName);
a.thumbsOpacity&&c.animate({opacity:1},a.thumbsOpacityFadeTime);this.currentSelectedIndex=b}};this.unload=function(b){f.each(this.thumbnails,function(c,e){f(e).removeData("yoxthumbs");b&&f(e).removeData(b)});d.undelegate("a:has(img)","click.yoxthumbs");d.find(".yoxthumbs_thumbnail").remove();m&&d.unbind(".yoxthumbs")}}h.fn.yoxthumbs=function(d){if(this.length==0)return this;if(typeof d!="string"){var a=h.extend({target:null,selectedThumbnailClassName:"selected",thumbsOpacityFadeTime:300,thumbsOpacity:undefined,
prevBtn:undefined,nextBtn:undefined,onClick:undefined,images:undefined,enableOnlyMedia:false},d),k=h(this);k.data("yoxthumbs",new n(k,a))}else if(a=h(this).data("yoxthumbs"))if(h.isFunction(a[d]))a[d].apply(a,Array.prototype.slice.call(arguments,1));else return a[d];return this}})(jQuery);


/*!
 * jquery.yoxview
 * jQuery image gallery viewer
 * http://yoxigen.com/yoxview
 *
 * Copyright (c) 2010 Yossi Kolesnicov
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Date: 13th November, 2010
 * Version : 2.2
 */


(function($){
    if (!$.yoxview)
        $.yoxview = new YoxView();

    $.fn.yoxview = function(options)
    {
        if (this.length != 0)
        {
            if ($.yoxview[options])
                return $.yoxview[options].apply(this, Array.prototype.slice.call(arguments, 1));
            else if (typeof options === 'object' || !options)
                $.yoxview.init(this, options);
            else
              $.error( 'Method ' +  options + ' does not exist on YoxView.' );
        }
        return this;
    };

    $(Yox.getTopWindow()).unload(function(){
        if ($.yoxview)
        {
            $.yoxview.unload();
            delete $.yoxview;
        }
    });

    function YoxView()
    {
        var yoxviewPath = (yoxviewPath || Yox.getPath(/(.*\/)jquery\.yoxview/i));
        var defaults = {
            autoHideInfo: true, // If false, the info bar (with image count and title) is always displayed.
            autoPlay: false, // If true, slideshow mode starts when the popup opens
            backgroundColor: "#000000",
            backgroundOpacity: 0.8,
            buttonsFadeTime: 300, // The time, in milliseconds, it takes the buttons to fade in/out when hovered on. Set to 0 to force the Prev/Next buttons to remain visible.
            cacheBuffer: 5, // The number of images to cache after the current image (directional, depends on the current viewing direction)
            cacheImagesInBackground: true, // If true, full-size images are cached even while the gallery hasn't been opened yet.
            controlsInitialFadeTime: 1500, // The time, in milliseconds, it takes the menu and prev/next buttons to fade in and out when the popup is opened.
            controlsInitialDisplayTime: 1000, // The time, in milliseconds, to display the menu and prev/next buttons when the popup is opened. Set to 0 to not display them by default
            dataFolder: yoxviewPath + "data/",
            defaultDimensions: { // Default sizes for different types of media, in case none was specified
                flash: { width: 720, height: 560 },
                iframe: { width: 1024 }
            },
            flashVideoPlayer: "jwplayer", // The default player for Flash video files
            imagesFolder: yoxviewPath + "images/",
            infoBackColor: "#000000",
            infoBackOpacity: 0.5,
            isRTL : false, // Switch direction. For RTL languages such as Hebrew or Arabic, for example.
            lang: "en", // The language for texts. The relevant language file should exist in the lang folder.
            langFolder: yoxviewPath + "lang/",
            loopPlay: true, // If true, slideshow play starts over after the last image
            playDelay: 3000, // Time in milliseconds to display each image
            popupMargin: 20, // the minimum margin between the popup and the window
            popupResizeTime: 600, // The time in milliseconds it takes to make the resize transition from one image to the next.
            renderButtons: true, // Set to false if you want to implement your own Next/Prev buttons, using the API.
            renderMenu: true, // Set to false if you want to implement you own menu (Play/Help/Close).
            showBarsOnOpen: true, // If true, displays the top (help) bar and bottom (info) bar momentarily when the popup opens.
            showButtonsOnOpen: true, // If true, displays the Prev/Next buttons momentarily when the popup opens.
            showDescription: true, // Set to false to not show the description text (the title will still show).
            textLinksSelector: ".yoxviewLink", // A jQuery selector to identify links that are not thumbnails, which YoxView should try to open.
            thumbnailsOptions: { thumbnailsClass: "yoxview_thumbnail" }, // Options for thumbnails generated by YoxView
            titleAttribute: "title", // The attribute of an img used for the text in YoxView. Use either "title" or "alt".
            titleDisplayDuration: 2000 // The time in ms to display the image's title, after which it fades out.
        };

        this.infoButtons = {};
        this.isOpen = false;
        this.yoxviewSkins = {};

        var ajaxLoader,
            cacheVars = {},
            cacheImg = new Image(),
            countDisplay,
            ctlButtons, // next and prev buttons
            elementCount = 0,
            currentItemIndex = 0,
            currentLanguage = {},
            currentMaxSize = {},
            currentOptionsSetIndex,
            currentViewIndex = 0,
            currentViewIsInFrame = window != window.parent,
            disableInfo = false,
            flashDefaults = { wmode: "transparent", width: "100%", height: "100%", allowfullscreen: "true", allowscriptaccess: "true", hasVersion: 9 },
            firstImage = true,
            frameOffset,
            helpPanel,
            hideInfoTimeout,
            hideMenuTimeout,
            image1, image2,
            images,
            imagesCount = 0,
            infoPanel,
            infoPanelContent,
            infoPanelLink,
            infoPanelMinHeight = 30,
            infoPanelWrap,
            infoPinLink,
            infoPinLinkImg,
            infoText,
            isFirstPanel = false,
            isImageMode = true,
            isPlaying = false,
            isResizing = false,
            itemVar,
            loadedViews = [],
            loaderTimeout,
            loading = false,
            mediaButtonsSize = {width: 100, height: 100},
            mediaLoader,
            mediaPanelClass = "yoxview_mediaPanel",
            mediaProviderUrls = {
                vimeo: "http://vimeo.com/api/oembed.json",
                myspace: "http://vids.myspace.com/index.cfm?fuseaction=oembed"
            },
            menuHidePosition = -42,
            menuPanel,
            nextBtn,
            notification,
            onOpenCallback,
            options, optionsSets = [],
            panel1, panel2,
	        playBtnText,
            popup,
            popupBackground,
            popupMargins = {}, defaultPopupMargins = {},
            popupTimeout,
            popupWindow = $(Yox.getTopWindow()), // the window in which to create the YoxView popup (for use with frames)
            popupWrap,
            prevBtn,
            resumePlay = false,
            sprites,
            tempImg = new Image(),
            thumbnail,
            thumbnailImg,
            thumbnailPos,
            thumbnailProperties,
            windowDimensions,
            yoxviewLanguages = {},
            keyCodes = {
	            27: 'ESCAPE'
            },
            keyMappings;

        // If the given options object is equal to any in the options set, return the existing set's index. Otherwise, add the new set and return its index:
        function initOptionsSet(options){
            var optionsSetsLength = optionsSets.length;
            for(var i=0; i<optionsSetsLength; i++)
            {
                if (Yox.compare(optionsSets[i], options))
                    return i;
            }

            optionsSets.push(options);
            return optionsSetsLength;
        }

        function getAllowedThumbnailsSelector(options){
            return "a:has(img)" + (options.textLinksSelector !== null ? ",a" + options.textLinksSelector : "");
        }

        this.init = function(views, opt)
        {
            var options = $.extend(true, {}, defaults, opt);
            var optionsSetIndex;
            if (optionsSets.length == 0)
            {
                optionsSets.push(options);
                optionsSetIndex = 0;
            }
            else
                optionsSetIndex = opt ? initOptionsSet(options) : null;

            function loadContents(){
                views.each(function(i, view){
                    view = $(view);
                    var viewIndex = loadedViews.length;

                    view.data("yoxview", {
                        viewIndex : viewIndex,
                        cacheVars: {cachedImagesCount: 0, cacheDirectionForward: true, cacheBufferLastIndex: null, currentCacheImg: 0 }
                    });

                    var viewData = view.data("yoxview");
                    if (optionsSetIndex)
                        viewData.optionsSet = optionsSetIndex;

                    options.allowedImageUrls = [Yox.Regex.image];
                    if (options.allowedUrls)
                        options.allowedImageUrls = options.allowedImageUrls.concat(options.allowedUrls);

                    // First, get image data from thumbnails:
		            var isSingleLink = view[0].tagName == "A";
                    var thumbnails = isSingleLink ? view : view.find(getAllowedThumbnailsSelector(options));

                    var viewImages = [];

                    var imageIndex = 0;
                    thumbnails.each(function(i, thumbnail){
                        var $thumbnail = $(thumbnail);
                        var imageData = getImageDataFromThumbnail($thumbnail, options);
                        if (imageData)
                        {
                            viewImages.push(imageData);
                            if (isSingleLink)
                                $thumbnail.data("yoxview").imageIndex = imageIndex;
                            else
                                $thumbnail.data("yoxview", { imageIndex: imageIndex, viewIndex: viewIndex });
                            imageIndex++;
                        }
                    });

                    if (options.images)
                        viewImages = viewImages.concat(options.images);

                    if (options.dataSource)
                    {
                        Yox.dataSources[options.dataSource].getImagesData(options, function(data){
                            viewImages = viewImages.concat(data.images);
                            viewData.images = viewImages;

                            if (data.title && options.thumbnailsOptions && options.thumbnailsOptions.setHeader){
                                $(options.thumbnailsOptions.headerElement || "<h2>", {
                                    html: data.title,
                                    className: options.thumbnailsOptions.headerClass
                                }).appendTo(view);
                            }
                            var thumbnailsData = data.isGroup
                                ? [$.extend(data, {
                                    media: {
                                        title: data.title + " (" + data.images.length + " images)",
                                        alt: data.title
                                    }
                                })]
                                : data.images;

                            createThumbnails(view, options, isSingleLink ? null : thumbnailsData, !data.createGroups ? null :
                                function(e){
                                    var viewData = $(e.currentTarget).data("yoxview");
                                    var thumbnail = $(e.currentTarget);
                                    var thumbnailData = thumbnail.data("yoxthumbs");
                                    if (!viewData.imagesAreSet)
                                    {
                                        thumbnail.css("cursor", "wait");
                                        var newOptions = $.extend({}, options);

                                        if (!newOptions.dataSourceOptions)
                                            newOptions.dataSourceOptions = thumbnailData;
                                        else
                                            $.extend(newOptions.dataSourceOptions, thumbnailData);

                                        Yox.dataSources[options.dataSource].getImagesData(newOptions, function(data){
                                            viewData.images = data.images;
                                            viewData.imagesAreSet = true;
                                            thumbnail.css("cursor", "");
                                            $.yoxview.open(viewData.viewIndex);
                                        });
                                    }
                                    else
                                    {
                                        $.yoxview.open(viewData.viewIndex);
                                    }
                                }
                            );
				            if (data.createGroups)
				                $.each(view.yoxthumbs("thumbnails"), function(i, thumbnail){
					                thumbnail.data("yoxview", {viewIndex: ++viewIndex});
					                loadedViews.push($(thumbnail));
				                });
                            else
                            {
                                $.each(view.yoxthumbs("thumbnails"), function(i, thumbnail){
                                    var currentViewIndex = imageIndex + i;
                                    var thumbImg = thumbnail.children("img");
                                    if (thumbImg.length == 0)
                                        thumbImg = thumbnail;

                		            viewImages[currentViewIndex].thumbnailImg = thumbImg;
					                thumbnail.data("yoxview", {imageIndex: i, viewIndex: viewIndex });
					            });
				            }
                            if (!$.yoxview.firstViewWithImages && data.images.length > 0)
                            {
                                $.yoxview.firstViewWithImages = view;

                                if (options.cacheImagesInBackground)
                                    $.yoxview.startCache();
                            }
                        });
                    }
                    else
		            {
			            viewData.images = viewImages;
                        createThumbnails(view, options);
		            }

                    loadedViews.push(view);
                    if (!$.yoxview.firstViewWithImages && viewData.images && viewData.images != 0)
                    {
                        $.yoxview.firstViewWithImages = view;
                        loadViewImages(view);

                        if(options.cacheImagesInBackground && imagesCount != 0)
                        {
                            calculateCacheBuffer();
                            cacheImages(0);
                        }
                    }
                });
            }

            // Init external files then proceed:
            loadLanguage(options.lang, function(langData){
                loadSkin(options, function(skin){
                    if (skin && skin.options)
                        $.extend(options, skin.options);

                    Yox.loadDataSource(options, loadContents);
                });
            });
        }

        function loadSkin(options, callback)
        {
            if (options.skin)
            {
                var skinName = options.skin;
                if (!$.yoxview.yoxviewSkins[skinName])
                {
                    var skinUrl = yoxviewPath + "skins/" + skinName + "/yoxview." + skinName;
                    $.ajax({
                        url: skinUrl + ".js",
                        dataType: "script",
                        success: function(data)
                        {
                            if ($.yoxview.yoxviewSkins[skinName].css !== false)
                                Yox.addStylesheet(top.document, skinUrl + ".css");

                            if (callback)
                                callback($.yoxview.yoxviewSkins[skinName]);
                        },
                        error: function(){
                            alert("Error loading skin file " + skinUrl + ".js");
                        }
                    });
                }
                else if (callback)
                    callback($.yoxview.yoxviewSkins[skinName]);
            }
            else if (callback)
                callback($.yoxview.yoxviewSkins[skinName]);
        }

         // Load the language file if not already loaded:
        function loadLanguage(langName, callback)
        {
            if (!yoxviewLanguages[langName])
            {
                yoxviewLanguages[langName] = {};
                var langUrl = yoxviewPath + "lang/" + langName + ".js";
                $.ajax({
                    url : langUrl,
                    async : false,
                    dataType : "json",
                    success: function(data){
                        yoxviewLanguages[langName] = data;
                        if (callback)
                            callback(data);
                    },
                    error: function(){
                        alert("Error loading language file " + langUrl);
                    }
                });
            }
            else if (callback)
                callback(yoxviewLanguages[langName]);
        }

        function resetPopup()
        {
            if (popup)
            {
                popupWrap.remove();
                popup = undefined;
                prevBtn = undefined;
                nextBtn = undefined;
                image1 = undefined;
                image2 = undefined;
			    panel1 = undefined;
			    panel2 = undefined;
                currentItemIndex = 0;
			    $.yoxview.infoButtons = {};
            }
            createPopup();
        }
        function loadViewImages(view)
        {
            var viewData = view.data("yoxview");

            if (!images || currentViewIndex != viewData.viewIndex)
            {
                if (!viewData.cacheVars)
                    viewData.cacheVars = {cachedImagesCount: 0, cacheDirectionForward: true, cacheBufferLastIndex: null, currentCacheImg: 0 };

                images = viewData.images;
                imagesCount = images.length;
                currentViewIndex = viewData.viewIndex;

                var isResetPopup = false;
                var changeOptions = !currentOptionsSetIndex || (currentOptionsSetIndex != viewData.optionsSet);

                if (changeOptions)
                {
                    currentOptionsSetIndex = viewData.optionsSet || 0;
                    options = optionsSets[currentOptionsSetIndex];
                    isResetPopup = true;
                }

                if (options.onLoadImages)
                    options.onLoadImages({ images: images, viewData: viewData });

                else if ((prevBtn && imagesCount == 1) || (popup && !prevBtn && imagesCount > 0))
                    isResetPopup = true;

                if (isResetPopup)
                    resetPopup();

                cacheVars = viewData.cacheVars;
            }
        }

        function getElementDimensions(type, originalDimensions, options)
        {
            var size = originalDimensions && (originalDimensions.width || originalDimensions.height)
                ? { width: parseInt(originalDimensions.width), height: parseInt(originalDimensions.height) }
                : options.defaultDimensions[type];

            if (isNaN(size.width))
                size.width = null;
            if (isNaN(size.height))
                size.height = null;

            return size;
        }
        var supportedTypes = {
            image: function(thumbnail, thumbnailHref, thumbImg, options)
            {
                var imageData = null;
                for(var i=0; i<options.allowedImageUrls.length && !imageData; i++)
                {
                    if (thumbnailHref.match(options.allowedImageUrls[i]))
                    {
                        imageData = {
                            src: thumbnail.attr("href"),
                            title: thumbImg.attr(options.titleAttribute),
                            alt: thumbImg.attr("alt")
                        };
                    }
                }
                return imageData;
            },
            flash: function(thumbnail, thumbnailHref, thumbImg, options)
            {
                var imageData = null;
                var matchFlash = thumbnailHref.match(Yox.Regex.flash);
                var matchFlashVideo = matchFlash ? null : thumbnailHref.match(Yox.Regex.flashvideo);

                if (matchFlash || matchFlashVideo)
                {
                    var urlData = Yox.getUrlData(thumbnailHref);
				    var elementSize = getElementDimensions("flash", urlData.queryFields, options);

				    if (urlData.queryFields)
				    {
					    delete urlData.queryFields.width;
					    delete urlData.queryFields.height;
				    }

                    var flashPanel = $("<div>", {
                        className: "yoxview_element",
                        html: "<div class='yoxview_error'>Please install the latest version of the <a href='http://www.adobe.com/go/getflashplayer' target='_blank'>Flash player</a> to view content</div>"
                    });
                    var flashData = matchFlashVideo
                        ? Yox.flashVideoPlayers[options.flashVideoPlayer](
                            options.flashVideoPlayerPath, urlData.path,
                            (urlData.queryFields && urlData.queryFields.image) ? urlData.queryFields.image :
                                thumbImg[0].nodeName == "IMG" ? thumbImg.attr("src") : null,
                            thumbImg.attr(options.titleAttribute))
                        : urlData.queryFields || {};

                    if (matchFlash)
                        flashData.swf = urlData.path;

                    $.extend(flashData, flashDefaults);

                    flashPanel.flash(flashData);
                    imageData = {
                        "element": flashPanel,
                        title: thumbImg.attr(options.titleAttribute)
                    };
                    $.extend(imageData, elementSize);
                }

                return imageData;
            },
            ooembed: function(thumbnail, thumbnailHref, thumbImg, options)
            {
                var imageData = null;
                for(videoProvider in Yox.Regex.video)
                {
                    if (thumbnailHref.match(Yox.Regex.video[videoProvider]))
                    {
                        imageData = {
                            provider: videoProvider,
                            url: thumbnailHref
                        };
                        break;
                    }
                }
                return imageData;
            },
            inline: function(thumbnail, thumbnailHref, thumbImg, options)
            {
                if (!options.allowInternalLinks)
                    return null;

                var imageData = null;
                var urlData = Yox.getUrlData(thumbnailHref);
                if (urlData && urlData.anchor)
                {
                    var element = $("#" + urlData.anchor);
                    if (element.length != 0)
                    {
                        var elementSize = { width: parseInt(element.css("width")), height: parseInt(element.css("height")) };

                        element.css({
		                    position: "absolute",
		                    top: 0,
		                    left: 0,
		                    width: "100%",
		                    height: "100%",
		                    display: "block"
		                });

                        imageData = {
                            type: "inlineElement",
                            "element": element,
                            title: element.attr("title")
                        };
                        var padding = {
                            horizontal: parseInt(element.css("padding-right")) + parseInt(element.css("padding-left")),
                            vertical: parseInt(element.css("padding-top")) + parseInt(element.css("padding-bottom"))
                        };

                        elementSize.width = isNaN(elementSize.width) ? null : elementSize.width + padding.horizontal;
                        elementSize.height = isNaN(elementSize.height) ? null : elementSize.height + padding.vertical;

                        $.extend(imageData, elementSize);
                        if (padding.horizontal != 0 || padding.vertical != 0)
                            imageData.padding = padding;

                        element.remove();
                    }
                }

                return imageData;
            },
            iframe: function(thumbnail, thumbnailHref, thumbImg, options)
            {
                var imageData = null;
                var thumbnailTarget = thumbnail.attr("target");
                if (thumbnailTarget && thumbnailTarget == "yoxview")
                {
                    var urlData = Yox.getUrlData(thumbnailHref);
                    if (urlData && urlData.path)
                    {
                        var iframeSize = getElementDimensions("iframe", urlData.queryFields, options);
					    if (urlData.queryFields)
					    {
						    delete urlData.queryFields.width;
						    delete urlData.queryFields.height;
                        }
                        imageData = {
                            "element": $("<iframe>", {
                                src: Yox.urlDataToPath(urlData),
                                className: "yoxview_element"
                            }),
                            title: thumbImg.attr("title"),
                            frameborder: "0"
                        }
                        $.extend(imageData, iframeSize);
                    }
                }

                return imageData;
            }
        };
        function getImageDataFromThumbnail(thumbnail, options)
        {
            var imageData = {};
            var thumbnailHref = thumbnail.attr("href");
            var thumbImg = thumbnail.children("img:first");

            if (thumbImg.length == 0)
                thumbImg = thumbnail;

            var imageData = {};
            for (supportedType in supportedTypes)
            {
                var media = supportedTypes[supportedType](thumbnail, thumbnailHref, thumbImg, options);
                if (media)
                {
                    $.extend(media, {
                        contentType: supportedType,
                        elementId: elementCount++
                    });

                    imageData.media = media;
                    break;
                }
            }

            if (!imageData.media)
                return null;

            imageData.thumbnailImg = thumbImg;
            return imageData;
        }

        function createThumbnails(view, options, additionalImages, onClick)
        {
            var clickHandler = function(e){
                var data = $(e.currentTarget).data("yoxview");
                if (!data || data.imageIndex === null)
                    return true;
                else
                {
                    e.preventDefault();
                    $.yoxview.open($(e.liveFired || e.currentTarget).data("yoxview").viewIndex, data.imageIndex);
                }
            };

            if (view[0].tagName == "A")
                view.bind("click.yoxview", clickHandler);
            else if (!additionalImages)
                view.delegate(getAllowedThumbnailsSelector(options), "click.yoxview", clickHandler);
            else
                view.yoxthumbs($.extend({
                    images: additionalImages,
                    enableOnlyMedia: false,
                    onClick: onClick || function(e){
                        e.preventDefault();
				        if (options.thumbnailsOptions && options.thumbnailsOptions.onClick)
                            options.thumbnailsOptions.onClick(
                                $(e.currentTarget).data("yoxview").imageIndex,
                                $(e.currentTarget),
                                $(e.liveFired).data("yoxview").viewIndex);
                        else
                            $.yoxview.open($(e.liveFired || e.currentTarget).data("yoxview").viewIndex,
                                $(e.currentTarget).data("yoxview").imageIndex);

                        return false;
                    }
                }, options.thumbnailsOptions));
        }
        function setThumbnail(setToPopupImage)
        {
            var currentView = loadedViews[currentViewIndex];
            thumbnail = currentView[0].tagName == "A"
                ? currentView
                : images[currentItemIndex].thumbnailImg;

            if (!thumbnail || thumbnail.length == 0)
                thumbnail = images[0].thumbnailImg;

            if (thumbnail)
            {
                var thumbnailSrc = thumbnail.attr("src");

                if (setToPopupImage && image1 && thumbnailSrc)
                    image1.attr("src", thumbnailSrc);

                if (currentViewIsInFrame && !frameOffset && window.name)
                    frameOffset = $(top.document).find("[name='" + window.name + "']").offset();

                thumbnailPos = thumbnail.offset();
                thumbnailProperties = {
                    width: thumbnail.width(),
                    height: thumbnail.height(),
                    top: Math.round(thumbnailPos.top - popupWindow.scrollTop() + (frameOffset ? frameOffset.top : 0)),
                    left: Math.round(thumbnailPos.left  + (frameOffset ? frameOffset.left : 0))
                };
            }
        }

    //    Opens the viewer popup.
    //    Arguments:
    //    viewIndex: The 0-based index of the view to open, in case there are multiple instances of YoxView on the same page. Default is 0.
    //    imageIndex: The 0-based index of the image to open, in the specified view. Default is 0.
    //    callback: A function to call after the gallery has opened.
        this.open = function(viewIndex, initialItemIndex, callback)
        {
            var isJquery = this instanceof jQuery;
            if (isJquery)
            {
                if (viewIndex && typeof(viewIndex) == 'function')
                    callback = viewIndex;

                var itemData = this.data("yoxview");
                viewIndex = itemData.viewIndex;
                initialItemIndex = itemData.imageIndex;
            }
            else if (typeof(viewIndex) == 'function')
            {
                callback = viewIndex;
                viewIndex = initialItemIndex = 0;
            }
            else if (typeof(initialItemIndex) == 'function')
            {
                callback = initialItemIndex;
                initialItemIndex = 0;
            }
            viewIndex = viewIndex || 0;
            initialItemIndex = initialItemIndex || 0;

            $(document).bind('keydown.yoxview', catchPress);

            loadViewImages(loadedViews[viewIndex]);
            if (!popup && imagesCount != 0)
                createPopup();

            $.yoxview.selectImage(initialItemIndex);
            popupWrap.stop().css({ opacity: 0, display: "block" }).animate({ opacity: 1}, "slow", function(){ popupWrap.css("opacity", "") });
            if(options.cacheImagesInBackground)
                cacheImages(initialItemIndex);

            if (callback)
                onOpenCallback = callback;

            return isJquery ? this : false;
        }

        this.selectImage = function(itemIndex)
        {
            $.yoxview.currentImage = images[itemIndex];
            currentItemIndex = itemIndex;

            setThumbnail(true);
            thumbnail.blur();

            panel1.css({
                "z-index" : "1",
                width : "100%",
                height : "100%"
            });
            panel2.css({
                "display" : "none",
                "z-index" : "2"
            });

            firstImage = true;
            popup.css(thumbnailProperties);
            this.select(itemIndex);
        }
        this.refresh = function()
        {
            resumePlay = isPlaying;

            if (isPlaying)
                stopPlay();

            setImage(currentItemIndex);

            if (resumePlay)
                startPlay();
        };

        //var optionsRequiringUpdate =
        this.options = function(opt, value){
            if (!opt)
                return this;

            if (value && typeof(opt) === "string"){
                var pName = opt;
                opt = {};
                opt[pName] = value;
            }
            if (this instanceof jQuery)
            {
                var yoxviewData = this.data("yoxview");
                if (yoxviewData)
                {
                    $.extend(optionsSets[yoxviewData.optionsSet || 0], opt);
                    this.yoxview("update");
                }
                return this;
            }
            else
            {
                $.each(optionsSets, function(i, optionsSet){
                    $.extend(optionsSet, opt);
                });
                $.yoxview.update();
            }
        };

    //    Displays the specified image and shows the (optionally) specified button. Use when the viewer is open.
    //    Arguments:
    //    imageIndex: The 0-based index of the image to display.
    //    pressedBtn: a jQuery element of a button to display momentarily in the viewer.
    //                For example, if the image has been selected by pressing the Next button
    //                on the keyboard, specify the Next button. If no button should be display, leave blank.
        this.select = function(itemIndex, pressedBtn, viewIndex)
        {
            if (typeof pressedBtn === "number")
            {
                viewIndex = pressedBtn;
                pressedBtn = undefined;
            }
            viewIndex = viewIndex || 0;

            if (!isResizing)
            {
                if (itemIndex < 0)
                {
                    itemIndex = imagesCount - 1;
                    if (options.onEnd)
                    {
                        options.onEnd();
                        return;
                    }
                }
                else if (itemIndex == imagesCount)
                {
                    itemIndex = 0;
                    if (options.onEnd)
                    {
                        options.onEnd();
                        return;
                    }
                }
                if (!isPlaying && pressedBtn)
                    flicker(pressedBtn);

                $.yoxview.currentImage = images[itemIndex];
                currentItemIndex = itemIndex;
                setImage(currentItemIndex);

                // Set the cache buffer, if required:
                calculateCacheBuffer();

                // Handle event onSelect:
                if (options.onSelect)
                    options.onSelect(itemIndex, images[itemIndex]);
            }
        }
        this.prev = function(continuePlaying)
        {
            cacheVars.cacheDirectionForward = false;
            this.select(currentItemIndex - 1, prevBtn);
            if (isPlaying && continuePlaying !== true)
                stopPlay();
        }
        this.next = function(continuePlaying)
        {
            cacheVars.cacheDirectionForward = true;
            this.select(currentItemIndex + 1, nextBtn);
            if (isPlaying && continuePlaying !== true)
                stopPlay();
        }
        this.first = function()
        {
            if (!options.disableNotifications)
                longFlicker("first");

            this.select(0);
            if (isPlaying)
                stopPlay();
        };
        this.last = function()
        {
            if (!options.disableNotifications)
                longFlicker("last");

            this.select(imagesCount - 1);
            if (isPlaying)
                stopPlay();
        };
        this.setDefaults = function(options){
            $.extend(true, defaults, options);
        };
        this.play = function()
        {
            if (!this.isOpen || imagesCount == 1)
                return;

            cacheVars.cacheDirectionForward = true;

            if (!isPlaying)
            {
                if (!options.disableNotifications)
                    longFlicker("play");

                startPlay();
            }
            else
            {
                if (!options.disableNotifications)
                    longFlicker("pause");

                stopPlay();
            }
        };
        function flicker(button)
        {
            if (button.css("opacity") == 0)
                button.stop().animate({ opacity : 0 }, options.buttonsFadeTime, fadeOut(button));
        }
        function longFlicker(notificationName)
        {
            notification.css("background-position", sprites.getBackgroundPosition("notifications", notificationName));
            notification.stop().fadeIn(options.buttonsFadeTime, function(){
                $(this).delay(500)
                .fadeOut(options.buttonsFadeTime);
            });
        }
        function fadeIn(button)
        {
            $(button).stop().animate({ opacity : 0 }, options.buttonsFadeTime);
        }
        function fadeOut(button)
        {
            $(button).stop().animate({ opacity : 0.5 }, options.buttonsFadeTime);
        }

        this.close = function()
        {
            if (!this.isOpen)
                return;

            this.closeHelp();
            setThumbnail(false);
            resizePopup(thumbnailProperties, function(){ $.yoxview.isOpen = false; });
            hideMenuPanel();

            if (infoPanel)
                hideInfoPanel(function(){
                    infoText.html("");
                });

            newPanel.animate({
                width: thumbnailProperties.width,
                height: thumbnailProperties.height
            }, options.popupResizeTime, function(){
                newPanel.css("opacity", 1);
            });

		    popupWrap.stop().fadeOut(1000);

		    if (isPlaying)
			    stopPlay();

		    swipePanels();
            if (options.onClose)
                options.onClose();

            $(document).unbind("keydown.yoxview");
            isResizing = false;
        }
        this.help = function()
        {
            if (!this.isOpen)
            return;

            if (helpPanel.css("display") == "none")
                helpPanel.css("display", "block").stop().animate({ opacity : 0.8 }, options.buttonsFadeTime);
            else
                this.closeHelp();
        }
        this.closeHelp = function()
        {
            if (helpPanel.css("display") != "none")
            helpPanel.stop().animate({ opacity: 0 }, options.buttonsFadeTime, function(){
                    helpPanel.css("display", "none");
                });
        }
        this.clickBtn = function(fn, stopPlaying)
        {
            if (stopPlaying && isPlaying)
                stopPlay();

            fn.call(this);
            return false;
        }

        function catchPress(e)
        {
            if ($.yoxview && $.yoxview.isOpen)
            {
                var pK = keyCodes[e.keyCode];
                var calledFunction = $.yoxview[keyMappings[pK]];
                if (calledFunction)
                {
                    e.preventDefault();
                    calledFunction.apply($.yoxview);
                    return false;
                }
                return true;
            }
            return true;
        }

        function createMenuButton(_title, btnFunction, stopPlay)
        {
            var btn = $("<a>", {
                href : "#",
                click : function(){
                    return $.yoxview.clickBtn($.yoxview[btnFunction], stopPlay);
                }
            });
            var btnSpan = $("<span>" + _title + "</span>");
            btnSpan.css("opacity", "0")
            .appendTo(btn);

            btn.append(sprites.getSprite("icons", btnFunction));
            return btn;
        }

        // Prev and next buttons:
        function createNavButton(_function, _side, singleImage)
        {
            var navBtnImg = new Image();
            navBtnImg.src = options.imagesFolder + _side + ".png";
            var navBtn = $("<a>", {
                css : {
                    "background" : "url(" + navBtnImg.src + ") no-repeat " + _side + " center",
                    "opacity" : "0",
                    "outline" : "0"
                },
                className : "yoxview_ctlBtn",
                href : "#"
            });

            navBtn.css(_side, "0");
            if (!singleImage)
            {
                navBtn.click(function(){
                    this.blur();
                    return $.yoxview.clickBtn(_function, true);
                });

                if (options.buttonsFadeTime != 0)
                {
                    navBtn.hover(
                        function(){
                            if ($.yoxview.isOpen)
                                $(this).stop().animate({ opacity : 0.6 }, options.buttonsFadeTime);
                        },
                        function(){
                            $(this).stop().animate({ opacity : 0 }, options.buttonsFadeTime);
                        }
                    );
                }
            }
            else
                navBtn.css("cursor", "default");

            return navBtn;
        }

        popupWindow.bind("resize.yoxview", function(){
            windowDimensions = getWindowDimensions();
            if ($.yoxview.isOpen)
                $.yoxview.resize();
        });

        function calculateMargins()
        {
            var margins = typeof(options.popupMargin) == "number" ? [String(options.popupMargin)] : options.popupMargin.split(" ", 4);
            popupMargins.top = parseInt(margins[0]);
            switch(margins.length){
            case 1:
                popupMargins.bottom = popupMargins.right = popupMargins.left = popupMargins.top;
                break;
            case 2:
                popupMargins.bottom = popupMargins.top;
                popupMargins.right = popupMargins.left = parseInt(margins[1]);
                break;
            case 3:
                popupMargins.bottom = parseInt(margins[2]);
                popupMargins.right = popupMargins.left = parseInt(margins[1]);
                break;
            default:
                $.extend(popupMargins, {
                    right: parseInt(margins[1]),
                    bottom: parseInt(margins[2]),
                    left: parseInt(margins[3])
                });

                break;
            }
            popupMargins.totalHeight = popupMargins.top + popupMargins.bottom;
            popupMargins.totalWidth = popupMargins.left + popupMargins.right;

            if (options.renderInfoExternally)
                $.extend(defaultPopupMargins, popupMargins);
        }

        function createPopup()
        {
            calculateMargins();
            windowDimensions = getWindowDimensions();

            sprites = new Yox.Sprites({
                notifications: {
                    width: 59,
                    height: 59,
                    sprites: [ 'empty', 'playRTL', 'play', 'pause', 'last', 'first' ]
                },
                icons: {
                    width: 18,
                    height: 18,
                    sprites: ['close', 'help', 'playpause', 'link', 'pin', 'unpin', 'play', 'pause', 'right', 'left']
                },
                menu: {
                    height: 42,
                    sprites: ['back']
                }
            }, options.imagesFolder + "sprites.png", options.imagesFolder + "empty.gif");

            keyMappings ={
                RIGHT: options.isRTL ? 'prev' : 'next',
                DOWN: 'next',
                UP: 'prev',
                LEFT: options.isRTL ? 'next' : 'prev',
                ENTER: 'play',
                HOME: 'first',
                END: 'last',
                SPACE: 'next',
                h: 'help',
                ESCAPE: 'close'
            };

            currentLanguage = yoxviewLanguages[options.lang];
            var skin = options.skin ? $.yoxview.yoxviewSkins[options.skin] : null;

            popup = $("<div>", {
                id: 'yoxview',
                click: function(e){ e.stopPropagation(); }
            });

            popupWrap = $("<div>", {
                id: "yoxview_popupWrap",
                click: function(e){ e.preventDefault(); $.yoxview.clickBtn($.yoxview.close, true); }
            });

            if (options.skin)
                popupWrap.attr("className", "yoxview_" + options.skin);

            if (options.backgroundOpacity === 0)
                popupWrap.css("background", "none")
            else if (Yox.Support.rgba())
                popupWrap.css("background-color", Yox.hex2rgba(options.backgroundColor, options.backgroundOpacity));

            popupWrap.appendTo($(top.document.getElementsByTagName("body")[0])).append(popup);

		    panel1 = $("<div>", {
			    className: "yoxview_imgPanel",
			    css: {
				    "z-index": "2"
			    }
		    });
		    panel2 = $("<div>", {
			    className: "yoxview_imgPanel",
			    css: {
				    "z-index": "1",
				    "display": "none"
			    }
		    });

            // the first image:
            image1 = $("<img />", {
                className : "yoxview_fadeImg",
                css : {
				    "display" : "block",
				    "width" : "100%",
				    "height" : "100%"
			    }
            });

            // the second image:
            image2 = $("<img />", {
                className : "yoxview_fadeImg",
                css : {
				    "display" : "block",
				    "width" : "100%",
				    "height" : "100%"
			    }
            });
            panel1.data("yoxviewPanel", {image: image1})
		    .append(image1).appendTo(popup);
		    panel2.data("yoxviewPanel", {image: image2})
		    panel2.append(image2).appendTo(popup);
            var singleImage = imagesCount == 1;
            if (singleImage && !images[0].media.title)
                options.renderInfo = false;

            // the menu:
            if (options.renderMenu !== false)
            {
                var menuPanelWrap = $("<div>", {
                    className : "yoxview_popupBarPanel yoxview_top"
                });

                if (options.autoHideMenu !== false)
                {
                    menuPanelWrap.hover(
                        function(){
                            if ($.yoxview.isOpen)
                                showMenuPanel();
                        },
                        function(){
                            if ($.yoxview.isOpen)
                                hideMenuPanel();
                        }
                    );
                }

                menuPanel = $("<div>", {
                    id : "yoxview_menuPanel"
                });

                if (Yox.Support.rgba() && options.menuBackgroundColor)
                    menuPanel.css("background", Yox.hex2rgba(options.menuBackgroundColor, options.menuBackgroundOpacity || 0.8));

                var helpBtn = createMenuButton(currentLanguage.Help, "help", false);

                $.yoxview.infoButtons.playBtn = createMenuButton(currentLanguage.Slideshow, "play", false);
                playBtnText = $.yoxview.infoButtons.playBtn.children("span");

                menuPanel.append(
                    createMenuButton(currentLanguage.Close, "close", true),
                    helpBtn,
                    $.yoxview.infoButtons.playBtn
                );

                if (singleImage)
                {
                    $.yoxview.infoButtons.playBtn.css("display", "none");
                    helpBtn.css("display", "none");
                    menuPanel.css({
                        width: 58
                    });
                }

                menuPanel.find("a:last-child").attr("class", "last");
                menuPanelWrap.append(menuPanel).appendTo(popup);
                menuPanel.delegate("a", "mouseenter", function(){
                    $(this).stop().animate({ top : "8px" }, "fast").find("span").stop().animate({opacity:1}, "fast");
                })
                .delegate("a", "mouseleave", function(){
                    $(this).stop().animate({ top : "0" }, "fast").find("span").stop().animate({opacity:0}, "fast");
                });
            }

            if (options.renderButtons !== false && (!singleImage || !$.support.opacity))
            {
                // prev and next buttons:
                prevBtn = createNavButton($.yoxview.prev, options.isRTL ? "right" : "left", singleImage);
                nextBtn = createNavButton($.yoxview.next, options.isRTL ? "left" : "right", singleImage);

                popup.append(prevBtn, nextBtn);

                if (singleImage && !$.support.opacity)
                {
                    ctlButtons = $();

                }
                else
                    ctlButtons = popup.find(".yoxview_ctlBtn");
            }
            else
                ctlButtons = $();

            // add the ajax loader:
            ajaxLoader = $("<div>", {
                id: "yoxview_ajaxLoader",
                className: "yoxview_notification",
                css: {
                    "display": "none"
                }
            });
            ajaxLoader.append($("<img>", {
                src: options.imagesFolder + "popup_ajax_loader.gif",
                alt: currentLanguage.Loading,
                css: {
                    width: 32,
                    height: 32,
                    "background-image": "url(" + options.imagesFolder + "sprites.png)",
                    "background-position": sprites.getBackgroundPosition("notifications", "empty")
                }
            }))
            .appendTo(popup);

            // notification image
            if (!options.disableNotifications)
            {
                notification = $("<img>", {
                    className: "yoxview_notification"
                });
                popup.append(notification);
            }

            // help:
            helpPanel = $("<div>", {
                id : "yoxview_helpPanel",
                href : "#",
                title : currentLanguage.CloseHelp,
                css : {
                    "background" : "url(" + options.imagesFolder + "help_panel.png) no-repeat center top",
                    "direction" : currentLanguage.Direction,
                    "opacity" : "0"
                },
                click : function(){
                    return $.yoxview.clickBtn($.yoxview.help, false);
                }
            });

            var helpTitle = document.createElement("h1");
            helpTitle.innerHTML = currentLanguage.Help.toUpperCase();

            var helpText = document.createElement("p");
            helpText.innerHTML = currentLanguage.HelpText;

            var closeHelp = document.createElement("span");
            closeHelp.id = "yoxview_closeHelp";
            closeHelp.innerHTML = currentLanguage.CloseHelp;

            helpPanel.append(helpTitle).append(helpText).append(closeHelp).appendTo(popup);

            // popup info:
            if (options.renderInfo !== false)
            {
                infoPanel = $("<div>", {
                    id: "yoxview_infoPanel",
                    click: function(e){ e.stopPropagation(); }
                });

                if (options.infoBackOpacity === 0)
                {
                    infoPanel.css("background", "none");
                    infoPanelContent = infoPanel;
                }
                else
                {
                    if (Yox.Support.rgba())
                    {
                        infoPanelContent = infoPanel;
                        infoPanel.css("background-color", Yox.hex2rgba(options.infoBackColor, options.infoBackOpacity));
                    }
                    else
                    {
                        infoPanel.append(
                            $("<div>", {
                                id : "yoxview_infoPanelBack",
                                css : {
                                    "background" : options.infoBackColor,
                                    "opacity" : options.infoBackOpacity
                                }
                            })
                        );
                        infoPanelContent = $("<div>", {
                            id: "yoxview_infoPanelContent"
                        });
                    }
                }
                countDisplay = $("<span>", {
                    id: "yoxview_count"
                });

                infoText = $("<div>", {
                    id: "yoxview_infoText"
                });

                if (singleImage)
                {
                    infoText.css("margin-left", "10px");
                    countDisplay.css("display", "none");
                }
                infoPanelContent.append(countDisplay);

                if (options.renderInfoPin !== false)
                {
                    infoPinLinkImg = sprites.getSprite("icons", options.autoHideInfo ? "pin" : "unpin");
                    infoPinLink = $("<a>", {
                        className: "yoxviewInfoLink",
                        href: "#",
                        title: options.autoHideInfo ? currentLanguage.PinInfo : currentLanguage.UnpinInfo,
                        css: { display: 'inline' },
                        click: function(e){
                            e.preventDefault();
                            options.autoHideInfo = !options.autoHideInfo;
                            infoPinLinkImg.css("background-position", sprites.getBackgroundPosition("icons", options.autoHideInfo ? "pin" : "unpin"));
                            this.title = options.autoHideInfo ? currentLanguage.PinInfo : currentLanguage.UnpinInfo;
                        }
                    });
                    infoPinLink.append(infoPinLinkImg).appendTo(infoPanelContent);
                }

                if (skin && skin.infoButtons)
                {
                    var skinButtons = skin.infoButtons(options, currentLanguage, sprites, popupWrap, popup);
                    if (options.infoButtons)
			            $.extend(options.infoButtons, skinButtons);
			        else
			            options.infoButtons = skinButtons;
			    }
			    if (options.infoButtons)
			    {
				    $.extend($.yoxview.infoButtons, options.infoButtons);
				    for (infoButton in options.infoButtons)
				    {
					    options.infoButtons[infoButton].attr("className", "yoxviewInfoLink").css("display", "block").appendTo(infoPanelContent);
				    }
			    }

                if (options.linkToOriginalContext !== false)
                {
                    infoPanelLink = $("<a>", {
                        className: "yoxviewInfoLink",
                        target: "_blank",
                        title: currentLanguage.OriginalContext
                    });
                    infoPanelLink.append(sprites.getSprite("icons", "link")).appendTo(infoPanelContent);
                }

                infoPanelContent.append(infoText);
                if (!Yox.Support.rgba())
                    infoPanel.append(infoPanelContent);

                infoPanel.appendTo(options.renderInfoExternally ? popupWrap : popup);

                if (!options.renderInfoExternally)
                {
                    infoPanelWrap = $("<div>", {
                        className : "yoxview_popupBarPanel yoxview_bottom"
                    });

                    infoPanelWrap.hover(
                        function(){
                            if ($.yoxview.isOpen && !disableInfo && options.autoHideInfo !== false)
                                setInfoPanelHeight();
                        },
                        function(){
                            if ($.yoxview.isOpen && !disableInfo && options.autoHideInfo !== false)
                                hideInfoPanel();
                        }
                    );
                    infoPanel.wrap(infoPanelWrap);
                    infoPanelWrap = infoPanel.parent();
                }
            }
            // set the background if no RGBA support found:
            if (!Yox.Support.rgba())
            {
                popupBackground = $("<div>", {
                    css : {
                        "position" : "fixed",
                        "height" : "100%",
                        "width" : "100%",
                        "top" : "0",
                        "left" : "0",
                        "background" : options.backgroundColor,
                        "z-index" : "1",
                        "opacity" : options.backgroundOpacity
                    }
                }).appendTo(popupWrap);
            }
        }

	    // Cache stuff:

        $(cacheImg).load(function()
        {
            $.extend(images[cacheVars.currentCacheImg].media, {
                width: this.width,
                height: this.height,
                loaded: true
            });
            advanceCache();
        })
        .error(function(){
            advanceCache();
	    });

	    function advanceCache()
	    {
	        cacheVars.cachedImagesCount++;
            if (cacheVars.cachedImagesCount == imagesCount)
                cacheVars.cacheComplete = true;
            else
                getCacheBuffer();
	    }
        this.startCache = function()
        {
            loadViewImages(this.firstViewWithImages);
            calculateCacheBuffer();
            cacheImages(0);
        }
        function getCacheBuffer()
        {
            if (!options.cacheBuffer || cacheVars.currentCacheImg != cacheVars.cacheBufferLastIndex)
                cacheImages(cacheVars.currentCacheImg + (cacheVars.cacheDirectionForward ? 1 : -1));
        }
        function calculateCacheBuffer()
        {
            if (options.cacheBuffer)
            {
                cacheVars.cacheBufferLastIndex = cacheVars.cacheDirectionForward ? currentItemIndex + options.cacheBuffer : currentItemIndex - options.cacheBuffer;
                if (cacheVars.cacheBufferLastIndex < 0)
                    cacheVars.cacheBufferLastIndex += imagesCount;
                else if (cacheVars.cacheBufferLastIndex >= imagesCount)
                    cacheVars.cacheBufferLastIndex -= imagesCount;
            }
        }
        function cacheImages(imageIndexToCache)
        {
            if (cacheVars.cacheComplete)
                return;

            if (imageIndexToCache == imagesCount)
                imageIndexToCache = 0;
            else if (imageIndexToCache < 0)
                imageIndexToCache += imagesCount;

            var image = images[imageIndexToCache].media;
            cacheVars.currentCacheImg = imageIndexToCache;
            if (image && !image.loaded)
            {
                if (!image.contentType || image.contentType === "image")
                    cacheImg.src = image.src;
                else
                    loadMedia(image, function(){
                        advanceCache();
                    });
            }
            else
                getCacheBuffer();
        }
	    // End cache stuff

        function showLoaderIcon()
        {
            loading = true;
            clearTimeout(loaderTimeout);
            ajaxLoader.stop();
            loaderTimeout = setTimeout(function(){
                    ajaxLoader.css("opacity", "0.6").fadeIn(options.buttonsFadeTime);
                },
                options.buttonsFadeTime
            );
        }

        function hideLoaderIcon()
        {
            loading = false;
            clearTimeout(loaderTimeout);
            ajaxLoader.stop().fadeOut(options.buttonsFadeTime);
        }

        function setImage(itemIndex)
        {
            if (!isPlaying)
                showLoaderIcon();

            loadAndDisplayMedia($.yoxview.currentImage.media);
        }

        function resizePopup(popupPosition, callback)
        {
            popup.stop().animate(popupPosition, options.popupResizeTime, callback);
            //popup.stop().animate(popupPosition, 5000, callback);
        }
        function startPlay()
        {
            if (imagesCount == 1)
                return;

            isPlaying = true;
            if(playBtnText)
                playBtnText.text(currentLanguage.Pause);
            else if ($.yoxview.infoButtons.playBtn)
                $.yoxview.infoButtons.playBtn.attr("title", currentLanguage.Pause);

            if ($.yoxview.infoButtons.playBtn)
                $.yoxview.infoButtons.playBtn.find("img").css("background-position", sprites.getBackgroundPosition("icons", "pause"));

            if (currentItemIndex < imagesCount - 1)
            {
                popupTimeout = setTimeout(
                    function(){
                        $.yoxview.next(true);
                    },
                    options.playDelay
                );
            }
            else
            {
                if (options.loopPlay)
                    popupTimeout = setTimeout(
                        function(){
                            $.yoxview.select(0, null);
                        },
                        options.playDelay
                    );
                else
                    stopPlay();

                if (options.onEnd)
                    setTimeout(options.onEnd, options.playDelay);
            }
        }
        function stopPlay()
        {
            clearTimeout(popupTimeout);
            isPlaying = false;
            if (playBtnText)
                playBtnText.text(currentLanguage.Play);
            else if ($.yoxview.infoButtons.playBtn)
                $.yoxview.infoButtons.playBtn.attr("title", currentLanguage.Play);

            if ($.yoxview.infoButtons.playBtn)
                $.yoxview.infoButtons.playBtn.find("img").css("background-position", sprites.getBackgroundPosition("icons", "play"));
        }

        function blink(_element)
        {
            _element.animate({ opacity : 0.8 }, 1000, function()
            {
                $(this).animate({opacity: 0.2}, 1000, blink($(this)));
            });
        }

        var newPanel = panel2;
        var oldPanel = panel1;

        function getWindowDimensions()
        {
            var widthVal = popupWindow.width();
            var heightVal = popupWindow.height();
            var returnValue = {
                height : heightVal,
                width : widthVal,
			    usableArea: {
				    height : heightVal - popupMargins.totalHeight,
				    width : widthVal - popupMargins.totalWidth
			    }
            };
            return returnValue;
        }

        function getImagePosition(imageSize)
        {
            var imagePosition = (imageSize.width && imageSize.height)
                ? Yox.fitImageSize(imageSize, windowDimensions.usableArea)
                : {
                    width: imageSize.width ? Math.min(imageSize.width, windowDimensions.usableArea.width) : windowDimensions.usableArea.width,
                    height: imageSize.height ? Math.min(imageSize.height, windowDimensions.usableArea.height) : windowDimensions.usableArea.height
                };

            imagePosition.top = popupMargins.top + Math.round((windowDimensions.usableArea.height - imagePosition.height) / 2);
            imagePosition.left = popupMargins.left + Math.round((windowDimensions.usableArea.width - imagePosition.width) / 2);

            return imagePosition;
        }
        this.resize = function(updateInfoPanel)
        {
            if (isPlaying)
            {
                resumePlay = true;
                stopPlay();
            }

            var newImagePosition = getImagePosition(currentMaxSize);
            newPanel.css({ width: "100%", height: "100%"});

            isResizing = true;
            if (!isImageMode)
                ctlButtons.css({top: Math.round((newImagePosition.height - mediaButtonsSize.height) / 2)});

            resizePopup(newImagePosition,
                function(){
                    var newImageSize = { width: popup.width(), height: popup.height() };
                    if (currentMaxSize.padding)
                    {
                        newImageSize.width -= currentMaxSize.padding.horizontal;
                        newImageSize.height -= currentMaxSize.padding.vertical;
                    }

                    newPanel.css(newImageSize);
                    isResizing = false;

                    if (infoPanel && updateInfoPanel !== false)
                        setInfoPanelHeight();

                    if (resumePlay)
                    {
                        startPlay();
                        resumePlay = false;
                    }
                }
            );
        }

        function setInfoPanelHeight(callback)
        {
            clearTimeout(hideInfoTimeout);
            var titleHeight = infoText.outerHeight();

            if (titleHeight < infoPanelMinHeight)
                titleHeight = infoPanelMinHeight;

            if (infoPanel.height() !== titleHeight){
                infoPanel.stop().animate({height : titleHeight}, 500, function(){

                    if (options.renderInfoExternally){

                        var infoPanelPosition = infoPanel.position();
                        $.extend(popupMargins, defaultPopupMargins);
                        if (infoPanelPosition.top === 0)
                            popupMargins.top += titleHeight;
                        else
                            popupMargins.bottom += titleHeight;

                        popupMargins.totalHeight = popupMargins.top + popupMargins.bottom;
                        windowDimensions = getWindowDimensions();
                        $.yoxview.resize(false);
                    }

                    if (callback)
                        callback();
                });
            }
        }
        function hideInfoPanel(callback)
        {
            clearTimeout(hideInfoTimeout);
            infoPanel.stop().animate({ height: 0 }, 500, function(){
                if (callback)
                    callback();
            });
        }
        function hideMenuPanel(callback)
        {
            if (menuPanel)
            {
                clearTimeout(hideMenuTimeout);
                menuPanel.stop().animate({ top: menuHidePosition }, 500, function(){
                    if (callback)
                        callback();
                });
            }
        }
        function showMenuPanel(callback)
        {
            if (menuPanel)
            {
                clearTimeout(hideMenuTimeout);
                menuPanel.stop().animate({ top: 0 }, 500, function(){
                    if (callback)
                        callback();
                });
            }
        }

        function swipePanels()
        {
            oldPanel = newPanel;
	        newPanel = isFirstPanel ? panel2 : panel1;
	        isFirstPanel = !isFirstPanel;
        }
	    function changeMedia(media)
	    {
	        var mediaIsImage = media.contentType === "image" || !media.contentType;

	        if (mediaIsImage && disableInfo && infoPanelWrap)
	            infoPanelWrap.css("display", "block");

	        clearTimeout(hideInfoTimeout);

	        swipePanels();
	        var panelData = newPanel.data("yoxviewPanel");

	        currentMaxSize.width = media.width;
	        currentMaxSize.height = media.height;
	        currentMaxSize.padding = media.padding;

	        if (infoPanel)
            {
                var infoTextValue = media.title || "";
                if (options.showDescription && media.description)
                    infoTextValue += infoTextValue != ""
                        ? "<div id='yoxview_infoTextDescription'>" + media.description + "</div>"
                        : media.description;

                infoText.html(infoTextValue);

                if (imagesCount > 1)
                    countDisplay.html(currentItemIndex + 1 + "/" + imagesCount);

                if (infoPanelLink)
                {
                    if ($.yoxview.currentImage.link)
                        infoPanelLink.attr("href", $.yoxview.currentImage.link).css("display", "inline");
                    else
                        infoPanelLink.css("display", "none");
                }
            }

            var newImagePosition = getImagePosition(media);
	        if (mediaIsImage)
	        {
	            currentImageElement = isFirstPanel ? image1 : image2;
		        currentImageElement.attr({
			        src : media.src,
			        title : media.title,
			        alt: media.alt
		        });

			    panelData.image = currentImageElement;

		        // change to image mode:
		        if (!panelData.isImage && panelData.element)
		        {
		            panelData.element.css("display", "none");
                    panelData.image.css("display", "block");
		            panelData.isImage = true;
		        }

		        if (!isImageMode)
		        {
		            if (options.renderButtons)
		                ctlButtons.css({"height": "100%", "width": "50%", "top": "0"});

		            disableInfo = false;
		            isImageMode = true;
		        }
		    }
		    else
            {
                if (panelData.element && panelData.elementId != media.elementId)
                {
                    panelData.element.remove();
                    panelData.element = undefined;
                }
                if (!panelData.element)
                {
                    if (media.html)
                    {
                        panelData.element = $("<div>", {
	                        className: mediaPanelClass
	                    });
	                    popup.append(panelData.element);
                    }
                    else
                    {
                        popup.append(media.element);
                        panelData.element = media.element;
                    }
                }

                if (media.html)
                    panelData.element.html(media.html);

                newPanel = panelData.element;

                if (isImageMode)
                {
                    if (infoPanelWrap)
		            {
		                if (options.autoHideInfo !== false)
		                    hideInfoPanel();

		                infoPanelWrap.css("display", "none");
		                disableInfo = true;
		            }

		            if (options.renderButtons)
		                ctlButtons.css({
			                "width": mediaButtonsSize.width,
			                "height": mediaButtonsSize.height
			            });

                    isImageMode = false;
                }

                if (options.renderButtons)
                    ctlButtons.css({top: (newImagePosition.height - mediaButtonsSize.height) / 2 });

                // change to element mode:
                if (panelData.isImage === undefined || panelData.isImage)
                {
                    panelData.element.css("display", "block");
                    panelData.image.css("display", "none");
                    panelData.isImage = false;
                }
            }

            var newImageDimensions = { width: newImagePosition.width, height: newImagePosition.height };
            newPanel.css(firstImage ? { width: "100%", height: "100%" } : newImageDimensions);

            if (loading)
                hideLoaderIcon();

            isResizing = true;
            resizePopup(newImagePosition,
                function()
                {
                    if (firstImage)
                    {
                        $.yoxview.isOpen = true;
                        newPanel.css(newImageDimensions);
                        if (options.controlsInitialDisplayTime > 0)
                        {
                            if (options.showButtonsOnOpen)
                                ctlButtons.animate({opacity: 0.5}, options.controlsInitialFadeTime, function(){
                                    if(options.buttonsFadeTime != 0)
                                        $(this).delay(options.controlsInitialDisplayTime).animate({opacity : 0}, options.controlsInitialFadeTime);
                                });

                            if (options.showBarsOnOpen)
                            {
                                showMenuPanel(function(){
                                    if (options.autoHideMenu !== false)
                                        hideMenuTimeout = setTimeout(function(){
                                                hideMenuPanel();
                                            },
                                            options.controlsInitialDisplayTime
                                        );
                                });
                                if (infoPanel)
                                    setInfoPanelHeight(function(){
                                        if (options.autoHideInfo !== false)
                                            hideInfoTimeout = setTimeout(function(){ hideInfoPanel(); }, options.controlsInitialDisplayTime);
                                    });
                            }
                        }

                        if (options.autoPlay)
                            $.yoxview.play();

                        if (options.onOpen)
                            options.onOpen();

                        if (onOpenCallback)
                        {
                            onOpenCallback();
                            onOpenCallback = undefined;
                        }

                        firstImage = false;
                    }

                    if (currentMaxSize.padding)
                    {
                        var newImageWidth = popup.width();
                        var newImageHeight = popup.height();

                        if (currentMaxSize.padding)
                        {
                            newImageWidth -= currentMaxSize.padding.horizontal;
                            newImageHeight -= currentMaxSize.padding.vertical;
                        }
                        newPanel.css({ "width" : newImageWidth + "px", "height" : newImageHeight + "px" });
                    }
                    isResizing = false;
                }
            );

            newPanel.css({'z-index': '2', opacity: 1});
            if (oldPanel)
                oldPanel.css('z-index', '1');

            if (!firstImage){
                newPanel.fadeIn(options.popupResizeTime, function(){
                    if (oldPanel)
                        oldPanel.css('display', 'none');

                    if (infoPanel)
                        setInfoPanelHeight(function(){
                            if (options.autoHideInfo !== false)
                                hideInfoTimeout = setTimeout(function(){ hideInfoPanel(); }, options.titleDisplayDuration);
                        });

                    if (imagesCount > 1)
                    {
                        if (options.cacheImagesInBackground && !cacheVars.cacheComplete)
                                cacheImages(currentItemIndex + (cacheVars.cacheDirectionForward ? 1 : -1));

                        if (isPlaying)
                            startPlay();
                    }
                });
            }
            else{
                newPanel.css({ display: "block", width: "100%", height: "100%" });
            }

	    }
        $(tempImg).load(function()
        {
		    if (this.width == 0)
		    {
		        displayError("Image error");
                return;
            }
            changeMedia($.extend({}, $.yoxview.currentImage.media, {
                width: this.width,
                height: this.height
            }));
        })
        .error(function(){
            displayError("Image not found:<br /><span class='errorUrl'>" + this.src + "</span>");
        });

        function loadMediaFromProvider(provider, url, availableSize, onLoad, onError)
        {
            jQuery.jsonp({
                url: (mediaProviderUrls[provider] || "http://oohembed.com/oohembed/"),
                data: jQuery.extend({
                    "url" : url,
                    "format": "json"
                }, availableSize),
                dataType: 'jsonp',
                callbackParameter: "callback",
                success: function(data)
                {
                    var media = {
                        title: data.title,
                        width: data.width,
                        height: data.height,
                        type: data.type
                    };

                    if (data.type === "video")
                    {
                        media.html = data.html
                            .replace(/<embed /, "<embed wmode=\"transparent\" ")
                            .replace(/<param/, "<param name=\"wmode\" value=\"transparent\"><param")
                            .replace(/width=\"[\d]+\"/ig, "width=\"100%\"")
                            .replace(/height=\"[\d]+\"/ig, "height=\"100%\"");
                    }
                    else if (data.type === "photo")
                    {
                        jQuery.extend(media, {
                            src: data.url,
                            alt: data.title,
                            type: "image"
                        });
                    }
                    onLoad(media);
                },
                error: function(errorSender, errorMsg){
                    if (onError)
                        onError(errorSender, errorMsg);
                }
            });
        };

        function loadAndDisplayMedia(media)
        {
            try
            {
                if (!media)
                    throw("Error: Media is unavailable.");

                if (media.contentType === "image" || !media.contentType)
                {
                    // Resets the src attribute for the image - avoids a rendering problem in Chrome.
                    // $.opacity is tested so this isn't applied in IE (up to IE8),
                    // since it creates a problem with the image's fading:
                    if ($.support.opacity)
                        tempImg.src = "";

                    tempImg.src = media.src;
                }
                else
                {
                    if (!media.loaded && media.contentType == "ooembed")
                    {
                        loadMedia(
                            media,
                            function(loadedMedia){
                                changeMedia(loadedMedia);
                            },
                            function(errorSender)
                            {
                                displayError("Error getting data from:<br /><span class='errorUrl'>" + errorSender.data.url + "</span>");
                            }
                        );
		            }
		            else
		                changeMedia($.yoxview.currentImage.media);
		        }
		    }
		    catch(error)
		    {
		        displayError(error);
		    }
        }
        function loadMedia(media, onLoad, onError)
        {
            if (media.contentType == "ooembed")
            {
	            loadMediaFromProvider(
	                media.provider,
	                media.url,
	                options.defaultDimensions.video,
	                function(mediaData){
	                    $.extend(media, mediaData, {loaded: true});
	                    if (onLoad)
	                        onLoad(media);
	                },
	                onError
                );
            }
        }
        function displayError(errorMsg)
        {
            changeMedia({
                html: "<span class='yoxview_error'>" + errorMsg + "</span>",
                width: 500,
                height: 300,
                type: "error",
                title: ""
            });
        }
        this.update = function(){
            var options;
            if (this instanceof jQuery)
            {
                options = optionsSets[this.data("yoxview").optionsSet || 0];
                this.yoxview("unload", function(caller){ caller.yoxview(options) });
                return this;
            }
            else
            {
                options = optionsSets[0];
                this.unload();
                $.each(loadedViews, function(i, view){
                    view.yoxview(options);
                });
            }
        }
        this.unload = function(callback){
            var caller = this;

            if (!options)
                return(this);

            function doUnload(){
                var allowedThumbnailsSelector = getAllowedThumbnailsSelector(options);
                function removeFromView(view){
                    view.undelegate(allowedThumbnailsSelector, "click.yoxview")
                    .removeData("yoxview")
                    .yoxthumbs("unload", "yoxview")
                    .find(allowedThumbnailsSelector).removeData("yoxview");
                }
                function removeFromDocument(){
                    popupWindow.unbind(".yoxview");

                    if (popup){
                        popupWrap.remove();
                        popup = undefined;
                    }
                }
                if (caller instanceof jQuery)
                {
                    if (caller.data("yoxview"))
                        removeFromView(caller);
                }
                else
                {
                    jQuery.each(loadedViews, function(i, view){
                        removeFromView(view);
                    });

                    removeFromDocument();
                }

                if (callback)
                    callback(caller);
                else
                    return caller;
            }

            if (options.onBeforeUnload)
                options.onBeforeUnload(doUnload)
            else
                doUnload();
        };
    }
})(jQuery);