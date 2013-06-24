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

    $.mobile.changePage("#view");
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


$('#view').on('pageinit', function () {   


 $.ajax({
            url: '_design/app/_view/dishes',
            dataType: 'json',
            success: function (data) {
               $.each(data.rows, function(index, dishes){
               		var dish = dishes.value.dish;
	                var rating =dishes.value.rating;
                    var restaurant = dishes.value.restaurant;
                    var favorite = dishes.value.favorite;
                    var comment = dishes.value.comment;
                        $('ul #dishlist').append('<li>' + dish + '</li>');
                    	$('ul #dishlist').append('<li>' + rating + '</li>');
                    	$('ul #dishlist').append('<li>'+ restaurant + '</li>');
                    	$('ul #dishlist').append('<li>'+ favorite + '</li>');
                    	$('ul #dishlist').append('<li>'+ comment + '</li>');               		
               });
                              $('ul #dishlist').listview('refresh');
               
            }

    }); 

   
    
         $.ajax({
            url: '_design/app/_view/appetizer',
            dataType: 'json',
            success: function (data) {
               $.each(data.rows, function(index, appetizer){
               		var dish = appetizer.value.dish;
	                var rating = appetizer.value.rating;
                    var restaurant = appetizer.value.restaurant;
                    var favorite = appetizer.value.favorite;
                    var comment = appetizer.value.comment;
                    $('ul #applist').append('<li>' + dish + '</li>');
                    	$('ul #applist').append('<li>' + rating + '</li>');
                    	$('ul #applist').append('<li>'+ restaurant + '</li>');
                    	$('ul #apphlist').append('<li>'+ favorite + '</li>');
                    	$('ul #applist').append('<li>'+ comment + '</li>');               		
               });
                              $('#applist').listview('refresh');
               
            }

    });
        $.ajax({
            url: '_design/app/_view/main_course',
            dataType: 'json',
            success: function (data) {
               $.each(data.rows, function(index, main_course){
               		var dish = main_course.value.dish;
	                var rating = main_course.value.rating;
                    var restaurant = main_course.value.restaurant;
                    var favorite = main_course.value.favorite;
                    var comment = main_course.value.comment;
                    $('ul #mainlist').append('<li>' + dish + '</li>');
                    	$('ul #mainlist').append('<li>' + rating + '</li>');
                    	$('ul #mainlist').append('<li>'+ restaurant + '</li>');
                    	$('ul #mainlist').append('<li>'+ favorite + '</li>');
                    	$('ul #mainlist').append('<li>'+ comment + '</li>');               		
               });
                              $('#mainlist').listview('refresh');
               
            }

    });
    
     $.ajax({
            url: '_design/app/_view/side_order',
            dataType: 'json',
            success: function (data) {
               $.each(data.rows, function(index, side_order){
               		var dish = side_order.value.dish;
	                var rating = side_order.value.rating;
                    var restaurant = side_order.value.restaurant;
                    var favorite = side_order.value.favorite;
                    var comment = side_order.value.comment;
                    $('ul #sidelist').append('<li>' + dish + '</li>');
                    	$('ul #sidelist').append('<li>' + rating + '</li>');
                    	$('ul #sidelist').append('<li>'+ restaurant + '</li>');
                    	$('ul #sidelist').append('<li>'+ favorite + '</li>');
                    	$('ul #sidelist').append('<li>'+ comment + '</li>');               		
               });
                              $('#sidelist').listview('refresh');
               
            }

    });
    
          $.ajax({
            url: '_design/app/_view/soups_and_salads',
            dataType: 'json',
            success: function (data) {
               $.each(data.rows, function(index, soups_and_salads){
               		var dish = soups_and_salads.value.dish;
	                var rating = soups_and_salads.value.rating;
                    var restaurant = soups_and_salads.value.restaurant;
                    var favorite = soups_and_salads.value.favorite;
                    var comment = soups_and_salads.value.comment;
                  $('ul #sslist').append('<li>' + dish + '</li>');
                    	$('ul #sslist').append('<li>' + rating + '</li>');
                    	$('ul #sslist').append('<li>'+ restaurant + '</li>');
                    	$('ul #sslist').append('<li>'+ favorite + '</li>');
                    	$('ul #sslist').append('<li>'+ comment + '</li>');               		
               });
                              $('#sslist').listview('refresh');
               
            }

    });
    
     $.ajax({
            url: '_design/app/_view/dessert',
            dataType: 'json',
            success: function (data) {
               $.each(data.rows, function(index, dessert){
               		var dish = dessert.value.dish;
	                var rating = dessert.value.rating;
                    var restaurant = dessert.value.restaurant;
                    var favorite = dessert.value.favorite;
                    var comment = dessert.value.comment;
                 		 $('ul #dessertlist').append('<li>' + dish + '</li>');
                    	$('ul #dessertlist').append('<li>' + rating + '</li>');
                    	$('ul #desserlist').append('<li>'+ restaurant + '</li>');
                    	$('ul #dessertlist').append('<li>'+ favorite + '</li>');
                    	$('ul #dessertlist').append('<li>'+ comment + '</li>');               		
               });
                              $('#dessertlist').listview('refresh');
               
            }

    });
    
});



     