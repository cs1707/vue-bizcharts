
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
import Facet from '@/components/Facet'

import Guide, { RegionFilter, DataMarker, Text, DataRegion } from '@/components/Guide'

import data from './diamond.json'

const scale = {
  carat: {
    sync: true
  },
  price: {
    sync: true,
    tickCount: 3
  },
  cut: {
    sync: true
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
      data,
      scale
    }
  },
  mounted () {
    // setTimeout(() => {
    //   this.isShowAxis = true
    // }, 5000)
  },
  render () {
    return (
      <Chart height={450} data={data} width={800} height={600} padding={[30, 80, 80, 80]} scale={scale}>
        <Tooltip />
        <Legend />
        <Facet type='list' fields={['cut']} cols={3} padding={30} eachView={(view, facet) => {
          view.point()
            .position('carat*price')
            .color('cut')
            .shape('circle')
            .opacity(0.3)
            .size(3)
        }}>
        </Facet>
      </Chart>
    )
  }
}
</script>
