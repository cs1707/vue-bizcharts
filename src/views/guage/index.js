import Basic from './basic'
import Color from './color'
import Text from './text'

export default {
  render () {
    return (
      <div className='guage'>
        <div className='guage-basic'>
          <Basic />
          <Color />
          <Text />
        </div>
      </div>
    )
  }
}
