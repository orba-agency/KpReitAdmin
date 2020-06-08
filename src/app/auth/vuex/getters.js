export const user = (state) => {
    return state.user
}

export const isLoggedIn = (state) => {
    return !!state.user.authenticated
}
