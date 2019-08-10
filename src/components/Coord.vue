<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import omit from 'lodash/omit'

export default {
  name: 'BizCoord',
  inject: {
    chart: {},
    view: {
      default: null
    }
  },
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: 'rect'
    },
    rotate: Number,
    scale: Array,
    reflect: [String, Array],
    transpose: Boolean
  },
  watch: {
    $props: {
      handler () {
        this.updateElement()
      },
      deep: true
    }
  },
  beforeMount () {
    this.addElement()
  },
  beforeDestroy () {
    this.removeElement()
  },
  methods: {
    addElement () {
      this.updateElement()
    },
    updateElement () {
      const g2Instance = this.getParent().g2Instance
      if (!g2Instance) {
        return
      }
      const { type, ...others } = {
        ...this.$props,
        ...this.$attrs
      }
      const methods = ['rotate', 'scale', 'reflect', 'transpose']
      const coordIns = g2Instance.coord(
        type || 'rect',
        omit(others, methods)
      )
      methods.forEach(method => {
        let arg = others[method]
        if (arg === undefined) {
          return
        }
        if (!Array.isArray(arg)) {
          arg = [arg]
        }
        if (method === 'reflect') {
          arg.forEach(v => {
            coordIns[method](v)
          })
        } else if (method === 'transpose') {
          if (arg[0] === true) {
            coordIns[method](...arg)
          }
        } else {
          coordIns[method](...arg)
        }
      })
      this.g2Instance = coordIns
      this.getParent().needRepaint = true
    },
    removeElement () {
      const g2Instance = this.getParent().g2Instance
      if (!g2Instance) {
        return
      }
      console.log(this.getParent())
      console.log(this.getParent().g2Instance)
      console.log('????')
      g2Instance.coord('rect', {})
      this.getParent().needRepaint = true
    },
    getParent () {
      return this.view || this.chart
    }
  }
}
</script>
