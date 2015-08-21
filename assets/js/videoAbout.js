// $().ready(function() {
//     $('#site-container').tubular({videoId: 'vbVvF5wWqf0'}); // where idOfYourVideo is the YouTube ID.
// });
$().ready(function() {
  var pathname = window.location.pathname;
  // console.log(pathname);
  // console.log("where is video?");
  if (pathname ==='/about') {
    var BV = new $.BigVideo();

    BV.init();
    BV.show('http://vjs.zencdn.net/v/oceans.mp4',{ambient:true});
  }
});