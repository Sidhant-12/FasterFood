const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://Sidhant:12032002@cluster0.2w3zpeh.mongodb.net/fasterfoodmern?retryWrites=true&w=majority'
const mongoDB =async()=>{
    await mongoose.connect(mongoURI) .then(async () => {
        console.log('Connected to MongoDB');
        const fetch_data = mongoose.connection.db.collection("food_items").find({})
        const results = await fetch_data.toArray();
        if (results.length > 0) {
            results.forEach((result, i) => {
                // console.log(result)
            })
        } else {
            console.log(`No listings found`);
        }
      })
      .catch((error) => {
        console.log('Error connecting to MongoDB:', error.message);
      });

}

module.exports = mongoDB; 