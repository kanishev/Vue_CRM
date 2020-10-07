<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'Edit' | localize()}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="c of categories" :key="c.id" :value="c.id">
              {{ c.title }}
            </option>
          </select>
          <label>{{'SelectCategory' | localize()}}</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: $v.title.$dirty && !$v.title.required }"
          />

          <label for="name">{{"Name" | localize()}}</label>

          <span
            class="helper-text invalid"
            v-if="$v.title.$dirty && !$v.title.required"
            >{{"ErrorTitle" | localize()}}</span
          >
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: $v.limit.$dirty && !$v.limit.minValue }"
          />

          <label for="limit">{{"Limit"| localize()}}</label>

          <span
            lass="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            >{{'MinValue' | localize()}}{{ $v.limit.$params.minValue.min }}</span
          >
        </div>

        <button class="btn waves-effect waves-light  light-blue accent-3" type="submit">
          {{'UpdateProfile' | localize()}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>


<script>
import { required, minValue } from "vuelidate/lib/validators";

export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  validations: {
    title: { required },
    limit: { minValue: minValue(100) },
  },
  data: () => ({
    select: null,
    title: "",
    limit: 1,
    current: "",
  }),
  created() {
    const { title, limit, id } = this.categories[0];
    (this.title = title), (this.limit = limit), (this.current = id);
  },
  watch: {
    current(cId) {
      const { title, limit } = this.categories.find((c) => c.id == cId);
      this.title = title;
      this.limit = limit;
      this.current = cId;
    },
  },
  mounted() {
    this.select = window.M.FormSelect.init(this.$refs.select);
    window.M.updateTextFields();
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const updatedCategory = {
        id: this.current,
        title: this.title,
        limit: this.limit,
      };

      await this.$store.dispatch("updateCategory", updatedCategory);

      this.$simpleMessage("Категория обновлена");
      this.$emit("updated", updatedCategory);
    },
  },
};
</script>