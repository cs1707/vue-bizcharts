
import { Chart, Geom, Axis, Coord, Label } from '@/components'
import { DataView } from '@antv/data-set'

const data = [
  { item: '事例一', count: 40 },
  { item: '事例二', count: 21 },
  { item: '事例三', count: 17 },
  { item: '事例四', count: 13 },
  { item: '事例五', count: 9 }
]
const dv = new DataView()
dv.source(data).transform({
  type: 'percent',
  field: 'count',
  dimension: 'item',
  as: 'percent'
})
const cols = {
  percent: {
    formatter: val => {
      val = (val * 100) + '%'
      return val
    }
  }
}

export default {
  render () {
    return <Chart height={window.innerHeight} data={dv} scale={cols} renderer="svg" forceFit>
      <Coord type='theta' radius={0.75} />
      <Axis name="percent" />
      <Geom
        type="intervalStack"
        position="percent"
        color='item'
      >
        <Label content='percent' formatter={(val, item) => {
          return item.point.item + ': ' + val
        }} />
      </Geom>
    </Chart>
  }
}
