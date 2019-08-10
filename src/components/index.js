import Axis from './Axis'
import Chart from './Chart'
import Coord from './Coord'
import Facet from './Facet'
import Geom from './Geom'
import Guide, {
  Line as GuideLine,
  Text as GuideText,
  Image as GuideImage,
  Region as GuideRegion,
  Html as GuideHtml,
  Arc as GuideArc,
  RegionFilter as GuideRegionFilter,
  DataMarker as GuideDataMarker,
  DataRegion as GuideDataRegion
} from './Guide'
import Label from './Label'
import Legend from './Legend'
import Tooltip from './Tooltip'
import View from './View'
import G2, { Shape, PathUtil, Animate } from '@antv/g2'
const setTheme = (theme) => {
  G2.Global.setTheme(theme)
}

const components = [
  Axis,
  Chart,
  View,
  Coord,
  Facet,
  Geom,
  Guide,
  Label,
  Legend,
  Tooltip,
  GuideLine,
  GuideText,
  GuideImage,
  GuideRegion,
  GuideHtml,
  GuideArc,
  GuideRegionFilter,
  GuideDataMarker,
  GuideDataRegion
]
const install = function (Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  Axis,
  Chart,
  View,
  Coord,
  Facet,
  Geom,
  Guide,
  Label,
  Legend,
  Tooltip,

  // g2
  Shape,
  PathUtil,
  Animate,
  setTheme
}

export default {
  install,

  Axis,
  Chart,
  View,
  Coord,
  Facet,
  Geom,
  Guide,
  Label,
  Legend,
  Tooltip,
  GuideLine,
  GuideText,
  GuideImage,
  GuideRegion,
  GuideHtml,
  GuideArc,
  GuideRegionFilter,
  GuideDataMarker,
  GuideDataRegion,

  // g2
  Shape,
  PathUtil,
  Animate,
  setTheme
}
