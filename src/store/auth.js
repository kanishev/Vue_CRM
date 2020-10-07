import firebase from 'firebase/app'

export default {

    actions: {
        async login(ctx, { email, password }) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch (e) {
                ctx.commit('setError', e)
                throw e 
            }
        },
        async logout(ctx){
            await firebase.auth().signOut()
            ctx.commit('clearInfo')
        },
        async register(ctx, {email, password, name}){
            try{
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const user = await ctx.dispatch('getUserId')
                await firebase.database().ref(`users/${user}/info`).set({name, bill: 10000})

            }catch(e){
                ctx.commit('setError', e)
                throw e 
            }
        },

        getUserId(){
            let user = firebase.auth().currentUser
            return user = user.uid || null
        }

    }
}