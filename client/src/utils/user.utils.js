const userUtils = {
    getCurrentUserId: () => {
        return localStorage.getItem('currentUserId');
    }
};

export default userUtils;