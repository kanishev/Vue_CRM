<template>
  <div>
    <div class="page-title">
      <h3>{{'Profile' | localize()}}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{
            invalid: $v.name.$dirty && !$v.name.required,
          }"
        />
        <label for="description">{{'Name' | localize()}}</label>
        <span
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
          >{{'ErrorName'| localize()}}</span
        >
      </div>

      <div class="switch" style="margin-bottom: 20px">
        <label>
          ENG
          <input type="checkbox" v-model="isLocalRu" />
          <span class="lever"></span>
          RU
        </label>
      </div>

      <button class="btn waves-effect waves-light  light-blue accent-3" type="submit">
        {{'UpdateProfile' | localize()}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'profile',
  metaInfo() {
    return{
      title: this.$title('Profile')
    }
  },
  data: () => ({
    name: '',
    isLocalRu: true
  }),
  computed: {
    ...mapGetters(['getInfo']),
  },
  validations: {
    name: { required },
  },
  mounted() {
    this.name = this.getInfo.name
    this.isLocalRu = this.getInfo.locale === 'ru-RU' 
    setTimeout(() => {
      window.M.updateTextFields()
    })
  },
  methods: {
   ...mapActions(['updateInfo']),
   async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      
      await this.updateInfo({
        name: this.name,
        locale: this.isLocalRu ? "ru-RU" : 'en-US'
      })
    },
  },
}
</script>