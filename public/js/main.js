$(document).ready(function(){
  //Menu Toggle Script
  $("#menu-toggle").click(function(e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
  });
  
  // For highlighting activated tabs in new Listing form
  $("#tab1").click(function () {
    $(".tabs").removeClass("active1");
    $(".tabs").addClass("bg-light");
    $("#tab1").addClass("active1");
    $("#tab1").removeClass("bg-light");
  });
  $("#tab2").click(function () {
    $(".tabs").removeClass("active1");
    $(".tabs").addClass("bg-light");
    $("#tab2").addClass("active1");
    $("#tab2").removeClass("bg-light");
  });
  $("#tab3").click(function () {
    $(".tabs").removeClass("active1");
    $(".tabs").addClass("bg-light");
    $("#tab3").addClass("active1");
    $("#tab3").removeClass("bg-light");
  });
  $("#tab4").click(function () {
    $(".tabs").removeClass("active1");
    $(".tabs").addClass("bg-light");
    $("#tab4").addClass("active1");
    $("#tab4").removeClass("bg-light");
  });
  $("#tab5").click(function () {
  $(".tabs").removeClass("active1");
  $(".tabs").addClass("bg-light");
  $("#tab5").addClass("active1");
  $("#tab5").removeClass("bg-light");
  });
  

  //For dropzone
  $('.dropzone').acceptedFiles = "image/*";
                    
  })

 function getListing(id) {
    var base_url = window.location.origin;
    console.log(base_url);
    window.location.href = base_url + '/listing' + id;
    }

document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('bookedDates');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    themeSystem: 'standard'
  });
  calendar.render();
});