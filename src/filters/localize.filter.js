import store from '../store'
import ru from '../locals/ru.json'
import eng from '../locals/eng.json'


const locales = {
    'ru-RU': ru,
    'en-US': eng
}

export default function localize(key){
    const local = store.getters.getInfo.locale || 'ru-RU'
    return locales[local][key] || `[Something went wrong]: key ${key} doesn't exist `
}