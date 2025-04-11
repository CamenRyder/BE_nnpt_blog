let mongoose = require('mongoose');
let typePostSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    conslution:{
        type:String,
        required:true,
        unique:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})
module.exports = mongoose.model('typePost',typePostSchema)
// products