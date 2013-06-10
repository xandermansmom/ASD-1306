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
var editThis = function (foodId) {

    var value = localStorage.getItem(foodId);
    var fd = JSON.parse(value);

    //populate fields with localStorage data

    $('dish').value = fd.dish[1];
    $('cat').value = fd.cat[1];
    $('rate').value = fd.rate[1];
    $('restaurant').value = fd.restaurant[1];
    $('favorite').is(':checked');
    $('comment').value = fd.comment[1];

    //Change Submit Button value to Edit Button
    $('#save').val = "Edit Data";
    var editSubmit = $("#save");
    //Clear items in HTML cache
    value.innerHTML = "";
    if (saveData(foodId)) {
        editSubmit.key = foodId;

        alert("The data was edited.");
        $.mobile.changePage("#home");
        return false;
    }
};


//DELETE
var deleteThis = function (foodId) {
    if (localStorage.length === 0) {
        alert("There are no records to delete.");
    } else {
        if (confirm("Are you sure you want to delete this record?")) {
            localStorage.removeItem(foodId);
            alert("The record has been deleted.");
            location.reload();
            return false;

        }
    }
};

//CLEAR LOCAL
var clearData = function () {
    //Alert if no data in local storage
    if (localStorage.length === 0) {
        alert("There is no data to clear.");
    } else {
        //If there is data to clear, confirm you want to delete all local storage
        if (confirm("Are you sure you want to delete all the entries ? ")) {
            localStorage.clear();
            alert("All data is cleared.");
            $.mobile.changePage("#home");
			return false;
        }
    }

};

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

              
                createEditButton = $("<a></a>").attr({
                    "href": "addForm",
                    "id": "editButton",
                    "data-role": "button",
                    "data-theme": "a",
                    "data-ajax": "false",
                    "data-inline": "true",
                    "key": key
            })
                .html("Edit Record");
                

                createDeleteButton = $("<a></a>").attr({
                    "href": "#view",
                    "id": "deleteButton",
                    "data-role": "button",
                    "data-theme": "a",
                    "data-ajax": "false",
                    "data-inline": "true",
                    "data-key": key
            })
                .html("Delete Record");

                createClearButton = $("<a></a>").attr({
                	"href": "#view",
                	"id": "clearButton",
                	"data-role": "button",
                	"data-theme": "a",
                	"data-ajax": "false",
                	"data-inline": "true",
                	"data-key": key
            })
                
    
          //Append form data to view page
          $("#view").append(createSubList);
          createLi.appendTo(createSubList);

          //Create edit button and attach to each individual record
          createEditButton.appendTo(createSubList);
          $(".editButton").on("click", editThis);


          //Create delete button and attach to each individual record
          createDeleteButton.appendTo(createSubList);
          $(".deleteButton").on("click", deleteThis);


          //Add Clear Local Storage Button to View page
          createClearButton.appendTo("#view");
          $(".clearButton").on("click", clearData);

   };


console.log(localStorage);

});





 