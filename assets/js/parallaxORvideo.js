// $().ready(function() {
//     $('#site-container').tubular({videoId: 'vbVvF5wWqf0'}); // where idOfYourVideo is the YouTube ID.
// });
$().ready(function() {
  var pathname = window.location.pathname;
  console.log(pathname);
  console.log("where is video?");
  if (pathname ==='/about') {
    var BV = new $.BigVideo();

    BV.init();
    BV.show('http://vjs.zencdn.net/v/oceans.mp4',{ambient:true});
  } else if (pathname === '/') {

    $('#element-to-animate').css('opacity',0);
    // $('#element-to-animate').on('click', function(element) {
    //   console.log('cake');
    //   $(this).addClass('shake');
    // });

    $('#element-to-animate').waypoint(function() {
      $('#element-to-animate').addClass('rotateIn');
    }, { offset: '50%' });
    // grab the two divs
    var x = $("div[data-type='background']");

    var y = $(window);

    // on scroll event listener triggers callback function
    y.scroll(function(){
      x.each(function(){

        // gets the pixel distance scrolled, divides by data-speed,
        // applies a negative number to it
        var yPos = -(y.scrollTop() / x.data("speed"));

        // builds css attribute
        var coords = " 50%" + yPos + "px";

        // applies attribute to each div, in effect moving the background
        // up vertically with a negative offset
        $(this).css({backgroundPosition: coords});
      });

    });
  }
});