//Michele Laramore
//ASD 1306

//GLOBAL VARIABLES

var autoFillData = function () {
    // gets button name to determine which type of AJAX call to make
    var type = $(this).attr('id');

    //AJAX CALL FOR JSON DATA
    if (type === 'getJSON') {
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
                        '</div>').appendTo('#jsonContent');
                    console.log('JSON loaded');
                    console.log(data);
                    for (var n in data) {
                      var id = Math.floor(Math.random() * 1000000);
                        localStorage.setItem(id, JSON.stringify(data[n]));

                    }
                }
            },
            error: function(error, parseerror) {
                console.log('Error: ' + error + '\nParse Error: ' + parseerror);
            }
    });



    } else if (type === 'getXML') {
        //AJAX CALL FOR XML DATA

        $.ajax({
            url: 'xhr/data.xml',
            type: 'GET',
            dataType: 'xml',
            success: function (data) {
                console.log('XML Loaded');
                console.log(data);
                $(data).find('food').each(function () {
                    var item = $(this);
                    var string = "";
                    string += '{"Dish":"' + item.find('dish').text() + '",';
                    string += '""Category:"' + item.find('category').text() + '",';
                    string += '"Rating":"' + item.find('rating').text() + '",';
                    string += '"Restaurant":"' + item.find('restaurant').text() + '",';
                    string += '"Favorite":"' + item.find('favorite').text() + '",';
                    string += '"Comment":"' + item.find('comment').text() + '"}';
                    console.log(string);


                    var id = Math.floor(Math.random() * 1000000);
                    localStorage.setItem(id, string);

                });
            }
        });
  
    }
       

};



//SAVE--works


var saveData = function (key) {

    var foodId,
    food;

    if (!key) {

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
var editThis = function () {
    var key = $(this).data('key');
    var fd = JSON.parse(localStorage.getItem($(this).data('key')));
    console.log($(this).data('key'));
    //populate fields with localStorage data

    $.mobile.changePage("#add");


    $('#dish').val(fd.dish[1]);
    $('#cat').val(fd.category[1]).selectmenu("refresh");
    $('#rate').val(fd.rating[1]).selectmenu("refresh");
    $('#restaurant').val(fd.restaurant[1]);
    if (fd.favorite[1] === true) {
        $("#favorite").attr('checked', true).checkboxradio('refresh');
    }
    $('#comment').val(fd.comment[1]);
    $('#save').prev('.ui-btn-inner').children('.ui-btn-text').html('Update');
    $("#save").val('Update').data('key');
};


//DELETE --works
function deleteThis() {
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
}

//CLEAR LOCAL--works
function clearData() {
    //Hide Clear Button & Alert if no data in local storage
    if (localStorage.length === 0) {
        alert("There is no data to delete.");
    } else {
        //If there is data to clear, confirm you want to delete all local storage
        if (confirm("Are you sure you want to delete all the entries ? ")) {
            localStorage.clear();
            alert("All data is cleared.");
            $.mobile.changePage("#home");
            return false;
        }
    }

}


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
        $('#clearButton').hide();
        alert("There is no data in local storage. Please choose JSON or XML data to load.");          
    } else { 
        if (localStorage.length!==0){
            $("#getJSON").hide();
            $("#getXML").hide();
        }
    }

    $.mobile.changePage("#view");


       $('#getJSON').on('click', function(){
         autoFillData();
        console.log('click');
        });
        
            
        $('#getXML').on('click', function() {
        autoFillData();
        console.log('click');
        });
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
                "class": "editButton",
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
                "class": "deleteButton",
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

});