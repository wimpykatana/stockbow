/**
 * USER MODEL
 * 
 */

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullname:{
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    signUpDate: {
        type: Date,
        default: Date.now()
    },
    headline:{
        // field buat jabatan / posisi
        type: String,
        default: ''
    },
    aboutUser:{
        // field buat about user
        type: String,
        default: ''
    },
    language:{
        // field bahasa
        type: String,
        default: 'Indonesia'
    },
    provider:{
        //login with social network
        type: String,
        default: ''
    },
    provider_id:{
         //social network id
        type: String,
        default: ''
    },
    token: {
        type: String,
        default: ''
    },
    user_pic:{
        type: String,
        default: ''
    },
    dob:{
        //date of birth (tanggal lahir)
        type: Date,
        default: ''
    },
    isAdmin:{
        type: Number,
        default: 0
    },
    startSubs:{
        type: Date,
        default: ''
    }
});

module.exports = mongoose.model('User', UserSchema);