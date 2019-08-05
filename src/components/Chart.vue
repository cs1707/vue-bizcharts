
<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import G2 from '@antv/g2'

export default {
  name: 'BizChart',
  props: {
    renderer: {
      type: String, // svg or canvas
      default: 'canvas'
    },
    forceFit: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number
    },
    height: {
      type: Number
      // required: true
    },
    data: {
      type: [Array, Object]
    },
    scale: {
      type: Object
    },
    placeholder: {
      type: String
    },
    padding: {
      type: [Object, Number, Array, String]
    },
    animate: {
      type: Boolean,
      default: true
    },
    background: {
      type: Object
    },
    plotBackground: {
      type: Object
    },
    pixelRatio: {
      type: Number
    },
    filter: {
      type: Array
    },
    theme: {
      type: [String, Object]
    }
  },
  data () {
    return {
      needRebuild: false,
      needReExecute: false,
      needRepaint: false
    }
  },
  provide () {
    return {
      chart: this
    }
  },
  watch: {
    padding: 'shouldRebuild',
    background: 'shouldRebuild',
    plotBackground: 'shouldRebuild',
    pixelRatio: 'shouldRebuild'
  },
  mounted () {
    this.createChart()
    this.updateChart()
    this.g2Instance.render()
    this.resetState()
  },
  updated () {
    if (this.needRebuild) {
      this.g2Instance.destroy()
      this.createChart()
      this.updateChart()
      this.g2Instance.render()
    } else if (this.needReExecute) {
      this.g2Instance.clear()
      this.updateChart()
      this.g2Instance.repaint()
    } else if (this.needRepaint) {
      this.g2Instance.repaint()
    }
    this.resetState()
  },
  beforeDestroy () {
    console.log('chart before destroy')
    this.g2Instance.destroy()
    this.g2Instance = null
    // if (this.forceFit) {
    //   this.forceFit.cancel()
    // }
    // if (this.observe) {
    //   this.observe.unobserve(this.containerWrap)
    // }
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
    shouldRebuild (a, b) {
      this.needRebuild = true
    },

    createChart () {
      const props = {
        ...this.$props,
        forceFit: false,
        container: this.$el
      }
      const chart = new G2.Chart(props)
      this.g2Instance = chart
      return chart
    },

    updateChart () {
      const chart = this.g2Instance
      const props = this.$props
      chart.coord('rect', {})
      chart.source(props.data, props.scale)
      if ((!this.facet && !props.axis) || (!this.facet || props.axis === false)) {
        chart.axis(false)
      }
      chart.legend(false)
      chart.tooltip(false)
      if (props.filter) {
        props.filter.forEach((filterArg) => {
          chart.filter(filterArg[0], filterArg[1])
        })
      }
      this.traverse(this.$children, (vm) => {
        if (vm.addElement) {
          vm.addElement()
        }
      })
    },

    resetState () {
      this.needRebuild = false
      this.needReExecute = false
      this.needRepaint = false
    }
  }
}
</script>
