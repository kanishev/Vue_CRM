<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Score' | localize() }}</h3>

      <button
        class="btn waves-effect waves-light btn-small light-blue accent-3"
      >
        <i class="material-icons" @click="refresh">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />

    <div class="row" v-else>
      <HomeBill :rates="currency.rates" />
      <HomeCurrency :rates="rates" :date="currency.date" />
    </div>
  </div>
</template>

<script>
import HomeBill from '../components/HomeBill'
import HomeCurrency from '../components/HomeCurrency'

export default {
  name: 'Home',
  metaInfo() {
    return {
      title: this.$title('PageRecord'),
    }
  },
  data: () => ({
    loading: true,
    currency: null,
    rates: [],
  }),
  components: {
    HomeBill,
    HomeCurrency,
  },
  async mounted() {
    this.currency = await this.$store.dispatch('fetchPrice')
    this.rates = this.currency.rates
    this.rates.EUR = 1
    this.loading = false
  },
  methods: {
    async refresh() {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchPrice')
      this.rates = this.currency.rates
      this.rates.EUR = 1
      this.loading = false
    },
  },
}
</script>
