import { Chart, Facet, Tooltip, Legend } from '@/components'
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
