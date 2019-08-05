<template>
  <div class="home">
    <div>
      <button type="button" @click="type = type == 'intervalStack' ? 'line' : 'intervalStack'">change type</button> {{type}}
    </div>
    <div>
      <button type="button" @click="isShowGeom1 = !isShowGeom1">toggle geom</button> {{isShowGeom1}}
      <button type="button" @click="opacity += 0.1">update geom</button> {{opacity}}
    </div>
    <Chart :height="500" :data="dv" :scale="cols" :padding="padding">
      <Legend />
    <Coord type='theta' :radius="0.5" />
    <!-- <Tooltip
      showTitle={false}
      itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
      /> -->
    <Geom
      :type="type"
      position="percent"
      color='type'
      :tooltip="['name*percent',(item, percent) => {
        percent = (percent * 100).toFixed(2) + '%';
        return {
          name: item,
          value: percent
        };
      }]"
      :styles="{lineWidth: 1,stroke: '#fff'}"
      :select="false"
      >
      <Label content='type' :offset="-10" />
    </Geom>
    <BizView :data="dv1" :scale="cols" >
      <Coord type='theta' :radius="0.75" :innerRadius="0.5 / 0.75"/>
      <Geom
        :opacity="opacity"
        :type="type"
        position="percent"
        :color="['name', [ '#BAE7FF', '#7FC9FE', '#71E3E3', '#ABF5F5', '#8EE0A1', '#BAF5C4' ]]"
        :tooltip="['name*percent',(item, percent) => {
          percent = (percent * 100).toFixed(2) + '%';
          return {
            name: item,
            value: percent
          };
        }]"
        :styles="{lineWidth: 1,stroke: '#fff'}"
        :select="false"
      >
      <Label content='name'/>
      </Geom>
    </BizView>
  </Chart>
  </div>
</template>

<script>
// @ is an alias to /src
import Chart from '@/components/Chart'
import Geom from '@/components/Geom'
import Axis from '@/components/Axis'
import Coord from '@/components/Coord'
import BizView from '@/components/View'
import Label from '@/components/Label'
import Legend from '@/components/Legend'

import DataSet from '@antv/data-set'

const { DataView } = DataSet

const data = [
  { value: 251, type: '大事例一', name: '子事例一' },
  { value: 1048, type: '大事例一', name: '子事例二' },
  { value: 610, type: '大事例二', name: '子事例三' },
  { value: 434, type: '大事例二', name: '子事例四' },
  { value: 335, type: '大事例三', name: '子事例五' },
  { value: 250, type: '大事例三', name: '子事例六' }
]
const dv = new DataView()
dv.source(data).transform({
  type: 'percent',
  field: 'value',
  dimension: 'type',
  as: 'percent'
})
const cols = {
  percent: {
    formatter: val => {
      val = (val * 100).toFixed(2) + '%'
      return val
    }
  }
}

const dv1 = new DataView()
dv1.source(data).transform({
  type: 'percent',
  field: 'value',
  dimension: 'name',
  as: 'percent'
})

export default {
  name: 'home',
  components: {
    Chart,
    Geom,
    Axis,
    Coord,
    BizView,
    Label,
    Legend
  },
  data () {
    return {
      isShowGeom1: false,
      padding: [ 80, 100, 80, 80 ],
      type: 'intervalStack',
      opacity: 0.1,

      dv,
      dv1,
      cols
    }
  },
  mounted () {
    // setTimeout(() => {
    //   this.isShowAxis = true
    // }, 5000)
  }
}
</script>
