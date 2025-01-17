
const mongoose = require('mongoose');


const SkateSpotSchema = new mongoose.Schema({
    
  });
  
  const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    Skatespots: [SkateSpotSchema],
    
    location: {
        type: String,
        
    },
    name: {
      type: String,
      
    },
    easyToFind: {
        type: Boolean,
        
    },
    difficulty: {   
        type: String,
        enum: ['easy', 'medium', 'hard'],
       
    },
    rating: {
        type: String,
        enum: ['1', '2', '3', '4', '5'],

        
    },
});
  const User = mongoose.model('User', userSchema);

module.exports = User;