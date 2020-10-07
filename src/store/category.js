import firebase from 'firebase/app'

export default {

    actions: {
        async fetchCategories(ctx) {
            try {
                const uid = await ctx.dispatch('getUserId')
                const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}
                return Object.keys(categories).map(key => ({...categories[key], id: key}))
            }
            catch (e) {
                ctx.commit('setError', e)
                throw e
            }
        },
        async fetchCategoryById(ctx, id) {
            try {
                const uid = await ctx.dispatch('getUserId')
                const category = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value')).val() || {}
                return {...category, id}
            }
            catch (e) {
                ctx.commit('setError', e)
                throw e
            }
        },

        async updateCategory(ctx, { title, limit, id }) {
            try {
                const uid = await ctx.dispatch('getUserId')
                await firebase.database().ref(`/users/${uid}/categories`).child(id).update({ title, limit })
            }
            catch (e) {
                ctx.commit('setError', e)
                throw e
            }
        },

        async createCategory(ctx, { title, limit }) {
            try {
                const uid = await ctx.dispatch('getUserId')
                const category = await firebase.database().ref(`/users/${uid}/categories`).push({ title, limit })
                return { title, limit, id: category.key }
            }
            catch (e) {
                ctx.commit('setError', e)
                throw e
            }
        }
    }


}