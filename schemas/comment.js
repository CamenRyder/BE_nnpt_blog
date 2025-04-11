let mongoose = require('mongoose');
let commnetSchema = mongoose.Schema({
    content:{
        type:String,
        required:false, 
    },
    imageUrl:{
        type:String,
        required:false
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
},{
    timestamps:true
})
module.exports = mongoose.model('comment',commnetSchema)
// products