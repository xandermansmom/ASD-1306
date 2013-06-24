function(doc) {
  if (doc.category.substr(0, 9) === "Appetizer") {
    emit(doc.category.substr(0), {
    	"dish": doc.dish,
    	"rating": doc.rating,
    	"restaurant": doc.restaurant,
    	"favorite": doc.favorite,
    	"comment": doc.comment
    	});
    }
  
};