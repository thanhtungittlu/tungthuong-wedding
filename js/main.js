(function ($) {
    "use strict";


    // Modal Video
    $(document).ready(function () {
        var $videoSrc = '';
        $('.btn-play').on('click', function () {
            $videoSrc = $(this).data('src');
        });

        $('#videoModal').on('shown.bs.modal', function () {
            if ($videoSrc) {
                var sep = $videoSrc.indexOf('?') === -1 ? '?' : '&';
                var url = $videoSrc + sep + 'autoplay=1';
                $('#video').attr('src', url);
            }
            var bg = document.getElementById('bg-audio');
            if (bg) { bg.pause(); }
        });

        $('#videoModal').on('hide.bs.modal', function () {
            if ($videoSrc) {
                $('#video').attr('src', '');
            }

            var bg = document.getElementById('bg-audio');
            if (bg) { bg.play().catch(function () { }); }
        });


        var enableAudioOnce = function () {
            var bg = document.getElementById('bg-audio');
            if (bg) {
                bg.play().catch(function () { });
            }
            $(document).off('click keydown touchstart', enableAudioOnce);
        };
        $(document).on('click keydown touchstart', enableAudioOnce);

        // === Music FAB ===
        var bg = document.getElementById('bg-audio');
        var musicBtn = document.getElementById('music-toggle');

        function setMusicState(playing) {
            if (!musicBtn) return;
            musicBtn.classList.toggle('playing', !!playing);
            musicBtn.classList.toggle('muted', !playing);
        }

        if (musicBtn && bg) {
            // trạng thái ban đầu
            setMusicState(!bg.paused && !bg.muted);

            musicBtn.addEventListener('click', function () {
                if (bg.paused || bg.muted) {
                    bg.muted = false;
                    bg.play().then(function () { setMusicState(true); })
                        .catch(function () { /* bị chặn autoplay */ });
                } else {
                    bg.pause();
                    setMusicState(false);
                }
            });
        }


    });




    // Scroll to Bottom
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-bottom').fadeOut('slow');
        } else {
            $('.scroll-to-bottom').fadeIn('slow');
        }
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({ filter: $(this).data('filter') });
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Gallery carousel
    $(".gallery-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1500,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            },
            1200: {
                items: 5
            }
        }
    });
    // Countdown Timer
    function startCountdown() {
        // SET YOUR WEDDING DATE HERE
        const weddingDate = new Date("November 29, 2025 09:00:00").getTime();

        const countdownInterval = setInterval(function () {
            const now = new Date().getTime();
            const distance = weddingDate - now;

            // Calculations for days, hours, minutes and seconds
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Function to add leading zero
            const formatTime = (time) => time < 10 ? `0${time}` : time;

            // Display the result in the elements
            document.getElementById("days").innerText = formatTime(days);
            document.getElementById("hours").innerText = formatTime(hours);
            document.getElementById("minutes").innerText = formatTime(minutes);
            document.getElementById("seconds").innerText = formatTime(seconds);

            // If the countdown is over, write some text 
            if (distance < 0) {
                clearInterval(countdownInterval);
                document.getElementById("wedding-countdown").innerHTML = "<h3 class='font-secondary'>Happy Wedding Day!</h3>";
            }
        }, 1000);
    }

    // Start the countdown when the document is ready
    $(document).ready(function () {
        if ($('#wedding-countdown').length) {
            startCountdown();
        }
    });

    // First Animation
    // Splash Screen Logic (Clip-Path Method)
    $(window).on('load', function () {
        const splashScreen = $('#splashScreen');

        if (splashScreen.length) {
            setTimeout(function () {
                splashScreen.addClass('hide');

                setTimeout(function () {
                    splashScreen.remove();
                }, 3000);
            }, 1000);
        }
    });


})(jQuery);

(function () {
    const el = document.querySelector('#thanks');
    if (!el) return;
    const io = new IntersectionObserver((ents) => {
        ents.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: .35 });
    io.observe(el);
})();
