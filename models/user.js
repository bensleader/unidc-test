const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: [/edu\.tr$/, 'Sadece üniversite maili (.edu.tr) kabul edilir!']
    },
    password: { type: String, required: true },
    avatar: { type: String, default: "" },
    
   
    status: {
        text: { type: String, default: "Müsait" }, 
        isOnline: { type: Boolean, default: false }
    },

    
    friends: [{
        friendId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        friendUsername: { type: String }
    }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);