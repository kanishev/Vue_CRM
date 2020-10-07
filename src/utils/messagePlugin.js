import localize from '../filters/localize.filter'
export default {
    install(Vue){
        Vue.prototype.$simpleMessage = function(html){
            window.M.toast({html})
        }
        Vue.prototype.$errorMessage = function(html){
            window.M.toast({html: `[${localize('Error')}]: ${html}`})
            
        }
    }
}