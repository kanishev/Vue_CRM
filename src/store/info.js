import firebase from 'firebase/app'

export default {
    state: {
        info: {}
    },
    actions: {
        async updateInfo(ctx, data){
            try{
                const updatedData = {...ctx.getters.getInfo, ...data}
                const uid = await ctx.dispatch('getUserId')
                await firebase.database().ref(`/users/${uid}/info`).update(updatedData)
                ctx.commit('setInfo', updatedData)
            }
            catch(e){
                ctx.commit('setError', e)
                throw e
            }
        },
        async fetchUser(ctx) {
            try{
                const uid = await ctx.dispatch('getUserId')
                const info = await firebase.database().ref(`/users/${uid}/info`).once('value')
                ctx.commit('setInfo', info.val())
            }
            catch(e){
                console.log(e)
            }
        }
    },
    mutations: {
        setInfo(state, info) {
            state.info = info
        },
        clearInfo(state) {
            state.info = {locale: state.info.locale}
        }
    },
    getters: {
        getInfo: s => s.info
    }

}