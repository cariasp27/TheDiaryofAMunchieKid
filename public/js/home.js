

$(document).ready(function() {
    /* global moment */
  
    // blogContainer holds all of our meals
    var Meallog = $("#meallog");
    // var Pastlog = $("#pastlog");
    // var pastjournal = $("#pastjournal");
    // var searchdate = $("#searchdate");
    // var getdate;

    // $(pastjournal).on("submit", function(event) {
    //   event.preventDefault();
    //   $.get("/api/history/:date" + getdate, function(data){console.log(data)})


    // })

    // Click events for the edit and delete buttons

    // Variable to hold our meals
    var meals;
    // var pastmeals;

    getMeals();
    $("#pastjournal").on("submit", function(event){
      event.preventDefault();
      console.log(event);

      getdate = searchdate.val();
      console.log(getdate);
      getpastMeals();
    });

    function getpastMeals(user) {
    
    
    //   // $.get("/api/todaysjournal", function(data) {
    //   //   console.log("Journal Entries for Today", data);
    //   //   meals = data;
    //   //   initializeRows();
        
    //   // });
    
    $.ajax({
      method: "GET",
      url: "/api/history/",
      dataType: "json"
    })
      .then(function(data) {
        console.log("Journal Entry", data);
        pastmeals = data;
        initializeoldRows();
      });
    };
  
    // This function grabs meals from the database and updates the view
    function getMeals(user) {
      // $.get("/api/todaysjournal", function(data) {
      //   console.log("Journal Entries for Today", data);
      //   meals = data;
      //   initializeRows();
        
      // });
    
    $.ajax({
      method: "GET",
      url: "/api/todaysjournal",
      dataType: "json"
    })
      .then(function(data) {
        console.log("Journal Entry", data);
        meals = data;
        initializeRows();
      });
    };
    // InitializeRows handles appending all of our constructed meal HTML inside blogContainer
    function initializeRows() {
      Meallog.empty();
      var mealstoadd = [];
      for (var i = 0; i < meals.length; i++) {
        mealstoadd.push(createNewRow(meals[i]));
      }
      Meallog.append(mealstoadd);
    }

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
      var formattedDate = meal.createdAt;
      formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
      var newmealCard = $("<div>");
      newmealCard.addClass("card");
      var newmealTitle = $("<p>");
      var newmealFood = $("<small>")
      var newmealDate = $("<small>");
      var newmealCardBody = $("<div>");
      newmealCardBody.addClass("card-body");
      newmealFood.text(meal.food + ": ");
      newmealTitle.text(meal.meal + ": ");
      newmealDate.text(formattedDate);
      newmealFood.append(newmealDate);
      newmealTitle.append(newmealFood);
      newmealCardBody.append(newmealTitle);
      newmealCard.append(newmealCardBody);
      newmealCard.data("meal", meal);
      return newmealCard;
    }
  
  });
  