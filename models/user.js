const applicationSchema = new mongoose.Schema({
    
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
        required: true,
    },
    name: {
      type: String,
      required: true,
    },
    easyToFind: {
        type: Boolean,
        
    },
    difficulty: {   
        type: Boolean,
       
    },
    rating: {
        type: Number,
        
    },
});
  const User = mongoose.model('User', userSchema);

module.exports = User;