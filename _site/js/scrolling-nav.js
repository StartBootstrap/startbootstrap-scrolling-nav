
// jQuery for collapsing nav when clicking


$('.navbar-collapse a').click(function(){
    $(".navbar-collapse").collapse('hide');
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {


    $(document).on('click', 'a.page-scroll', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});
