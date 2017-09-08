var x = (function() {

    var slideIndex = 0;
    var totalSlides = 5;
    var numRequiredForms = 5;

    var locationOpen = false;
    var contactOpen = false;
    var serviceOpen = false;


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

    function validateForm() {
        var errorString = "";
        var pass = true;

        //checks if any inputs are empty
        $("input").each(function(index, val) {
            if (val.value == "") {
                errorString = errorString + val.placeholder + ": Cannot be Empty" + "\n";
                pass = false;
            }
        });

        //validate phone helper function
        var phone = validatePhone();

        if (!phone) {
            pass = false;
            errorString = errorString + "Invalid Phone Number, XXX-XXX-XXXX format please" + "\n";
        }

        var email = validateEmail();

        if (!email) {
            pass = false;
            errorString = errorString + "Invalid Email" + "\n";
        }

        if (errorString) {
            alert(errorString);
            return false;
        };

    }

    //helper function to validate phone numbers
    function validatePhone() {
        var phoneno = /^[2-9]\d{2}-\d{3}-\d{4}$/;
        var inputNum = $("#phoneNumber").val();

        return phoneno.test(inputNum);
    }

    //for Safari
    function validateEmail() {
        var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var inputEmail = $("#email").val();

        return emailRegex.test(inputEmail);
    }

    function toggleButton(id, arrow) {
        $(id).hover(function() {
            $(this).css({
                "cursor": "pointer",
            });

            $(this).stop(true, false).animate({
                height: "3.5vw",
            });
            $(arrow).stop(true, false).slideToggle(500);
        }, function() {
            $(this).stop(true, false).animate({
                height: "2.2vw",
            });
            $(arrow).stop(true, false).slideToggle(500);
        });
    }


    function toggleInfo(id, expand) {
        $(id).click(function() {
            $(expand).slideToggle(650);
        });
    }

    function hoverMouse(id) {
        $(id).hover(function() {
            $(this).css("cursor", "pointer");
        });
    }

    function scrollTo(clicked, position, open) {
        $(clicked).click(function() {
            $('html,body').animate({
                    scrollTop: $(position).offset().top
                },
                'slow');
            if (open != null) {
                $(open).delay(700).slideDown(650);
            }
        });
    }


    return {
        "plusSlides": plusSlides,
        "currentSlide": currentSlide,
        "showSlides": showSlides,
        "validateForm": validateForm,
        "toggleButton": toggleButton,
        "toggleInfo": toggleInfo,
        "initMap": initMap,
        "hoverMouse": hoverMouse,
        "scrollTo": scrollTo

    };

})();

var map;
var uluru;

function initMap() {

    uluru = {
        lat: 34.081028,
        lng: -118.059239
    };
    map = new google.maps.Map($("#map")[0], { zoom: 15, center: uluru });

    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });

}

$(document).ready(function() {

    //next button , prev button
    $("#next").click(function() { return x.plusSlides(1); });
    $("#prev").click(function() { return x.plusSlides(-1); });

    //current slide for dot
    $("#dot1").click(function() { return x.currentSlide(0); });
    $("#dot2").click(function() { return x.currentSlide(1); });
    $("#dot3").click(function() { return x.currentSlide(2) });
    $("#dot4").click(function() { return x.currentSlide(3) });
    $("#dot5").click(function() { return x.currentSlide(4) });

    //submit button hover, nav button hover
    x.hoverMouse("#submitButton");
    x.hoverMouse("#contactNav");
    x.hoverMouse("#serviceNav");
    x.hoverMouse("#scheduleNav");
    x.hoverMouse("#locationNav");
    x.hoverMouse("#aboutNav");

    //toggling buttons
    x.toggleButton("#contactButton", "#downArrowContact");
    x.toggleButton("#locationButton", "#downArrowLocation");
    x.toggleButton("#aboutButton", "#downArrowAbout");

    //toggling info
    x.toggleInfo("#contactButton", "#contactHidden");
    x.toggleInfo("#aboutButton", "#aboutHidden");

    //scrolling to info for nav
    x.scrollTo("#contactNav", "#contact");
    x.scrollTo("#serviceNav", "#Service");
    x.scrollTo("#locationNav", ".Location");
    x.scrollTo("#aboutNav", ".About", "#aboutHidden");
});

window.onload = function() {
    x.currentSlide(0);
}