import China from './china'
import Choropleth from './choropleth'

export default {
  render () {
    return (
      <div className='map-charts'>
        <div className='map-chart-china'>
          <China />
          <Choropleth />
        </div>
      </div>
    )
  }
}
