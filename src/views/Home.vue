<template>
  <div class="home">
    <ul>
      <li v-for="item in routes" :key="item">
        <router-link :to="`/demo/${item}`">
          {{item}}
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
        'area',
        'bar',
        'facet',
        'funnel',
        'guage',
        'guide',
        'heatmap',
        'line',
        'map',
        'others',
        'pie',
        'point',
        'relation',
        'slider',
        'theme'
      ]
    }
  }
}
</script>
