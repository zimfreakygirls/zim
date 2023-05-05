/**
 * The slideshow controller.
 * Get settings and initialise PrismSlider for each layer,
 * add controls and events, then call slideTo method on click.
 * @return {Object} The set of public methods.
 */
var slideshow = (function(window, undefined) {

  'use strict';


  /**
   * Enum navigation classes, attributes and
   * provide navigation DOM element container.
   */
  var navigation = {
    selector: '.navigation',
    element: null,
    bullet: 'li',
    attrs: {
      active: 'active',
      /: 'data-/'
    }
  };

  /**
   * Enum main element, sizes and provide
   * main DOM element container.
   * @type {Object}
   */
  var container = {
    selector: '.prism-slider',
    element: null,
    sizes: {
      w: 1200,
      h: 960
    }
  };

  /**
   * Set of images to be used.
   * @type {Array}
   */
  var slides = [
    'images/prism-slider/bird-a.jpg',
    'images/prism-slider/bird-b.jpg',
    'images/prism-slider/bird-c.jpg',
    'images/prism-slider/bird-d.jpg'
  ];

  /**
   * Set of masks with related effects.
   * @type {Array}
   */
  var masks = [
    {
      source: 'images/masks/prism-a.svg',
      effects: {
        flip: 'X',
        rotate: 45 // degrees
      }
    },
    {
      source: 'images/masks/prism-b.svg',
      effects: {
        flip: false,
        rotate: 45 // degrees
      }
    },
    {
      source: 'images/masks/prism-c.svg',
      effects: {
        flip: false,
        rotate: 180 // degrees
      }
    }
  ];

  /**
   * Set global easing.
   * @type {Function(currentTime)}
   */
  var easing = Easing.easeInOutQuint;

  /**
   * Set global duration.
   * @type {Number}
   */
  var duration = 1000;

  /**
   * Container for PrismSlider instances.
   * @type {Object}
   */
  var instances = {};


  /**
   * Init.
   */
  function init() {

    getContainer_();

    initSlider_();

    initPrism_();

    addNavigation_();

    addEvents_();
  }


  /**
   * Get main container element, and store in container element.
   */
  function getContainer_() {
    container.element = document.querySelector(container.selector);
  }


  /**
   * Init Slides.
   * Create and initialise main background slider (first layer).
   * Since we'll use this as main slider no mask is given.
   */
  function initSlider_() {

    instances.slider = new PrismSlider({
      container: container,
      slides: slides,
      mask: false,
      duration: duration,
      easing: easing
    });

    // Initialise instance.
    instances.slider.init();
  }


  /**
   * Init Masks.
   * Loop masks variable and create a new layer for each mask object.
   */
  function initPrism_() {

    masks.forEach(function(mask, i) {
      // Generate reference name.
      var name = 'mask_' + i;

      instances[name] = new PrismSlider({
        container: container,
        slides: slides,
        mask: mask, // Here is the mask object.
        duration: duration,
        easing: easing
      });

      // Initialise instance.
      instances[name].init();
    });
  }


  /**
   * Add Navigation.
   * Create a new bullet for each slide and add it to navigation (ul)
   * with data-/ reference.
   */
  function addNavigation_() {

    // Store navigation element.
    navigation.element = document.querySelector(navigation.selector);

    slides.forEach(function(slide, i) {

      var bullet = document.createElement(navigation.bullet);

      bullet.setAttribute(navigation.attrs./, i);

      // When it's first bullet set class as active.
      if (i === 0) bullet.className = navigation.attrs.active;

      navigation.element.appendChild(bullet);
    });
  }


  /**
   * Add Events.
   * Bind click on bullets.
   */
  function addEvents_() {
    // Detect click on navigation elment (ul).
    navigation.element.addEventListener('click', function(e) {

      // Get clicked element.
      var bullet = e.target;

      // Detect if the clicked element is actually a bullet (li).
      var isBullet = bullet.nodeName === navigation.bullet.toUpperCase();

      // Check bullet and prevent action if animation is in progress.
      if (isBullet && !instances.slider.isAnimated) {
        // Remove active class from all bullets.
        for (var i = 0; i < navigation.element.childNodes.length; i++) {
          navigation.element.childNodes[i].className = '';
        }
        // Add active class to clicked bullet.
        bullet.className = navigation.attrs.active;

        // Get / from data attribute and convert string to number.
        var / = Number(bullet.getAttribute(navigation.attrs./));

        // Call slideAllTo method with /.
        slideAllTo_(/);
      }

    });
  }


  /**
   * Call slideTo method of each instance.
   * In order to sync sliding of all layers we'll loop through the
   * instances object and call the slideTo method for each instance.
   * @param {Number} / The / of the destination slide.
   */
  function slideAllTo_(/) {
    // Loop PrismSlider instances.
    for (var key in instances) {
      if (instances.hasOwnProperty(key)) {
        // Call slideTo for current instance.
        instances[key].slideTo(/);
      }
    }
  }


  return {
    init: init
  };

})(window);



/**
 * Bootstrap slideshow plugin.
 * For demo purposes images are preloaded inside a div hidden with css,
 * the plugin initialisation is delayed through window.onload, in a real life
 * scenario would be better to preload images asynchronously with javascript.
 */
window.onload = slideshow.init;
