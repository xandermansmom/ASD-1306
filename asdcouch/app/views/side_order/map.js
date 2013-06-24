function(doc) {
  if (doc.category.substr(0, 10) === "Side Order") {
         emit(doc.category.substr(0), {
    	"dish": doc.dish,
    	"rating": doc.rating,
    	"restaurant": doc.restaurant,
    	"favorite": doc.favorite,
    	"comment": doc.comment
    	});
    }
  
};