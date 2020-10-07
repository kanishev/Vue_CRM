import localize from '../filters/localize.filter'

export default {
    install(Vue){
        Vue.prototype.$title = function(html){
            const appName = process.env.VUE_APP_TITLE
            return `${localize(html)} | ${appName}`
        }
       
    }
}