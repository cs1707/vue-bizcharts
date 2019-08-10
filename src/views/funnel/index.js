import Basic from './basic'
import Symmetric from './symmetric'

export default {
  render () {
    return (
      <div className='funnel-charts'>
        <div className='funnel-chart'>
          <Basic />
          <Symmetric />
        </div>
      </div>
    )
  }
}
