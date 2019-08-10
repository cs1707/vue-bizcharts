import Basic from './basic'
import BasicColumn from './basic-column'
import Grouped from './grouped'
import Historgram from './histogram'
import HistogramStack from './histogramStack'

export default {
  render () {
    return (
      <div className='bar-charts'>
        <div className='bar-chart-demos'>
          <Basic />
          <BasicColumn />
          <Grouped />
          <Historgram />
          <HistogramStack />
        </div>
      </div>
    )
  }
}
