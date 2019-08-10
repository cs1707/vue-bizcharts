import Vue from 'vue'
const Guide = {
  name: 'BizGuide',
  inject: {
    chart: {},
    view: {
      default: null
    }
  },
  provide () {
    return {
      guide: this
    }
  },
  mounted () {
    this.needRebuild = false
  },
  beforeUpdate () {
    console.log('geom before update')
  },

  updated () {
    this.updateElement()
  },

  beforeDestroy () {
    if (this.getParent().g2Instance) {
      this.getParent().g2Instance.guide().clear()
    }
    this.chart.needRepaint = true
  },
  methods: {
    traverse (children, callback) {
      if (children) {
        children.forEach(child => {
          callback(child)
          this.traverse(child.$children, callback)
        })
      }
    },
    updateElement () {
      if (!this.needRebuild) {
        return
      }
      const g2Instance = this.getParent().g2Instance
      if (!g2Instance) {
        return
      }

      g2Instance.clear()

      this.traverse(this.$children, vm => {
        if (vm.addElement) {
          vm.addElement()
        }
      })
      this.needRebuild = false
      this.chart.needRepaint = true
    },
    getParent () {
      return this.view || this.chart
    }
  },
  render () {
    return <div>{this.$slots.default}</div>
  }
}

const Base = {
  inject: {
    chart: {},
    guide: {},
    view: {
      default: null
    }
  },
  beforeMount () {
    this.addElement()
  },
  inheritAttrs: false,
  watch: {
    $attrs: {
      handler () {
        this.guide.needRebuild = true
      },
      deep: true
    }
  },
  beforeUpdate () {

  },

  updated () {

  },

  beforeDestroy () {
    this.guide.needRebuild = true
  },
  methods: {
    addElement () {
      const g2Instance = this.getParent().g2Instance
      if (!g2Instance) {
        return
      }
      console.log(this.$options.type)
      g2Instance.guide()[this.$options.type](this.$attrs)
      this.guide.needRebuild = true
      this.getParent().needRepaint = true
    },
    getParent () {
      return this.view || this.chart
    }
  },
  render () {
    return null
  }
}

const [Line, Text, Image, Region, Html, Arc, RegionFilter, DataMarker, DataRegion] =
['Line', 'Text', 'Image', 'Region', 'Html', 'Arc', 'RegionFilter', 'DataMarker', 'DataRegion']
  .map(type => {
    const comp = Vue.extend({
      ...Base,
      name: 'BizGuide' + type,
      type: type[0].toLowerCase() + type.slice(1)
    })
    Guide[type] = comp
    return comp
  })

export default Guide
export {
  Line, Text, Image, Region, Html, Arc, RegionFilter, DataMarker, DataRegion
}
