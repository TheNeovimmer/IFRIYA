(function() {
	"use strict";

    // Preloader JS
    try {
        window.addEventListener('load', function() {
            var preloader = document.getElementById('preloader');
            preloader.classList.add('d-none');
        });
    } catch (err) {}

    window.onload = function() {

        // Scroll Event go Top JS
        try {
            window.addEventListener('scroll', function() {
                var scrolled = window.scrollY;
                var goTopButton = document.querySelector('.go-top');
    
                if (scrolled > 600) {
                    goTopButton.classList.add('active');
                } else {
                    goTopButton.classList.remove('active');
                }
            });
            var goTopButton = document.querySelector('.go-top');
            goTopButton.addEventListener('click', function() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        } catch (err) {}

        // Counter Js
        try {
            if ("IntersectionObserver" in window) {
                let counterObserver = new IntersectionObserver(function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            let counter = entry.target;
                            let target = parseInt(counter.innerText, 10);

                            let duration = 2000; // total animation time (ms)
                            let start = 0;
                            let startTime = null;

                            function updateCounter(timestamp) {
                                if (!startTime) startTime = timestamp;
                                let progress = Math.min((timestamp - startTime) / duration, 1);
                                let value = Math.floor(progress * target);

                                counter.innerText = value;

                                if (progress < 1) {
                                    requestAnimationFrame(updateCounter);
                                } else {
                                    counter.innerText = target; // ✅ final exact value
                                }
                            }

                            requestAnimationFrame(updateCounter);
                            counterObserver.unobserve(counter);
                        }
                    });
                });

                document.querySelectorAll(".counter").forEach(counter => {
                    counterObserver.observe(counter);
                });
            }
        } catch (err) {
            console.error(err);
        }

        // Hover JS
        try {
            var elements = document.querySelectorAll("[id^='my-element']");
                elements.forEach(function(element) {
                element.addEventListener("mouseover", function() {
                    elements.forEach(function(el) {
                    el.classList.remove("active");
                    });
                    element.classList.add("active");
                });
            });
        } catch (err) {}

    };

    // Scroll Animation
    window.addEventListener('scroll', reveal);
    function reveal(){
        var reveals = document.querySelectorAll('.reveal');
        for (var i = 0; i < reveals.length; i++){
            var win_height = window.innerHeight;
            var reveal_top = reveals[i].getBoundingClientRect().top;
            var reveal_point = 100;
            if (reveal_top < win_height - reveal_point) {
                reveals[i].classList.add('active');
            } 
        }
    }

    // Scroll Animation
    window.addEventListener('scroll', reveal2);
    function reveal2(){
        var reveals = document.querySelectorAll('.reveal2');
        for (var i = 0; i < reveals.length; i++){
            var win_height = window.innerHeight;
            var reveal_top = reveals[i].getBoundingClientRect().top;
            var reveal_point = 100;
            if (reveal_top < win_height - reveal_point) {
                reveals[i].classList.add('active');
            } 
        }
    }
    
    // Partner JS
    var swiper = new Swiper(".partnerSlider", {
        slidesPerView: 1,
        spaceBetween: 25,
        loop: true,
        speed: 1500,
        // autoplay: {
        //     delay: 2000,
        //     disableOnInteraction: false,
        //     pauseOnMouseEnter: true,
        // },
        breakpoints: {
            576: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 5,
            },
            1400: {
                slidesPerView: 6,
            },
        },
    });

    // Banner JS
    var swiper = new Swiper(".bannerSlider", {
        slidesPerView: 1,
        spaceBetween: 25,
        loop: true,
        speed: 1500,
        effect: "fade",
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        // autoplay: {
        //     delay: 2000,
        //     disableOnInteraction: false,
        //     pauseOnMouseEnter: true,
        // },
    });
    
    // Destination JS
    var swiper = new Swiper(".destinationSlider", {
        slidesPerView: 1,
        spaceBetween: 25,
        loop: true,
        speed: 1500,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        // autoplay: {
        //     delay: 2000,
        //     disableOnInteraction: false,
        //     pauseOnMouseEnter: true,
        // },
        breakpoints: {
            576: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 3,
            },
            1400: {
                slidesPerView: 4,
            },
        },
    });
    
    // Testimonial JS
    var swiper = new Swiper(".testimonialSlider", {
        slidesPerView: 1,
        spaceBetween: 25,
        loop: true,
        speed: 1500,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        // autoplay: {
        //     delay: 2000,
        //     disableOnInteraction: false,
        //     pauseOnMouseEnter: true,
        // },
    });
    
    
    // Review JS
    var swiper = new Swiper(".reviewSlider", {
        slidesPerView: 1,
        spaceBetween: 25,
        loop: true,
        speed: 1500,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        // autoplay: {
        //     delay: 2000,
        //     disableOnInteraction: false,
        //     pauseOnMouseEnter: true,
        // },
        breakpoints: {
            576: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 3,
            },
            1400: {
                slidesPerView: 3,
            },
        },
    });
    
    // scrollCue
    scrollCue.init();

})();

// For Mobile Navbar JS
const list = document.querySelectorAll('.mobile-menu-list');
function accordion(e) {
    e.stopPropagation(); 
    if(this.classList.contains('active')){
        this.classList.remove('active');
    }
    else if(this.parentElement.parentElement.classList.contains('active')){
        this.classList.add('active');
    }
    else {
        for(i=0; i < list.length; i++){
            list[i].classList.remove('active');
        }
        this.classList.add('active');
    }
}
for(i = 0; i < list.length; i++ ){
    list[i].addEventListener('click', accordion);
}

// Header Sticky
const getHeaderId = document.getElementById("navbar");
if (getHeaderId) {
    window.addEventListener('scroll', event => {
        const height = 150;
        const { scrollTop } = event.target.scrollingElement;
        document.querySelector('#navbar').classList.toggle('sticky', scrollTop >= height);
    });
}

//review Js
const thumbs = document.querySelectorAll('.thumbs img');
const quote = document.getElementById('quoteText');
const profileImg = document.getElementById('profileImg');
const profileName = document.getElementById('profileName');
const profileRole = document.getElementById('profileRole');


thumbs.forEach(img => {
img.addEventListener('click', () => {
document.querySelector('.thumbs img.active').classList.remove('active');
img.classList.add('active');


quote.textContent = img.dataset.text;
profileImg.src = img.src;
profileName.textContent = img.dataset.name;
profileRole.textContent = img.dataset.role;
});
});