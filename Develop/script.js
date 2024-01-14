// The code is modularized into multiple functions

// function for showing current date
function displayCurrentDate() {
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
}

// function for showing all the timing blocks
function generateTimeBlocks() {
  for (let hour = 9; hour <= 17; hour++) {
    // Creating HTML
    let timeBlock = $("<div>")
      .addClass("row time-block")
      .attr("id", "hour-" + hour);

    let currentHour = hour <= 12 ? hour + "AM" : hour - 12 + "PM";
    let hourCol = $("<div>")
      .addClass("col-2 col-md-1 hour text-center py-3")
      .text(currentHour);

    let textArea = $("<textarea>").addClass("col-8 col-md-10 description");

    let saveBtn = $("<button>")
      .addClass("btn saveBtn col-2 col-md-1")
      .attr("aria-label", "save");

    let saveIcon = $("<i>").addClass("fas fa-save");

    // Pushing into HTML
    saveBtn.append(saveIcon);
    timeBlock.append(hourCol, textArea, saveBtn);
    $(".container-fluid").append(timeBlock);
  }
}

// function for updating block classes
function updateClasses() {
  let currentHour = dayjs().hour();

  console.log(currentHour);
  $(".time-block").each(function () {
    let hourEl = $(this).attr("id").split("-")[1];

    $(this).removeClass("past present future");

    if (hourEl < currentHour) {
      $(this).addClass("past");
    } else if (+hourEl === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });
}

// function for saved events
function saveEventListener() {
  $(".saveBtn").click(function () {
    let hourId = $(this).closest(".time-block").attr("id");
    let eventText = $(this).siblings(".description").val();
    localStorage.setItem(hourId, eventText);
  });
}

// function for getting saved data from storage
function loadSavedEvents() {
  $(".time-block").each(function () {
    let hourId = $(this).attr("id");
    let savedEvent = localStorage.getItem(hourId);

    if (savedEvent) {
      $(this).find(".description").val(savedEvent);
    }
  });
}

$(function () {
  displayCurrentDate();
  generateTimeBlocks();
  updateClasses();
  loadSavedEvents();
  saveEventListener();
});
