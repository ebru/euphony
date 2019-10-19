import User from './../models/user.model';

const userResolver = {
    getUser: sid => {
        return User.findOne({ sid: sid });
    },
    getUsers: () => {
        return User.find({});
    },
    getUsersByMostPlayedSid: mostPlayedSid => {
        return User.find({ mostPlayedSid: mostPlayedSid });
    },
    addUser(userToAdd) {
        const user = new User(userToAdd);
        return user.save();
    }
};

export default userResolver;