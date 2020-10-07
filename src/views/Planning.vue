<template>
  <div>
    <div class="page-title">
      <h3>{{'Planning' | localize()}}</h3>
      <h4>{{getInfo.bill | currency}}</h4>
    </div>

    <Loader v-if="loading" />

     <p class="center" v-else-if="!categories.length">
      {{"NoCategories" | localize()}}
      <router-link to="/categories">{{"Create" | localize()}}</router-link>
    </p>

    <section v-else>
      <div v-for="cat of categories" :key="cat.id" v-tooltip="cat.tooltip">
        <p>
          <strong>{{cat.title}}:</strong>
         {{cat.spend | currency}} / {{cat.limit | currency}}
        </p>
        <div class="progress">
          <div class="determinate" :class="[cat.persentColor]" :style="{width: cat.persentWidth + '%'}"></div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>

import {mapGetters} from 'vuex'
import currencyFilter from '../filters/currency.filter'

export default {
  name: 'planning',
   metaInfo() {
    return{
      title: this.$title('PagePlanning')
    }
  },
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(['getInfo'])
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    this.loading = false

    this.categories = categories.map(cat => {
      const spend = records
      .filter(p => p.category == cat.id)
      .filter(p => p.type === 'outcome')
      .reduce((acc, n) => {
        return acc += +n.amount
      }, 0)

      const persent = 100 * spend / cat.limit
      const persentWidth = persent > 100 ? 100 : persent
      const persentColor = persent < 60 
      ? 'green'
        : persent < 100 ? 'yellow'
        : 'red'

      const tooltipValue = cat.limit - spend
      const tooltip = `${tooltipValue < 0  ? 'Excess:' : 'Balance'} ${currencyFilter(Math.abs(tooltipValue))}`  

      return {
        ...cat, 
        spend,
        persent,
        persentColor,
        persentWidth,
        tooltip
      }  
    })

  }
}
</script>