

$(document).ready(function() {
    /* global moment */
  
    // blogContainer holds all of our meals
    var Meallog = $("#meallog");
    // var pastjournal = $("#pastjournal");
    // var searchdate = $("#finddate");
    // var getdate = searchdate.val();

    // $(pastjournal).on("submit", function(event) {
    //   event.preventDefault();
    //   $.get("/api/history/:date" + getdate, function(data){console.log(data)})


    // })

    // Click events for the edit and delete buttons

    // Variable to hold our meals
    var meals;

    getMeals();
    
  
  
    // This function grabs meals from the database and updates the view
    function getMeals(user) {
      $.get("/api/todaysjournal", function(data) {
        console.log("Journal Entries for Today", data);
        meals = data;
        initializeRows();
        
      });
    }

    // InitializeRows handles appending all of our constructed meal HTML inside blogContainer
    function initializeRows() {
      debugger;
      Meallog.empty();
      var mealstoadd = [];
      for (var i = 0; i < meals.length; i++) {
        mealstoadd.push(createNewRow(meals[i]));
      }
      Meallog.append(mealstoadd);
    }
  
    // This function constructs a meal's HTML
    function createNewRow(meal) {
      debugger;
      var formattedDate = meal.createdAt;
      formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
      var newmealCard = $("<div>");
      newmealCard.addClass("card");
      var newmealCardHeading = $("<div>");
      newmealCardHeading.addClass("card-header");
      var newmealTitle = $("<h2>");
      var newmealDate = $("<small>");
      var newmealCardBody = $("<div>");
      newmealCardBody.addClass("card-body");
      var newmealBody = $("<p>");
      newmealTitle.text(meal.meal + " ");
      newmealBody.text(meal.food);
      newmealDate.text(formattedDate);
      newmealTitle.append(newmealDate);
      newmealCardHeading.append(newmealTitle);
      newmealCardBody.append(newmealBody);
      newmealCard.append(newmealCardHeading);
      newmealCard.append(newmealCardBody);
      newmealCard.data("meal", meal);
      return newmealCard;
    }
  
  });
  