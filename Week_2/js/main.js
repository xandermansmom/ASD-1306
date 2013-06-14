//Michele Laramore
//ASD 1306



//GLOBAL VARIABLES

//SAVE--works


var saveData = function (key) {

    var foodId,
        food;

  if (!key){

         foodId = Math.floor(Math.random() * 100000001);

    } else {

       foodId = key;
    }

     food = {};
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

//EDIT --is not replacing data but creating a new form data
var editThis = function() {
    var fd = JSON.parse(localStorage.getItem($(this).attr('data-key')));
console.log($(this).attr('data-key')); 
    //populate fields with localStorage data
       
     $.mobile.changePage("#add");

  
    $('#dish').val(fd.dish[1]);
    $('#cat').val(fd.category[1]);
    $('#rate').val(fd.rating[1]);
    $('#restaurant').val(fd.restaurant[1]);
    $('#favorite').is(':checked');
    $('#comment').val(fd.comment[1]);

    $('#save').prev('.ui-btn-inner').children('.ui-btn-text').html('Update');
    $("#save").val('Update').data('key');
};

//DELETE --works
var deleteThis = function () {
    if (localStorage.length === 0) {
        alert("There are no records to delete.");
    } else {
        if (confirm("Are you sure you want to delete this record?")) {
            localStorage.removeItem($(this).attr('data-key'));
            alert("The record has been deleted.");
            location.reload("#");
            return false;
        } else {
            alert("Record was not deleted.");

        }
    }
};

//CLEAR LOCAL--works
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
$('#home').on('pageinit', function () {
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

//VIEW PAGE--works
$('#view').on('pageinit', function () {

    if (localStorage.length === 0) {
        alert("There is no data in local storage so default data was added.");
        //autoFillData();
    }

    $.mobile.changePage("#view");

    for (var i = 0, l = localStorage.length; i < l; i++) {
        var key = localStorage.key(i),
            fd = JSON.parse(localStorage.getItem(key)),
            createSubList = $('<div></div>'),
            //edit button is opening blank form field and not local storage

            createLi = $(

                "<p>" + "Dish:" + " " + fd.dish[1] + "</p>" +
                "<p>" + "Category:" + " " + fd.category[1] + "</p>" +
                "<p>" + "Rating:" + " " + fd.rating[1] + "</p>" +
                "<p>" + "Restaurant:" + " " + fd.restaurant[1] + "</p>" +
                "<p>" + "Favorite:" + " " + fd.favorite[1] + "</p>" +
                "<p>" + "Comment:" + " " + fd.comment[1] + "</p>");



        //Append form data to view page
        $("#view").append(createSubList);
        createLi.appendTo(createSubList);


        //Run clearData function                  
        $("#clear").on("click", clearData);


        var createEditButton = $("<button data-key='" + key + "'></button>").attr({
                "href": "#add",
                "name": "editButton",
                "data-role": "button",
                "data-theme": "a",
                "data-ajax": "false",
                "data-inline": "true",
                "key": key
        })
            .html("Edit Record");
        //Attach edit button to individual records
        createEditButton.appendTo(createSubList);
        $(".editButton").on("click", editThis);

        //delete button works, deletes individual records
        var createDeleteButton = $("<button data-key='" + key + "'></button>").attr({
                "href": "#view",
                "name": "deleteButton",
                "data-role": "button",
                "data-theme": "a",
                "data-ajax": "false",
                "data-inline": "true",
                "data-key": key
        })
            .html("Delete Record");
        //Attach delete button to individual records
        createDeleteButton.appendTo(createSubList);
        $(".deleteButton").on("click", deleteThis);
    }
    //AJAX CALL FOR JSON DATA
    $.ajax({
        url: 'xhr/json.js',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            for (var i = 0, j = data.length; i < j; i++) {
                var fd = data[i];
                $('' +
                    '<div class = "content">' +
                    "<p>" + fd.dish + "</p>" +
                    "<p>" + fd.category + "</p>" +
                    "<p>" + fd.rating + "</p>" +
                    "<p>" + fd.restaurant + "</p>" +
                    "<p>" + fd.favorite + "</p>" +
                    "<p>" + fd.comment + "</p>" +
                    '</div>').appendTo('#fdContent');

            }

        }
    });


    //AJAX CALL FOR XML DATA

    $.ajax({
        url: 'xhr/data.xml',
        type: 'GET',
        dataType: 'xml',
        success: function (data) {
            for (var i = 0, j = data.length; i < j; i++) {
                var fd = data[i];
                $('' +
                    '<div class = "content">' +
                    "<p>" + fd.dish + "</p>" +
                    "<p>" + fd.category + "</p>" +
                    "<p>" + fd.rating + "</p>" +
                    "<p>" + fd.restaurant + "</p>" +
                    "<p>" + fd.favorite + "</p>" +
                    "<p>" + fd.comment + "</p>" +
                    '</div>')
                    .appendTo("#fdContent");
            }
        }
    });
});