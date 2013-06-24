function(doc) {
  if (doc._id.substr(0, 5) === "dish:") {
        emit(doc.category.substr(0), {
    	"dish": doc.dish,
    	"category": doc.category,
    	"rating": doc.rating,
    	"restaurant": doc.restaurant,
    	"favorite": doc.favorite,
    	"comment": doc.comment
    	});
    }
  
};