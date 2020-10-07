import firebase from 'firebase/app'

export default {

    actions: {
        async createRecord(ctx, record) {
            try {
                const uid = await ctx.dispatch('getUserId')
                return await firebase.database().ref(`/users/${uid}/record`).push(record)
            }
            catch (e) {
                ctx.commit('setError', e)
                throw e
            }
        },

        async fetchRecords(ctx) {
            try {
                const uid = await ctx.dispatch('getUserId')
                const records = (await firebase.database().ref(`/users/${uid}/record`).once('value')).val() || {}   
                return Object.keys(records).map((key, idx) => ({...records[key], id: key, countNumber: idx + 1}))
            }
            catch (e) {
                ctx.commit('setError', e)
                throw e
            }
        },
        async fetchRecordById(ctx, id) {
            try {
                const uid = await ctx.dispatch('getUserId')
                const record = (await firebase.database().ref(`/users/${uid}/record`).child(id).once('value')).val() || {}   
                return {...record, id}
            }
            catch (e) {
                ctx.commit('setError', e)
                throw e
            }
        }
    }


}