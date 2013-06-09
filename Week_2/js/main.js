//Michele Laramore
//ASD 1306



//GLOBAL VARIABLES

//SAVE
var saveData = function (key) {
    var foodId = Math.floor(Math.random() * 100000001);
    if (!key) {

    } else {

        //Set id to existing key to allow for editing instead of creating new data
        foodId = key;
    }

    var food = {};
    //Gather form field values and store in an object
    //Object properties contain an array with the form label and input value
    food.dish = ["Add a Dish:", $("#dish").val()];
    food.category = ["Type of Dish:", $("#cat").val()];
    food.rating = ["Rating:", $("#rate").val()];
    food.restaurant = ["Restaurant:", $("#restaurant").val()];
    food.favorite = ["Favorite:", $('#favorite').is(':checked')];
    food.comment = ["Comment:", $("#comment").val()];

    // Use Stringify to convert food obejct to a string
    localStorage.setItem(foodId, JSON.stringify(food));
    alert("Entry is saved!");
			window.location.reload("#");
			return false;
	};

//EDIT

//DELETE

//CLEAR LOCAL
var clearData = $("#clear").on("click ", function () {
    //Alert if no data in local storage
    if (localStorage.length === 0) {
        alert("There is no data to clear.");
    } else {
        //If there is data to clear, confirm you want to delete all local storage
        if (confirm("Are you sure you want to delete all the entries ? ")) {
            localStorage.clear();
            alert("All data is cleared.");
            location.reload();
            return false;
        }
    }

});

//HOME PAGE
$('#home').on('pageinit', function(){
    //code needed for home page goes here
});
    
 //ADD PAGE
  $('#add').on('pageinit', function (e) {

    $('#addForm').validate({
        //Run if validation errors occur
        invalidHandler: function (form, validator) {

            var empty = '';
            if (empty === true) {
                e.preventDefault();
                return;
            }
        },

        //Run if valid       
        submitHandler: function (form) {
            saveData();
            alert("Submitting Form!");
            location.reload(true);
        }

    });
});

 //VIEW PAGE--only showing first form entry
$('#view').on('pageinit', function (foodId, food) {

    if (localStorage.length === 0) {
        alert("There is no data in local storage so default data was added.");
        //autoFillData();
    }

    $.mobile.changePage("#view");

    for(var i=0, l=localStorage.length; i<l;i++){
			var key = localStorage.key(i),
				fd = JSON.parse(localStorage.getItem(key)),
				createSubList = $('<div></div>'),
				createLi = $(
        
               "<p>" +"Dish:"+ " " + fd.dish[1] + "</p>" + 
               "<p>" + "Category:" + " " + fd.category[1] + "</p>" + 
               "<p>" + "Rating:" + " " + fd.rating[1] + "</p>" + 
               "<p>" + "Restaurant:" + " " + fd.restaurant[1] + "</p>" + 
               "<p>" + "Favorite:" + " " + fd.favorite[1] + "</p>" + 
               "<p>" + "Comment:" + " " + fd.comment[1] + "</p>" );


          $("#view").append(createSubList);
          createLi.appendTo(createSubList);
      

   

    $("#clear").appendTo('#view');
    
    //createEditButton.appendTo("#view");
    //$(".btnEdit").on("click", editThis);
    //createDeleteButton.appendTo("#view");
   // $(".btnDelete").on("click", deleteThis);
    }



console.log(localStorage);
});





 