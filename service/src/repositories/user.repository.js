import User from './../models/user.model';

const userRepository = {
    getUser: sid => {
        return User.findOne({ sid: sid });
    },
    getUsers: () => {
        return User.find({});
    },
    getUsersByMostPlayedSid: mostPlayedSid => {
        return User.find({ mostPlayedSid: mostPlayedSid });
    },
    upsertUser(userToUpsert) {
        return User.findOneAndUpdate(
            { sid: userToUpsert.sid },
            { $set: userToUpsert },
            { new: true, upsert: true },
            (error, result) => {
                if (error)
                    console.log('Error occured while saving the user.');
            }
        );
    }
};

export default userRepository;