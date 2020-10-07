<template>
  <div>
    <Loader v-if="loading" />

    <div class="app-main-layout" v-else >
      <Navbar @click="isOpenSidebar = !isOpenSidebar" />
      <Sidebar v-model="isOpenSidebar" :key="localize"/>

      <main class="app-content" :class="{ full: !isOpenSidebar }">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn" v-tooltip="'AddRecord'">
        <router-link class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>

  </div>
</template>


<script>
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";
import messages from '../utils/messages'

export default {
  data: () => ({
    isOpenSidebar: true,
    loading: true,
  }),
  name: "main-layout",
  components: {
    Navbar,
    Sidebar,
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.getInfo).length) {
      await this.$store.dispatch("fetchUser");
    }

    this.loading = false;
  },
   computed: {
    getError(){
      return this.$store.getters.getError
    },
    localize(){
      return this.$store.getters.getInfo.locale
    }
  },
  watch: {
    getError(fbError){
      this.$errorMessage(messages[fbError.code] || 'Что-то пошло не так')
    }
  }
};
</script>