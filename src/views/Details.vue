<template>
  <div>

    <Loader v-if="loading" />

    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a @click.prevent class="breadcrumb">{{record.type === "outcome" ? 'расход' : 'доход'}}</a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="{red: record.type === 'outcome', green: record.type === 'income'}">
            <div class="card-content white-text">
              <p>Описание: {{record.description}}</p>
              <p>Сумма: {{record.amount | currency()}}</p>
              <p>Категория: {{record.categoryName}}</p>
              <small>{{record.date | date('datetime')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p class="center" v-else>Записей категории {{$route.params.id}} не существует</p>

  </div>
</template>

<script>
export default {
  name: 'Details',
   metaInfo() {
    return{
      title: this.$title('Detail')
    }
  },
  data: () => ({
    loading: true,
    record: {}
  }),
  async mounted() {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    const category = await this.$store.dispatch('fetchCategoryById', record.category)

    this.record= {
      ...record,
      categoryName: category.title
    }

    this.loading = false
  
  },
}
</script>