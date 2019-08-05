<template>
  <div class="home">
    <!-- <Parent>
      <Child></Child>
    </Parent> -->
    <div>
      <button type="button" @click="padding = padding + 10">change padding</button> {{padding}}
    </div>
    <div>
      <button type="button" @click="type = type == 'area' ? 'line' : 'area'">change type</button> {{type}}
    </div>
    <div>
      <button type="button" @click="isShowGeom1 = !isShowGeom1">toggle geom</button> {{isShowGeom1}}
      <button type="button" @click="opacity += 0.1">update opacity</button> {{opacity}}
    </div>
    <Chart
      :height="500"
      :width="500"
      :data="data"
      :scale="scale">
      <!-- <Legend></Legend> -->
      <Axis name="value"/>
      <Axis name="year" :visible="true"/>
      <Coord type="rect"></Coord>
      <Tooltip :crosshairs="{type : 'y'}"/>
      <!-- <Geom
        :type="type"
        position="year*value"
        :size="2">
      </Geom>
      <Geom
        type="point"
        position="year*value"
        :size="4"
        shape="circle"
      /> -->
       <Geom type="line" position="year*value" :size="2" />
        <Geom type='point' position="year*value" :size="4" shape="circle"
        :styles="{ stroke: '#fff', lineWidth: 1}" />

    </Chart>
  </div>
</template>

<script>
// @ is an alias to /src
import Chart from '@/components/Chart'
import Geom from '@/components/Geom'
import Axis from '@/components/Axis'
import Coord from '@/components/Coord'
import Legend from '@/components/Legend'
import Tooltip from '@/components/Tooltip'

export default {
  name: 'home',
  components: {
    Chart,
    Geom,
    Axis,
    Coord,
    Legend,
    Tooltip
  },
  data () {
    return {
      isShowGeom1: false,
      padding: 100,
      type: 'line',
      opacity: 0.1,

      data: [
        { year: '1991', value: 3 },
        { year: '1992', value: 4 },
        { year: '1993', value: 3.5 },
        { year: '1994', value: 5 },
        { year: '1995', value: 4.9 },
        { year: '1996', value: 6 },
        { year: '1997', value: 7 },
        { year: '1998', value: 9 },
        { year: '1999', value: 13 }
      ],
      scale: {
        'value': { min: 0 },
        'year': { range: [ 0, 1 ] }
      }
    }
  },
  mounted () {
    // setTimeout(() => {
    //   this.isShowAxis = true
    // }, 5000)
  }
}
</script>
