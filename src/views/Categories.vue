<template>
  <div>
    <div class="page-title">
      <h3>{{"Categories" | localize()}}</h3>
    </div>
    <section>
      <Loader v-if="loading" />

      <div class="row" v-else>
        <CategoryCreate @created="addCategory" />
        <CategoryEdit
          v-if="categories.length"
          :categories="categories"
          @updated="updatedCategory"
          :key="categories.length + updateCount"
        />
        <p class="center" v-else>Категорий пока что нет</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "../components/CategoryCreate";
import CategoryEdit from "../components/CategoryEdit";

export default {
  name: "categories",
   metaInfo() {
    return{
      title: this.$title('Categories')
    }
  },
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0,
  }),
  components: {
    CategoryCreate,
    CategoryEdit,
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;
  },
  methods: {
    addCategory(category) {
      this.categories.push(category);
    },
    updatedCategory(updatedCategory) {
      const idx = this.categories.findIndex((c) => c.id === updatedCategory.id);
      this.categories[idx].title = updatedCategory.title;
      this.categories[idx].limit = updatedCategory.limit;
      this.categories[idx].id = updatedCategory.id;
      this.updateCount++;
    },
  },
};
</script>