$(document).ready(function () {
    /* global moment */
  
    // Planlog holds all of our planned meals
    var Planlog = $("#planlog")
    // Variable to hold our meals
    var meals;
    var plannedmeals;
    // upon pageload, run GET to generate planned meals
    getplannedmeals();
    // This function grabs planned meals from the database
    //  and updates the view
    function getplannedmeals(user) {
      $.ajax({
        method: "GET",
        url: "/api/plannedmeal",
        dataType: "json"
      })
        .then(function (data) {

          console.log("Journal Entry", data);
          plannedmeals = data;
          initializeplannedRows();
        });
    };
  
    // initializeplannedRows handles appending all of our constructed meal HTML inside Plan Log
    function initializeplannedRows() {
        debugger;
      Planlog.empty();
      var plannedmealstoadd = [];
      for (var i = 0; i < plannedmeals.length; i++) {
        plannedmealstoadd.push(createNewRow(plannedmeals[i]));
      }
      Planlog.append(plannedmealstoadd);
    }
  
    // This function constructs a meal's HTML
    function createNewRow(meal) {
        debugger;
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
  