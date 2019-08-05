
<script>
// @ is an alias to /src
import Chart from '@/components/Chart'
import Geom from '@/components/Geom'
import Axis from '@/components/Axis'
import Coord from '@/components/Coord'
// import BizView from '@/components/View'
import Label from '@/components/Label'
import Legend from '@/components/Legend'
import Tooltip from '@/components/Tooltip'
import View from '@/components/View'

const data = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 }
]
const cols = {
  year: {
    type: 'linear',
    tickInterval: 50
  }
}

export default {
  name: 'home',
  components: {
    // Chart,
    // Geom,
    // Axis,
    // Coord,
    // Child,
    // BizView,
    // Label,
    // Legend
  },
  data () {
    return {
      isShowGeom1: false,
      padding: [ 80, 100, 80, 80 ],
      type: 'intervalStack',
      opacity: 0.1,

      data,
      cols,
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
  },
  render () {
    return (
      <Chart height={400} data={this.data} scale={this.scale}>
        <Axis name="year" />
        <Axis name="value" />
        <Tooltip crosshairs={{ type: 'y' }}/>
        <View></View>
        <Geom type="area" position="year*value" size={2} />
        <Geom type='point' position="year*value" size={4} shape={'circle'} style={{ stroke: '#fff', lineWidth: 1 }} />
      </Chart>
    )
  }
}
</script>
