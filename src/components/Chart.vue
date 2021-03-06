
<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import G2 from '@antv/g2'
import ResizeObserver from 'resize-observer-polyfill'
import { debounce } from '@/utils'

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
    pixelRatio: 'shouldRebuild',
    data (data) {
      this.g2Instance.changeData(data)
    },
    scale (scale) {
      if (Array.isArray(scale)) {
        this.g2Instance.scale(...scale)
      } else {
        this.g2Instance.scale(scale)
      }
    },
    animate (animate) {
      this.g2Instance.animate(animate)
    },
    width (width) {
      this.g2Instance.changeWidth(width)
    },
    height (height) {
      this.g2Instance.changeHeight(height)
    },
    forceFit (forceFit) {
      if (forceFit) {
        this.observer.observe(this.$el)
      } else {
        this.observer.unobserve(this.$el)
      }
    }
  },
  mounted () {
    this.createChart()
    this.updateChart()
    this.bindEvents()
    this.g2Instance.render()
    this.resetState()
    this.resizeHander = debounce(() => {
      if (!this.g2Instance) return
      this.g2Instance.forceFit()
    }, 300)
    this.observer = new ResizeObserver(this.resizeHander)
    if (this.forceFit) {
      this.observer.observe(this.$el)
    }
  },
  updated () {
    if (this.needRebuild) {
      console.log('chart rebuild')
      this.g2Instance.destroy()
      this.createChart()
      this.updateChart()
      this.bindEvents()
      this.g2Instance.render()
    } else if (this.needReExecute) {
      console.log('chart needReexecute')
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
    if (this.resizeHander) {
      this.resizeHander.cancel()
    }
    if (this.forceFit) {
      this.observer.unobserve(this.$el)
    }
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
    bindEvents () {
      const chart = this.g2Instance
      const shapes = ['point', 'area', 'line', 'path', 'interval', 'schema', 'polygon', 'edge',
        'axis-title', 'axis-label', 'axis-ticks', 'axis-line', 'axis-grid', 'legend-title',
        'legend-item', 'legend-marker', 'legend-text', 'guide-text', 'guide-region',
        'guide-line', 'guide-image', 'label'
      ]
      const events = [
        'mouseenter',
        'mousemove',
        'mouseleave',
        'click',
        'dblclick',
        'mousedown',
        'mouseup',
        'touchstart',
        'touchmove',
        'touchend'
      ]
      events.forEach(eventName => {
        chart.on(eventName, (...args) => this.$emit(eventName, ...args))
      })
      events.forEach(eventName => {
        shapes.forEach(shapeName => {
          chart.on(`${shapeName}:${eventName}`, (...args) => this.$emit(`${shapeName}-${eventName}`, ...args))
        })
      })
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
