
<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BizView',
  inject: ['chart'],
  props: {
    start: Object,
    end: Object,
    data: [Array, Object],
    animate: {
      type: Boolean,
      default: true
    },
    scale: Object,
    filter: Array
  },
  data () {
    return {
      needReExecute: false
    }
  },
  provide () {
    return {
      view: this
    }
  },
  watch: {
  },
  beforeMount () {
    this.addElement()
  },
  updated () {
    this.updateElement()
  },
  beforeDestroy () {
    this.removeElement()
  },
  methods: {
    traverse (vm, callback) {
      if (!vm) {
        return
      }
      callback(vm)
      if (vm.$children) {
        vm.$children.forEach(child => {
          this.traverse(child, callback)
        })
      }
    },
    addElement (instance) {
      const g2Instance = this.chart.g2Instance
      if (!g2Instance) {
        return
      }
      const { start, end, data, animate, scale, filter } = this.$props
      const view = g2Instance.view({
        start,
        end,
        animate
      })
      if (data) {
        view.source(data, scale)
      }

      if (scale) {
        view.scale(scale)
      }

      if (filter) {
        filter.forEach((filterArg) => {
          view.filter(filterArg[0], filterArg[1])
        })
      }

      view.axis(false)
      this.g2Instance = view
      this.chart.needRepaint = true
    },
    updateElement () {
      if (!this.needReExecute) {
        return
      }
      this.g2Instance.clear()
      // const { start, end, data, animate, scale, filter } = this.$props
      const { data, scale, filter } = this.$props
      // 🤔️ 这里是不是有坑 start end
      const view = this.g2Instance
      if (data) {
        view.source(data, scale)
      }

      if (scale) {
        view.scale(scale)
      }

      if (filter) {
        filter.forEach((filterArg) => {
          view.filter(filterArg[0], filterArg[1])
        })
      }

      view.axis(false)
      this.traverse({ $children: this.$children }, vm => {
        if (vm.addElement) {
          vm.addElement()
        }
      })
      this.chart.needRepaint = true
    },
    removeElement () {
      const g2Instance = this.chart.g2Instance
      this.g2Instance = null
      if (!g2Instance) {
        return
      }
      g2Instance.removeView(this.g2Instance)
      this.chart.needRepaint = true
    }
  }
}
</script>
