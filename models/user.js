
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
 difficulty: {
    type: String,
    enum : ['easy', 'medium', 'hard'],
   
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