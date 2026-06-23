(function ($) {
  "use strict";

  var $window = $(window);
  /*----------------------------------
# header sticky 
-----------------------------------*/
  $.fn.elExists = function () {
    return this.length > 0;
  };


  var activeSticky = $("#sticky-header"),
    $winDow = $($window);
  $winDow.on("scroll", function () {
    var scroll = $($window).scrollTop(),
      isSticky = activeSticky;

    if (scroll < 1) {
      isSticky.removeClass("is-sticky");
    } else {
      isSticky.addClass("is-sticky");
    }
  });


  const offcanvasToggle = document.getElementById('offcanvas-toggle');
  const offcanvas = document.getElementById('offcanvas');
  const offcanvasClose = document.getElementById('offcanvas-close');

  function setOffcanvas(open) {
    offcanvas.classList.toggle('offcanvas-open', open);
    offcanvas.setAttribute('aria-hidden', String(!open));
    offcanvasToggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('is-menu-open', open);

    if (open) {
      offcanvasClose.focus();
    } else {
      offcanvasToggle.focus();
    }
  }

  offcanvasToggle.setAttribute('role', 'button');
  offcanvasToggle.setAttribute('tabindex', '0');
  offcanvasToggle.setAttribute('aria-label', 'Open navigation');
  offcanvasToggle.setAttribute('aria-controls', 'offcanvas');
  offcanvasToggle.setAttribute('aria-expanded', 'false');
  offcanvas.setAttribute('aria-hidden', 'true');

  offcanvasToggle.addEventListener('click', function () {
    setOffcanvas(!offcanvas.classList.contains('offcanvas-open'));
  });

  offcanvasToggle.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setOffcanvas(true);
    }
  });

  offcanvasClose.addEventListener('click', function () {
    setOffcanvas(false);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && offcanvas.classList.contains('offcanvas-open')) {
      setOffcanvas(false);
    }
  });





  if ($(".testimonial").elExists()) {
    const testimonialCarousel = new Swiper(".testimonial .swiper", {
      pagination: false,
      breakpoints: {
        576: {
          slidesPerView: 2,
          spaceBetween: 45,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 45,
        },
      },
    });
  }





  if ($(".brandCarousel").elExists()) {
    const brandCarousel = new Swiper(".brandCarousel .swiper", {
      pagination: false,
      spaceBetween: 24,
      loop: true,
      speed: 2000,
      autoplay: {
        delay: 2000,
      },
      breakpoints: {
        0: {
          slidesPerView: 1
        },
        480: {
          slidesPerView: 2
        },
        768: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 6
        },
      },
    });
  }





  function Tab() {
    $(".tabs button").on("click", function () {
      var tab_id = $(this).attr("data-tab");
      $(".tabs button").removeClass("active");
      $(".tab-content").removeClass("active");
      $(this).addClass("active");
      $("#" + tab_id).addClass("active");
    });
  }

  Tab();

  if ($(".play-button").elExists()) {
    $(".play-button").magnificPopup({
      disableOn: 700,
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: true,
      fixedContentPos: true,
    });
  }




  if ($(".counter").elExists()) {
    const counterUp = window.counterUp.default

    const callback = entries => {
      entries.forEach(entry => {
        const el = entry.target
        if (entry.isIntersecting && !el.classList.contains('is-visible')) {
          counterUp(el, {
            duration: 1200,
            delay: 15,
          })
          el.classList.add('is-visible')
        }
      })
    }

    const IO = new IntersectionObserver(callback, { threshold: 0.6 })

    const el = document.querySelector('.counter')
    IO.observe(el)
  }






  // You can also pass an optional settings object
  // below listed default settings
  AOS.init({
    // Global settings:
    disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 100, // values from 0 to 3000, with step 50ms
    duration: 600, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: true, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

  });



  const form = $('#contact-form');
  const footerWhatsAppForms = $('.footer-whatsapp-form');
  const formMessages = $('.form-message');

  formMessages.attr('aria-live', 'polite');

  $(form).on('submit', function (e) {
    e.preventDefault();
    const formElement = this;

    if (!formElement.checkValidity()) {
      formElement.reportValidity();
      return;
    }

    const data = new FormData(formElement);
    const subject = encodeURIComponent(data.get('subject') || 'Portfolio enquiry');
    const body = encodeURIComponent(
      `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone') || 'Not provided'}\n\n${data.get('message')}`
    );
    const mailto = `mailto:hello@musasukumani.dev?subject=${subject}&body=${body}`;
    const message = $(formElement).find('.form-message');

    message
      .removeClass('error')
      .addClass('success')
      .html(`Your email app is opening. You can also <a href="${mailto}">send the message directly</a>.`);
    window.location.href = mailto;
  });

  footerWhatsAppForms.on('submit', function (e) {
    e.preventDefault();
    const formElement = this;

    if (!formElement.checkValidity()) {
      formElement.reportValidity();
      return;
    }

    const data = new FormData(formElement);
    const whatsappMessage = [
      'Hi Musa, I am contacting you from your portfolio.',
      '',
      `Name: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      `Phone: ${data.get('phone') || 'Not provided'}`,
      `Subject: ${data.get('subject') || 'Portfolio enquiry'}`,
      '',
      data.get('message')
    ].join('\n');
    const whatsappUrl = `https://wa.me/27836329886?text=${encodeURIComponent(whatsappMessage)}`;
    const message = $(formElement).find('.form-message');

    message
      .removeClass('error')
      .addClass('success')
      .html(`WhatsApp is opening. You can also <a href="${whatsappUrl}" target="_blank" rel="noopener">send the message directly</a>.`);
    window.location.href = whatsappUrl;
  });




  /*---------------------------------
        Scroll Up
    -----------------------------------*/
  function scrollToTop() {
    var $scrollUp = $("#scrollUp"),
      $lastScrollTop = 0,
      $window = $(window);

    $window.on("scroll", function () {
      var st = $(this).scrollTop();
      if (st > $lastScrollTop) {
        $scrollUp.css({ bottom: "-60px" });
      } else {
        if ($window.scrollTop() > 200) {
          $scrollUp.css({ bottom: "60px" });
        } else {
          $scrollUp.css({ bottom: "-60px" });
        }
      }
      $lastScrollTop = st;
    });

    $scrollUp.on("click", function (evt) {
      $("html, body").animate({ scrollTop: 0 }, 600);
      evt.preventDefault();
    });
  }
  scrollToTop();

})(jQuery);
