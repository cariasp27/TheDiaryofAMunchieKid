$(document).ready(function () {
  /* global moment */
  // grabs the button for routing to Planned Meals
  var gotoplanner = $("#goplan");

  // Meallog holds all of our meals
  var Meallog = $("#meallog");
  var Pastlog = $("#pastlog");
  var searchdate = $("#searchdate");
  var getdate;

  // Variable to hold our meals
  var meals;
  var pastmeals;
  // upon pageload, run GET to generate journal for Today
  gettodaysMeals();
  // When a user clicks on the Start Planning button, they are redirected.
  $(gotoplanner).on("click", function(event){
    event.preventDefault();
  });
  // When a user submits a date, use it to find journal entries on that date
  $("#pastjournal").on("submit", function (event) {
    console.log(searchdate);
    event.preventDefault();
    console.log(event);

    getdate = searchdate.val();
    console.log("the user is looking for journal entries on: " + getdate);
    getpastMeals();
  });
  // This function grabs past meals from the database that were created on the getdate
  //  and updates the view
  function getpastMeals(user) {
    $.ajax({
      method: "GET",
      url: "/api/history/" + getdate,
      dataType: "json"
    })
      .then(function (data) {
        console.log("Journal Entry", data);
        pastmeals = data;
        initializeoldRows();
      });
  };

  // This function grabs TODAY'S meals from the database and updates the view
  function gettodaysMeals(user) {
    $.ajax({
      method: "GET",
      url: "/api/todaysjournal",
      dataType: "json"
    })
      .then(function (data) {
        console.log("Journal Entry", data);
        meals = data;
        initializeRows();
      });
  };
  // InitializeRows handles appending all of our constructed meal HTML inside Meal Log
  function initializeRows() {
    Meallog.empty();
    var mealstoadd = [];
    for (var i = 0; i < meals.length; i++) {
      mealstoadd.push(createNewRow(meals[i]));
    }
    Meallog.append(mealstoadd);
  }
  // InitializeoldRows handles appending all of our constructed meal HTML inside Past Log
  function initializeoldRows() {
    Pastlog.empty();
    var pastmealstoadd = [];
    for (var i = 0; i < pastmeals.length; i++) {
      pastmealstoadd.push(createNewRow(pastmeals[i]));
    }
    Pastlog.append(pastmealstoadd);
  }

  // This function constructs a meal's HTML
  function createNewRow(meal) {
    debugger;

    var formattedDate = meal.createdAt;
    
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    
    var newmealCard = $("<div>");
    newmealCard.addClass("card");
    
    var newmealTitle = $("<span class='meal'>");
    
    var newmealFood = $("<span class='food'>")
    
    var newmealDate = $("<div class='hoverdate' style='display: none'>");
    
    var newmealCardBody = $("<div>");
    
    newmealCardBody.addClass("card-body");
    
    newmealFood.text(meal.food + " : ");
    
    newmealTitle.text(meal.meal + " : ");
    
    newmealDate.text(formattedDate);
    
    newmealCardBody.append(newmealTitle);

    newmealCardBody.append(newmealFood);

    newmealCardBody.append(newmealDate);
    
    newmealCard.append(newmealCardBody);
    
    newmealCard.data("meal", meal);
    
    return newmealCard;
  }
});
