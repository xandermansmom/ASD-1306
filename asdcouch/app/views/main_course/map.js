function(doc) {
  if (doc.category.substr(0, 11) === "Main Course") {
        emit(doc.category.substr(0), {
    	"dish": doc.dish,
    	"rating": doc.rating,
    	"restaurant": doc.restaurant,
    	"favorite": doc.favorite,
    	"comment": doc.comment
    	});
    }
  
};