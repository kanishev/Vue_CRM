<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">
    <router-link 
    v-for="nav of navLinks" 
    :key="nav.url" 
    :to="nav.url"
    :exact="nav.exact"

    tag="li" 
    active-class="active"
    >
      <a class="waves-effect waves-orange pointer">{{nav.title | localize()}}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  props: ['value'],
  data: () => ({
    navLinks: [
      { title: "PageBill", url: "/", exact: true },
      { title: "PageHistory", url: "/history" },
      { title: "PagePlanning", url: "/planning" },
      { title: "PageRecord", url: "/record" },
      { title: "PageCategoties", url: "/categories" },
    ],
  }),
};
</script>