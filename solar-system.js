//Global objects
var sun = {};
var earth = {};
var mars = {};
var divisor = 1;

//All function declarations
function resetAll() {
  sun = { size: 1377648, sizeUnits: "km", distance: 0, distanceUnits: "km" };
  earth = {
    size: 12756,
    sizeUnits: "km",
    distance: 149600000,
    distanceUnits: "km"
  };
  mars = {
    size: 6788,
    sizeUnits: "km",
    distance: 227900000,
    distanceUnits: "km"
  };
}
//Convert math results into convenient units
function simplify(obj) {
  if (obj.size < 1 && obj.sizeUnits == "km") {
    obj.size *= 1093.61; //multiply by num of yards per km
    obj.sizeUnits = "yards";
  }
  if (obj.size < 1 && (obj.sizeUnits = "yards")) {
    obj.size *= 36; //inches per yard
    obj.sizeUnits = "inches";
  }
  if (obj.size < 1 && (obj.sizeUnits = "inches")) {
    obj.size *= 25.4; // millimeters per inch
    obj.sizeUnits = "millimeters";
  }
  //All elses and elseifs == Do nothing
  if (obj.distance < 1 && obj.distanceUnits == "km") {
    obj.distance *= 1093.61;
    obj.distanceUnits = "yards";
  }
  if (obj.distance < 1 && (obj.distanceUnits = "yards")) {
    obj.distance *= 36;
    obj.distanceUnits = "inches";
  }
  if (obj.distance < 1 && (obj.distanceUnits = "inches")) {
    obj.distance *= 25.4;
    obj.distanceUnits = "millimeters";
  }
}

function alterDimensions(obj) {
  if (obj !== sun) {
    obj.distance /= divisor;
  }
  obj.size /= divisor;
}

function calculateAll() {
  alterDimensions(earth);
  alterDimensions(sun);
  alterDimensions(mars); //Could merge these
  simplify(earth);
  simplify(sun);
  simplify(mars);
}

function populateFields() {
  $("#sunSize").html(sun.size.toFixed(2) + " " + sun.sizeUnits);
  $("#earthSize").html(earth.size.toFixed(2) + " " + earth.sizeUnits);
  $("#marsSize").html(mars.size.toFixed(2) + " " + mars.sizeUnits);
  $("#earthDistance").html(
    earth.distance.toFixed(2) + " " + earth.distanceUnits
  );
  $("#marsDistance").html(mars.distance.toFixed(2) + " " + mars.distanceUnits);
}

//Populate defaults when page loads
resetAll();
calculateAll();
populateFields();

//Event
$("#divisor").keyup(function() {
  if ($.isNumeric($(this).val())) {
    divisor = $(this).val();
    resetAll();
    calculateAll();
    populateFields();
  }
});
