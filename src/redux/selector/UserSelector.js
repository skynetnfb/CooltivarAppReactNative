

export const user = (state) => () => {
    return state.user
};
export const isLogged = (state) => () => {
    return state.logged
};

export const UserSelector = {
    user: user,
    isLogged: isLogged,
};
