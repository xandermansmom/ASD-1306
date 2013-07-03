 //SAVE RECORD
var editKey = null;
var food = {};

function saveData() {

if (editKey === null){
     var foodId = Math.floor(Math.random() * 100000001); 
          console.log(foodId);
    }else{
         editKey = {
             _id: editKey._id,
             _rev: editKey._rev 
    };
          console.log(editKey);        
        
    }
    //Gather form field values and store in an object
    //Object properties contain an array with the form label and input value
   
    food.dish = ["Add a Dish:", $("#dish").val()];
    food.category = ["Type of Dish:", $("#cat").val()];
    food.rating = ["Rating:", $("#rate").val()];
    food.restaurant = ["Restaurant:", $("#restaurant").val()];
    food.favorite = ["Favorite:", $('#favorite').is(':checked')];
    food.comment = ["Comment:", $("#comment").val()];

   console.log(food);
    $.couch.db("asd").saveDoc(food, {
        success: function (data) {
        console.log(data);
            alert("Food Rating Data is Saved!");
        },
        error: function(status) {
        console.log(status);
        }
     });
}
   

$("#save").on("click", function(){
   saveData(editKey);
   $.mobile.changePage('#view'); 
    return false;
 });


//DELETE RECORD
function deleteThis(id, rev) {
    if (localStorage.length === 0) {
        alert("There are no records to delete.");
    } else {
        if (confirm("Are you sure you want to delete this record?")) {
            $.couch.db('asd').removeDoc({
                _id: "",
                _rev: ""
            }, {
                success: function (data) {
                    alert("The record has been deleted.");
                    location.reload("#");
                    return false;
                }
            });
        }
    }
}


//$.mobile.changePage("#view");

///CLEAR RECORD
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
 //Run clearData function                  
$("#clear").on("click", clearData);
        
//EDIT RECORD
var editThis = function (id, rev) {
 editKey = {
               _id: editKey._id,
               _rev: editKey._rev 
            };    
    //populate fields with localStorage data

    //$.mobile.changePage("#add");


    $('#dish').val(food.dish[1]);
    $('#cat').val(food.category[1]).selectmenu("refresh");
    $('#rate').val(food.rating[1]).selectmenu("refresh");
    $('#restaurant').val(food.restaurant[1]);
    if (food.favorite[1] === true) {
        $("#favorite").attr('checked', true).checkboxradio('refresh');
    }
    $('#comment').val(food.comment[1]);
    $('#save').prev('.ui-btn-inner').children('.ui-btn-text').html('Update');
    $("#save").val('Update').data('id');
};

var editButton = $("<button><a href='#add' id='edit'>Edit Record</a></button>");
editButton.on('click', function (id, rev) {
    $.couch.db("asd").openDoc(id, {
        success: function (data) {
            editKey = {
               _id: editKey._id,
               _rev: editKey._rev 
            };
            console.log(editKey);
            $("#dish").val(food.rating);
            $("#restaurant").val(food.restaurant);
            $("#favorite").val(food.favorite);
            $("#comment").val(food.comment);
            console.log(editKey);
        }
    });
});
  

var deleteButton = $("<button><a href='#' id='delete'>Delete Record</a></button>");
deleteButton.on('click', function (id, rev) {
    editKey = {
                _id: editKey._id,
             _rev: editKey._rev 
    };
    console.log(editKey);
    var ask = confirm("Are you sure you want to delete this Record?");
    if (ask) {
        $.couch.db("asd").removeDoc(editKey, {
            success: function (data) {
                editKey = null;

                window.location.reload("#");
            }
        });
    }
});

var urlVars = function()
{
    var urlData = $($.mobile.activePage).data("url");
    var urlParts = urlData.split('?');
    var urlPairs = urlParts[1].split('&');
    //loop over the pairs
    var urlValues = {};
    for (var pair in urlPairs)
    {
        var keyValue = urlPairs[pair].split('=');
        var key = decodeURIComponent(keyValue[0]);
        var value = decodeURIComponent(keyValue[1]);
        urlValues[key] = value;
    }
    return urlValues;
};


//HOME PAGE
$('#home').on('pageinit', function () {
    //code needed for home page goes here
});


