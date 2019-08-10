import Jitter from './jitter'
import Bubble from './bubble'

export default {
  render () {
    return (
      <div className='point-charts'>
        <div className='point-chart-demo'>
          <Jitter />
          <Bubble />
        </div>
      </div>
    )
  }
}
