import RegionFilterGuide2 from './regionFilter-guide2'
import DataMarkerDataRegion from './dataMarker_dataRegion'
import RegionFilterRealtime from './regionFilter-realtime'

export default {
  render () {
    return (
      <div className='guide'>
        <RegionFilterRealtime/>
        <RegionFilterGuide2 />
        <DataMarkerDataRegion />
      </div>
    )
  }
}
