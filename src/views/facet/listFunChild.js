import { Chart, Geom, Facet, Tooltip, Legend, View } from '@/components'
import data from '../../data/diamond.json'

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
  render () {
    return (
      <Chart height={450} data={data} width={800} height={600} padding={[30, 80, 80, 80]} scale={scale}>
        <Tooltip />
        <Legend />
        <Facet type='list' fields={['cut']} cols={3} padding={30} >
          <View>
            <Geom
              type='point'
              position='carat*price'
              color='cut'
              shape='circle'
              size={3}
            />
          </View>
        </Facet>
      </Chart>
    )
  }
}
