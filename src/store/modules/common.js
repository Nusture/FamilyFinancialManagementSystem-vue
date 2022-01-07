export default {
    namespaced: true,
    state: {
        sidebarbg: '#242F42',
        user_token: ''
    },
    mutations: {
        getSidebarbg(state, sidebarbg) {
            state.sidebarbg = sidebarbg
        }
    }
}