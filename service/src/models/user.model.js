import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    sid: {
        type: String,
        unique: true
    },
    name: String,
    country: String,
    profileImage: String,
    profileUrl: String,
    mostPlayedId: {
        type: Schema.Types.ObjectId,
        ref: 'Song'
    }
});

export default mongoose.model(
    'User',
    userSchema
);