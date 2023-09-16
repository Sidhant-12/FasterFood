const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://Sidhant:12032002@cluster0.2w3zpeh.mongodb.net/fasterfoodmern?retryWrites=true&w=majority'
const mongoDB =async()=>{
    await mongoose.connect(mongoURI) .then(async () => {
        console.log('Connected to MongoDB');
        const fetch_data = mongoose.connection.db.collection("food_items").find({})
        const results = await fetch_data.toArray();

        if (results.length > 0) {
          
                global.food_items=results;
          
            // console.log(global.food)
        } else {
            console.log(`No food items found`);
        }
        
        const fetchedfoodCategory = mongoose.connection.db.collection("foodCategory").find({})
        const foodCat = await fetchedfoodCategory.toArray();
        
        if (foodCat.length > 0) {
            global.foodCategory = foodCat

        } else {
            console.log(`No food categories found!`);
        }

      })
      .catch((error) => {
        console.log('Error connecting to MongoDB:', error.message);
      });

}

module.exports = mongoDB; 