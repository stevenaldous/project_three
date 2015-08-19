$(document).ready(function(){

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
});
