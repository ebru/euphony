import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    sid: {
        type: String,
        unique: true
    },
    name: String,
    country: String,
    profileImage: String,
    profileUrl: String,
    mostPlayedSid: String
});

export default mongoose.model('User', UserSchema);