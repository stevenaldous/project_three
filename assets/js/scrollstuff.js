var controller = new ScrollMagic.Controller();

var scene = new ScrollMagic.Scene({
  offset: 100, // start the scene after scrolling for 100px
  duration: 400 // pin the element for 400px of scrolling
})
.setPin('#pinned-element1'); //the element we want to pin

// Add Scene to scrollmagic controller
controller.addScene(scene);