import Heatmap from './heatmap'
import Image from './image'
import Reactangle from './rectangle'

export default {
  render () {
    return (
      <div className='headmap-charts'>
        <div className='headmap-chart'>
          <Heatmap />
          <Image />
          <Reactangle />
        </div>
      </div>
    )
  }
}
