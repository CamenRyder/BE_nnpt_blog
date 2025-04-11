let mongoose = require('mongoose');
let componentPostSchema = mongoose.Schema({
    content:{
        type:String,
        required:false, 
    },
    imageUrl:{
        type:String,
        required:false
    },
    index: {
        type:Number,
        required:0,
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    },
},{
    timestamps:true
})
module.exports = mongoose.model('componentPost',componentPostSchema)
// products