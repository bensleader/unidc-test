const mongoose = require('mongoose');


const ChannelSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    type: { type: String, enum: ['text', 'voice'], default: 'text' }, 
    createdAt: { type: Date, default: Date.now }
});


const RoleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    color: { type: String, default: '#000000' },
    permissions: [{ type: String }] 
});


const ServerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    owner: { 
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        username: { type: String } 
    },
    icon: { type: String },
    

    channels: [ChannelSchema], 
    roles: [RoleSchema],
    
    members: [{ 
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        joinedAt: { type: Date, default: Date.now },
        roles: [{ type: String }] 
    }]

}, { timestamps: true });

module.exports = mongoose.model('Server', ServerSchema);