
const mongoose = require('mongoose');


const SkateSpotSchema = new mongoose.Schema({
  location: {
    type: String,
    
},
name: {
  type: String,
  
},
easyToFind: {
    type: Boolean,
    
},
difficulties: {   
    type: String,
    enum: ['easy', 'medium', 'hard'],
   
},
ratings: {
    type: String,
    enum: ['1', '2', '3', '4', '5'],
},
notes: {
    type: String,
},
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
    spots: [SkateSpotSchema],
    
    
});
  const User = mongoose.model('User', userSchema);

module.exports = User;