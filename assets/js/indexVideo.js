// $().ready(function() {
//     $('#site-container').tubular({videoId: 'vbVvF5wWqf0'}); // where idOfYourVideo is the YouTube ID.
// });
$().ready(function() {
    console.log("where is video?");
    var BV = new $.BigVideo();
    BV.init();
    BV.show('http://vjs.zencdn.net/v/oceans.mp4',{ambient:true});
});