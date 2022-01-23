const mongoose = require('mongoose')
const bcrypto = require('bcryptjs')

const userSchema = mongoose.Schema(
    {
        username: { type: String, required: true},
        email: { type: String, required: true},
        password: { type: String}
    },
)

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypto.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypto.genSalt(10)
    this.password = await bcrypto.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

module.exports = User