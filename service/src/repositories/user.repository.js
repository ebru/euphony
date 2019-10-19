import User from './../models/user.model';

const userRepository = {
    getUser: _id => {
        return User.findById(_id);
    },
    getUsersByMostPlayedId: mostPlayedId => {
        return User.find({ mostPlayedId: mostPlayedId });
    },
    upsertUser(userToUpsert) {
        const upsertedUser = User.findOneAndUpdate(
            { sid: userToUpsert.sid },
            { $set: userToUpsert },
            { new: true, upsert: true }
        );

        return upsertedUser;
    }
};

export default userRepository;