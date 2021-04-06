$(document).ready(function(){
  //Menu Toggle Script
  $("#menu-toggle").click(function(e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
  });
  
  // For highlighting activated tabs in new Listing form
  $("#tab1").on("click", function () {
    $(".tabs").removeClass("active1");
    $(".tabs").addClass("bg-light");
    $("#tab1").addClass("active1");
    $("#tab1").removeClass("bg-light");
  });
  $("#tab2").on("click", function () {
    $(".tabs").removeClass("active1");
    $(".tabs").addClass("bg-light");
    $("#tab2").addClass("active1");
    $("#tab2").removeClass("bg-light");
  });
  $("#tab3").on("click", function () {
    $(".tabs").removeClass("active1");
    $(".tabs").addClass("bg-light");
    $("#tab3").addClass("active1");
    $("#tab3").removeClass("bg-light");
  });
  $("#tab4").on("click", function () {
    $(".tabs").removeClass("active1");
    $(".tabs").addClass("bg-light");
    $("#tab4").addClass("active1");
    $("#tab4").removeClass("bg-light");
  });
  $("#tab5").on("click", function () {
  $(".tabs").removeClass("active1");
  $(".tabs").addClass("bg-light");
  $("#tab5").addClass("active1");
  $("#tab5").removeClass("bg-light");
  });
  

  //For dropzone
  $('.dropzone').acceptedFiles = "image/*";
                    
  })

  //For Twilio
  $('#num1').on("keyup", function () {
    $("#num2").focus();
  });

  $('#num2').on("keyup", function () {
    $("#num3").focus();
  });

  $('#num3').on("keyup", function () {
    $("#num4").focus();
  });

  $('#num4').on("keyup", function () {
    $("#num5").focus();
  });

  $('#num5').on("keyup", function () {
    $("#num6").focus();
  });

  $('#num6').on("keyup", function () {
    var code = document.querySelector("#code");

    var one = document.querySelector("#num1");
    var two = document.querySelector("#num2");
    var three = document.querySelector("#num3");
    var four = document.querySelector("#num4");
    var five = document.querySelector("#num5");
    var six = document.querySelector("#num6");

    var newCode = one.value + two.value  + three.value  + four.value  + five.value  + six.value ;
   
    code.value = newCode;
    console.log(code.value);

    setTimeout(() => { console.log("World!"); }, 5000);
    $("#verifyForm").submit();
  });

  

function getListing(id) {
    var base_url = window.location.origin;
    console.log(base_url);
    window.location.href = base_url + '/listing' + id;
    }

document.addEventListener('DOMContentLoaded', function() {
  if(window.location.pathname == "/account/dashboard"){
  var calendarEl = document.getElementById('bookedDates');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    themeSystem: 'standard'
  });
  calendar.render();
}
});