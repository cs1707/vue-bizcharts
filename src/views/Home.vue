<template>
  <div class="home">
    <ul>
      <li v-for="item in routes" :key="item">
        <router-link :to="`/demo/${item}`">
          {{item[0].toUpperCase() + item.substring(1)}}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  data () {
    return {
      routes: [
        'line',
        'bar',
        'area',
        'point',
        'pie',
        'heatmap',
        'funnel',
        'relation',
        'facet',
        'theme',
        'guage',
        'map',
        'slider',
        'guide',
        'others'
      ]
    }
  }
}
</script>
