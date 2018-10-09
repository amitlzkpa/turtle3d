const mongoose = require('mongoose')




let LSystemSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        author: { type: String },
        description: { type: String },
        helpers: [{ type: String }],
        turtles: [{ type: String }], 
        rulesets: [{ type: String }], 
        created: { type: Date, default: Date.now },
    },
    {
        timestamps: true
    }
);





module.exports = mongoose.model('LSystemSchema', LSystemSchema)