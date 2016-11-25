var mongoose=require('mongoose');

var Schema=mongoose.Schema;

var userSchema=new Schema({
  email:{type: String, require: true, unique:true},
  password:{type: String, required: true },
  created_at: Date,
  updated_at: Date
});

userSchema.pre('save', function(next){
  console.log('save function')
  var currentDate =new Date();
  this.updated_at=currentDate;

  if(!this.created_at){
  this.created_at=currentDate;
  }

  next();
})

var User=mongoose.model('users', userSchema);

module.exports=User;
