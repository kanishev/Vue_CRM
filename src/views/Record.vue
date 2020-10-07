<template>
  <div>
    <div class="page-title">
      <h3>{{'NewRecord' | localize()}}</h3>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">
      {{"NoCategories" | localize()}}
      <router-link to="/categories">{{'Create' | localize()}}</router-link>
    </p>

    <form class="form" v-else @submit.prevent="submitHandler">
      <div class="input-field">
        <select ref="select" v-model="current">
          <option v-for="cut of categories" :key="cut.id" :value="cut.id">
            {{ cut.title }}
          </option>
        </select>
        <label>{{"SelectCategory" | localize()}}</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>{{"Income" | localize}}</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>{{"Outcome" | localize()}}</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{ invalid: $v.amount.$dirty && !$v.amount.minValue }"
        />
        <label for="amount">{{"Summ" | localize()}}</label>

        <span
          lass="helper-text invalid"
          v-if="$v.amount.$dirty && !$v.amount.minValue"
          >{{"MinValue" | localize()}} {{ $v.amount.$params.minValue.min }}</span
        >
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{
            invalid: $v.description.$dirty && !$v.description.required,
          }"
        />
        <label for="description">{{"Description" | localize()}}</label>

        <span
          class="helper-text invalid"
          v-if="$v.description.$dirty && !$v.description.required"
          >{{"TypeValue" | localize()}}</span
        >
      </div>

      <button class="btn waves-effect waves-light  light-blue accent-3" type="submit">
        {{"Create" | localize()}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>


<script>
import { required, minValue } from "vuelidate/lib/validators";

export default {
  name: "record",
   metaInfo() {
    return{
      title: this.$title('PageRecord')
    }
  },
  data: () => ({
    categories: [],
    select: null,
    loading: true,
    current: null,
    type: "income",
    amount: 0,
    description: "",
  }),
  validations: {
    amount: { minValue: minValue(1) },
    description: { required },
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;

    if (this.categories.length) {
      this.current = this.categories[0].id;
    }

    setTimeout(() => {
      this.select = window.M.FormSelect.init(this.$refs.select);
      window.M.updateTextFields();
    }, 0);
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  computed: {
    getInfo() {
      return this.$store.getters.getInfo;
    },
    canCreateRecord() {
      if (this.type === "income") {
        return true;
      }
      return this.getInfo.bill >= this.amount;
    },
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      if (this.canCreateRecord) {
        
        await this.$store.dispatch("createRecord", {
          category: this.current,
          amount: this.amount,
          description: this.description,
          type: this.type,
          date: new Date().toJSON(),
        });

        const bill =
          this.type === "income"
            ? this.getInfo.bill + this.amount
            : this.getInfo.bill - this.amount;

        await this.$store.dispatch("updateInfo", { bill });

        this.$simpleMessage("Запись успешно создана");

        this.$v.$reset();
        this.amount = 1;
        this.description = "";

      } else {
        this.$simpleMessage(
          `Не хватает средств (${this.amount - this.getInfo.bill})`
        );
      }
    },
  },
};
</script>
