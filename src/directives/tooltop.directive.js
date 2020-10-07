import localizeFilter from '@/filters/localize.filter'

export default {
    bind(el, { value, modifiers }) {
      if(value.split(' ').length > 1){       
        window.M.Tooltip.init(el, {
          html: modifiers.noloc ? value : localizeFilter(value.split(' ')[0]) + ' ' + value.split(' ')[1]
        })
      }else {
        window.M.Tooltip.init(el, {
          html: modifiers.noloc ? value : localizeFilter(value)
        })
      }
       
      },
    unbind(elem){
       const tooltip = window.M.Tooltip.getInstance(elem)
        if(tooltip && tooltip.destroy){
            tooltip.destroy()
        }
    }
}