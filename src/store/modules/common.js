export default {
    namespaced: true,
    state: {
        sidebarbg: '#242F42',
        user_token: ''
    },
    mutations: {
        getSidebarbg(state, sidebarbg) {
            state.sidebarbg = sidebarbg
        },
        getToken(state, user_token) {
            state.user_token = user_token;
            localStorage.setItem('token', user_token)
            console.log(state.user_token, 'token')
        }
    }
}