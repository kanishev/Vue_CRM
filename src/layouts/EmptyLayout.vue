<template>
  <div class="grey darken-1 empty-layout"> 
    <router-view />
  </div>
</template>


<script>
import messages from '../utils/messages'
import localize from '../filters/localize.filter'

export default {
  computed: {
    getError(){
      return this.$store.getters.getError
    }
  },
  watch: {
    getError(fbError){
      this.$errorMessage(localize(messages[fbError.code]) || 'Что-то пошло не так')
    }
  }
}
</script>