//ADD PAGE
$(document).on('pageinit', '#add', function (e) {

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

//VIEW
$(document).on('pageinit', '#view', function () {

    var autoFillData = function () {
        $.couch.db("asd").view("app/asd", {
            success: function (data) {
                console.log(data);
                var createSubList = $('<div>');
                $.each(data.rows, function (index, fd) {
                    $('' +
                        '<div class = "content">' +
                        "<p>" + fd.value.dish + "</p>" +
                        "<p>" + fd.value.category + "</p>" +
                        "<p>" + fd.value.rating + "</p>" +
                        "<p>" + fd.value.restaurant + "</p>" +
                        "<p>" + fd.value.favorite + "</p>" +
                        "<p>" + fd.value.comment + "</p>" +
                        '</div>').appendTo('#jsonContent');
                    console.log('JSON loaded');
                    console.log(data);
                });
            },
            error: function (error, parseerror) {
                console.log('Error: ' + error + '\nParse Error: ' + parseerror);
            }
        });
    };
    
     $.couch.db('asd').view('app/dishes', {
                success: function (data) {
                    console.log(data.rows);
                    if (data.rows.length === 0) {
                        autoFillData();
                        alert("There is no saved data so sample data was added.");
                    }
                    $.each(data.rows, function (index, dishes) {
                        var id = dishes.value.id;
                        var rev =dishes.value.rev;
                        var createSubList = $('<ul>');
                        var dish =dishes.value.dish;
                        var rating = dishes.value.rating;
                        var restaurant = dishes.value.restaurant;
                        var favorite = dishes.value.favorite;
                        var comment = dishes.value.comment;
                        $('ul #dishlist').append('<li>' + dish + '</li>');
                        $('ul #dishlist').append('<li>' + rating + '</li>');
                        $('ul #dishlist').append('<li>' + restaurant + '</li>');
                        $('ul #dishlist').append('<li>' + favorite + '</li>');
                        $('ul #dishlist').append('<li>' + comment + '</li>');
                        
 createSubList.append("#dishlist").append(editButton).append('<br>').append(deleteButton.append('<br />').appendTo("#dishlist"));
});

    $.couch.db('asd').view('app/appetizer', {
        success: function (data) {
            console.log(data.rows);
            if (data.rows.length === 0) {
                autoFillData();
                alert("There is no saved data so sample data was added.");
            }

            $.each(data.rows, function (index, appetizer) {
                var id = appetizer.value.id;
                var rev = appetizer.value.rev;
                var createSubList = $('<ul>');
                var dish = appetizer.value.dish;
                var rating = appetizer.value.rating;
                var restaurant = appetizer.value.restaurant;
                var favorite = appetizer.value.favorite;
                var comment = appetizer.value.comment;
                $('ul #applist').append('<li>' + dish + '</li>');
                $('ul #applist').append('<li>' + rating + '</li>');
                $('ul #applist').append('<li>' + restaurant + '</li>');
                $('ul #apphlist').append('<li>' + favorite + '</li>');
                $('ul #applist').append('<li>' + comment + '</li>');

                createSubList.append("#applist").append(editButton).append('<br>').append(deleteButton.append('<br />').appendTo("#applist"));

            });

            $.couch.db('asd').view('app/main_course', {
                success: function (data) {
                    console.log(data.rows);
                    if (data.rows.length === 0) {
                        autoFillData();
                        alert("There is no saved data so sample data was added.");
                    }
                    $.each(data.rows, function (index, main_course) {
                        var id = main_course.value.id;
                        var rev = main_course.value.rev;
                        var createSubList = $('<ul>');
                        var dish = main_course.value.dish;
                        var rating = main_course.value.rating;
                        var restaurant = main_course.value.restaurant;
                        var favorite = main_course.value.favorite;
                        var comment = main_course.value.comment;
                        $('ul #mainlist').append('<li>' + dish + '</li>');
                        $('ul #mainlist').append('<li>' + rating + '</li>');
                        $('ul #mainlist').append('<li>' + restaurant + '</li>');
                        $('ul #mainlist').append('<li>' + favorite + '</li>');
                        $('ul #mainlist').append('<li>' + comment + '</li>');
                        
 createSubList.append("#mainlist").append(editButton).append('<br>').append(deleteButton.append('<br />').appendTo("#mainlist"));

                        editButton.on('click', function (id, rev) {
                            $.couch.db("asd").openDoc(id, {
                                success: function (data) {
                                    editKey = {
                                         _id: editKey._id,
                                         _rev: editKey._rev 
                                    };
                                    console.log(editKey);
                                    $("#dish").val(rating);
                                    $("#restaurant").val(restaurant);
                                    $("#favorite").val(favorite);
                                    $("#comment").val(comment);
                                    console.log(editKey);
                                }
                            });
                        });
                    });
                }
            });


            deleteButton.on('click', function (id, rev) {
                editKey = {
                    _id: editKey._id,
                    _rev: editKey._rev 
                };
                console.log(editKey);
                var ask = confirm("Are you sure you want to delete this Record?");
                if (ask) {
                    $.couch.db("asd").removeDoc(editKey, {
                        success: function (data) {
                            editKey = null;

                            window.location.reload("#");
                        }
                    });
                }
            });
           
        }
    });

    $.couch.db('asd').view('app/side_order', {
        success: function (data) {
            console.log(data.rows);
            if (data.rows.length === 0) {
                autoFillData();
                alert("There is no saved data so sample data was added.");
            }
            $.each(data.rows, function (index, side_order) {
                var id = side_order.value.id;
                var rev = side_order.value.rev;
                var createSubList = $('<ul>');
                var dish = side_order.value.dish;
                var rating = side_order.value.rating;
                var restaurant = side_order.value.restaurant;
                var favorite = side_order.value.favorite;
                var comment = side_order.value.comment;
                $('ul #sidelist').append('<li>' + dish + '</li>');
                $('ul #sidelist').append('<li>' + rating + '</li>');
                $('ul #sidelist').append('<li>' + restaurant + '</li>');
                $('ul #sidelist').append('<li>' + favorite + '</li>');
                $('ul #sidelist').append('<li>' + comment + '</li>');
                createSubList.append("#sidelist").append(editButton).append('<br>').append(deleteButton.append('<br />').appendTo("#sidelist"));

            });
           }
      });
            $.couch.db('asd').view('app/soups_and_salads', {
                success: function (data) {
                    console.log(data.rows);
                    if (data.rows.length === 0) {
                        autoFillData();
                        alert("There is no saved data so sample data was added.");
                    }
                    $.each(data.rows, function (index, soups_and_salads) {
                        var id = soups_and_salads.value.id;
                        var rev = soups_and_salads.rev;
                        var createSubList = $('<ul>');
                        var dish = soups_and_salads.value.dish;
                        var rating = soups_and_salads.value.rating;
                        var restaurant = soups_and_salads.value.restaurant;
                        var favorite = soups_and_salads.value.favorite;
                        var comment = soups_and_salads.value.comment;
                        $('ul #sslist').append('<li>' + dish + '</li>');
                        $('ul #sslist').append('<li>' + rating + '</li>');
                        $('ul #sslist').append('<li>' + restaurant + '</li>');
                        $('ul #sslist').append('<li>' + favorite + '</li>');
                        $('ul #sslist').append('<li>' + comment + '</li>');

                        createSubList.append("#sslist").append(editButton).append('<br>').append(deleteButton.append('<br />').appendTo("#sslist"));

                    });
                }
            });

                    $.couch.db('asd').view('app/dessert', {
                        success: function (data) {
                            console.log(data.rows);
                            if (data.rows.length === 0) {
                                autoFillData();
                                alert("There is no saved data so sample data was added.");
                            }
                            $.each(data.rows, function (index, dessert) {
                                var id = dessert.value.id;
                                var rev = dessert.value.rev;
                                var createSubList = $('<ul>');
                                var dish = dessert.value.dish;
                                var rating = dessert.value.rating;
                                var restaurant = dessert.value.restaurant;
                                var favorite = dessert.value.favorite;
                                var comment = dessert.value.comment;
                                $('ul #dessertlist').append('<li>' + dish + '</li>');
                                $('ul #dessertlist').append('<li>' + rating + '</li>');
                                $('ul #desserlist').append('<li>' + restaurant + '</li>');
                                $('ul #dessertlist').append('<li>' + favorite + '</li>');
                                $('ul #dessertlist').append('<li>' + comment + '</li>');
                                createSubList.append("#dessertlist").append(editButton).append('<br>').append(deleteButton.append('<br />').appendTo("#dessertlist"));

                            });
                        }
                    });
                    
                }
     });
       
});





