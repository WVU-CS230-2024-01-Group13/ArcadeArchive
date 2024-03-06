function addRating(){
   let rating;
   let img = document.createElement("img");

   do{
    rating = prompt("Please enter an integer rating between 0 and 5.")
   }
   while(rating<0 || rating>5 || isNaN(rating) || !(Number.isInteger(rating)) );

   if(rating == 0){
    
   }
   else if(rating == 1){
    
   }
   else if(rating == 2){

   }
   else if(rating == 3){

   }
   else if(rating == 4){

   }
   else{

   }
}