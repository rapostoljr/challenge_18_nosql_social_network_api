const { Schema, model, Types } = require('mongoose'); 

const userSchema = newSchema (
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function(email) {
                    return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email);
                }
            }
        },
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
)

userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

const User = model('User',userSchema)
module.exports = User;