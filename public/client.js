var x = (function() {

    var slideIndex = 0;
    var totalSlides = 2;


    function plusSlides(n) {
        slideIndex = slideIndex + n;
        if (slideIndex == -1) {
            slideIndex = totalSlides - 1;
        } else if (slideIndex == totalSlides) {
            slideIndex = 0;
        }
        showSlides(slideIndex);
    }

    function currentSlide(n) {
        slideIndex = n;
        showSlides(n);
    }

    function showSlides(n) {
        $(".mySlides").hide();
        $(".mySlides").eq(n).show();
        $(".dot").removeClass("active");
        $(".dot").eq(n).addClass("active");

    }

    return {
        "plusSlides": plusSlides,
        "currentSlide": currentSlide,
        "showSlides": showSlides,
    };

})();

$(document).ready(function() {
    $("#next").click(function() { return x.plusSlides(1); });
});