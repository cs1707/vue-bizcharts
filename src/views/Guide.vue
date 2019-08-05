
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

import Guide, { RegionFilter, DataMarker, Text, DataRegion } from '@/components/Guide'

import data from './income.json'

// const { RegionFilter, DataMarker, Text, DataRegion } = Guide;

const scale = {
  time: {
    range: [0, 1]
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
      <Chart height={400} width={1000} data={data} scale={scale} forceFit>
        <Axis/>
        <Geom type="line" position="time*rate"/>
        <Guide>
          <DataMarker
            position={['2014-01-03', 6.763]}
            content={'受稳健货币政策影响，协定存款利\n率居高不下,收益率达6.763%'}
            style={{
              text: {
                textAlign: 'left'
              }
            }}
          />
          <DataMarker top={false} position={['2013-05-31', 2.093]}
            content={'余额宝刚成立时，并未达到目标资产\n配置，故收益率较低'}
            style={{
              text: {
                textAlign: 'left'
              }
            }}
          />
          <DataMarker top={false} position={['2016-09-04', 2.321]}
            content={'受积极货币政策的影响，收益率降\n到历史最低2.321%'}
            style={{
              text: {
                textAlign: 'left'
              }
            }}
          />
          <DataRegion top={false}
            start={['2016-12-02', 2.513]}
            end={['2017-03-24', 3.83]}
            content={'宏观经济过热，受稳健货币政策影\n响，余额宝收益率随之上升'}
            lineLength={50}
          />
        </Guide>
      </Chart>
    )
  }
}
</script>
