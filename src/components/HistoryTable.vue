<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{"Summ" | localize()}}</th>
        <th>{{"Date" | localize()}}</th>
        <th>{{"Category" | localize()}}</th>
        <th>{{"Type" | localize()}}</th>
        <th>{{"Open" | localize()}}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="record of records" :key="record.id"> 
        <td>{{record.countNumber}}</td>
        <td>{{record.amount | currency()}}</td>
        <td>{{record.date | date('datetime')}}</td>
        <td>{{record.categoryName}}</td>
        <td>
          <span class="white-text badge" :class="[record.typeColor]">{{record.typeText}}</span>
        </td>
        <td>
          <button class="btn-small btn light-blue accent-3" v-tooltip="'OpenRecord'" @click="$router.push('/details/' + record.id)">
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>



<script>
export default {
    name: 'HistoryTable',
    props: {
        records: {
            required: true,
            type: Array
        }
    }

};
</script>
