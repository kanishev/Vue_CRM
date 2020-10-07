<template>
  <div>
    <div class="page-title">
      <h3>{{'RecordHistory' | localize}}</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!records.length" class="center">
      {{"NoRecord"}}
      <router-link to="/record">{{"Create" | localize()}}</router-link>
    </p>

    <section v-else>
      <HistoryTable :records="items" />

      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="paginateHandler"
        :prev-text="prev"
        :next-text="next"
        :margin-pages="2"
        :container-class="'pagination center'"
        :page-class="'waves-effect'"
      >
      </Paginate>
    </section>
  </div>
</template>


<script>
import HistoryTable from "../components/HistoryTable";
import paginationMixin from "../mixins/paginate.mixin";

import { Pie } from "vue-chartjs";

export default {
  name: "History",
  mixins: [paginationMixin, Pie],
   metaInfo() {
    return{
      title: this.$title('History')
    }
  },
  data: () => ({
    loading: true,
    records: [],
    prev: 'prev',
    next: 'next'
  }),
  components: {
    HistoryTable,
  },
  async mounted() {
    this.records = await this.$store.dispatch("fetchRecords");
    this.records = this.records.reverse()
    const categories = await this.$store.dispatch("fetchCategories");

    const locale = this.$store.getters.getInfo.locale
    this.prev = locale === 'en-US' ? 'prev' : 'назад'
    this.next = locale === 'en-US' ? 'next' : 'вперед'


    this.setup(categories);

    this.loading = false;
  },
  methods: {
    setup(categories) {
      this.setupPagination(
        this.records.map((record) => {
          return {
            ...record,
            categoryName: categories.find((c) => c.id === record.category)
              .title,
            typeColor: record.type === "outcome" ? "red" : "green",
            typeText: record.type === "outcome" ? "Расход" : "Доход",
          };
        })
      );

      this.renderChart({
        labels: categories.map((c) => c.title),
        datasets: [
          {
            label: "Расходы по категориям",
            data: categories.map((c) => {
              return this.records.reduce((acc, rec) => {
                if (c.id === rec.category && rec.type === "outcome") {
                  acc += +rec.amount;
                }
                
                return acc;
              }, 0);
             
            }),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
    },
  },
};
</script>