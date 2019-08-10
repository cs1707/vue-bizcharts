import Basic from './basic.js'
import Percent from './percent'
import Stacked from './stacked'

export default {
  render () {
    return (
      <div class='Area-charts'>
        <div class='Area-chart-basic'>
          <Basic />
        </div>
        <div class='Area-chart-Percent'>
          <Percent />
        </div>
        <div class='Area-chart-Stacked'>
          <Stacked />
        </div>
      </div>
    )
  }
}
