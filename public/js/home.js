$(document).ready(function() {
    /* global moment */
  
    // blogContainer holds all of our meals
    var Meallog = $("#meallog");

    // Click events for the edit and delete buttons
    // $(document).on("click", "button.delete", handleMealDelete);
    // $(document).on("click", "button.edit", handleMealEdit);
    // Variable to hold our meals
    var meals;

    getMeals();
    
  
  
    // This function grabs meals from the database and updates the view
    function getMeals(user) {
    
      $.get("/api/allmeals", function(data) {
        console.log("meals", data);
        meals = data;
        initializeRows();
        
      });
    }
  
    // This function does an API call to delete meals
    // function deletemeal(id) {
    //   $.ajax({
    //     method: "DELETE",
    //     url: "/api/meals/" + id
    //   })
    //     .then(function() {
    //       getMeals(mealCategorySelect.val());
    //     });
    // }
  
    // InitializeRows handles appending all of our constructed meal HTML inside blogContainer
    function initializeRows() {
      Meallog.empty();
      var mealstoadd = [];
      for (var i = 0; i < meals.length; i++) {
        mealstoadd.push(createNewRow(meals[i]));
      }
      Meallog.append(mealstoadd);
    }
  
    // This function constructs a meal's HTML
    function createNewRow(meal) {
      var formattedDate = new Date(meal.createdAt);
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
  
    // // This function figures out which meal we want to delete and then calls deletemeal
    // function handleMealDelete() {
    //   var currentmeal = $(this)
    //     .parent()
    //     .parent()
    //     .data("meal");
    //   deletemeal(currentmeal.id);
    // }
  
    // // This function figures out which meal we want to edit and takes it to the appropriate url
    // function handleMealEdit() {
    //   var currentmeal = $(this)
    //     .parent()
    //     .parent()
    //     .data("meal");
    //   window.location.href = "/cms?meal_id=" + currentmeal.id;
    // }
  
    // // This function displays a message when there are no meals
    // function displayEmpty(id) {
    //   var query = window.location.search;
    //   var partial = "";
    //   if (id) {
    //     partial = " for user #" + id;
    //   }
    //   blogContainer.empty();
    //   var messageH2 = $("<h2>");
    //   messageH2.css({ "text-align": "center", "margin-top": "50px" });
    //   messageH2.html("No meals yet" + partial + ", navigate <a href='/cms" + query +
    //   "'>here</a> in order to get started.");
    //   blogContainer.append(messageH2);
    // }
  
  });
  