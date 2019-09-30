import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    sid: String,
    name: String,
    country: String,
    profileImage: String,
    profileUrl: String
});

export default mongoose.model('User', UserSchema);