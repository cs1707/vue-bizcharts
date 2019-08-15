<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>

export default {
  name: 'BizGeom',
  inject: {
    chart: {},
    view: {
      default: null
    }
  },
  provide () {
    return {
      geom: this
    }
  },
  props: {
    type: String,
    adjust: [String, Array, Object],
    position: [String, Array],
    color: [String, Array],
    shape: [String, Array],
    size: [String, Array, Number],
    opacity: [String, Array, Number],
    styles: [Object, Array],
    tooltip: {
      type: [Boolean, String, Array],
      default: undefined // todo 看下g2源码，这个初始值是多少
    },
    select: {
      type: [Boolean, Array],
      default: true
    },
    active: {
      type: [Boolean, Array],
      default: true
    },
    animate: Object,
    hide: Boolean
  },
  beforeMount () {
    this.addElement()
  },
  watch: {
    type: 'shouldReExecute',
    color: 'shouldReExecute',
    size: 'shouldReExecute',
    shape: 'shouldReExecute',
    adjust: {
      handler (val) {
        if (!this.g2Instance) {
          return
        }
        this.adjust(val)
      },
      deep: true
    },
    position (val) {
      this.handlePropChange('position', val)
    },
    opacity (val) {
      this.handlePropChange('opacity', val)
    },
    styles: {
      handler (val) {
        // 注意这里是 style
        this.handlePropChange('style', val)
      },
      deep: true
    },
    tooltip (val) {
      this.handlePropChange('tooltip', val)
    },
    select (val) {
      this.handlePropChange('select', val)
    },
    active (val) {
      this.handlePropChange('active', val)
    },
    animate: {
      handler (val) {
        this.handlePropChange('animate', val)
      },
      deep: true
    },
    hide (val) {
      if (!this.g2Instance) {
        return
      }
      if (val) {
        this.g2Instance.show()
      } else {
        this.g2Instance.hide()
      }
    }
  },
  beforeDestroy () {
    this.getParent().needReExecute = true
  },
  methods: {
    addElement () {
      const g2Instance = this.getParent().g2Instance
      if (!g2Instance) {
        return
      }
      const geom = g2Instance[this.type]()

      const methods = ['position', 'color', 'size', 'shape',
        'opacity', 'tooltip', 'style', 'animate', 'active', 'select', 'sets']
      const args = {
        ...this.$props,
        style: this.styles
      }

      if (args.adjust !== undefined) {
        geom.adjust(args.adjust)
      }

      if (args.hide) {
        geom.hide()
      } else {
        geom.show()
      }

      methods.forEach(method => {
        let arg = args[method]
        if (arg === undefined) {
          return
        }
        if (!Array.isArray(arg)) {
          arg = [arg]
        }
        geom[method](...arg)
      })

      this.g2Instance = geom
      this.chart.needRepaint = true
    },
    shouldReExecute () {
      this.getParent().needReExecute = true
    },
    handlePropChange (key, val) {
      if (!this.g2Instance) {
        return
      }
      const args = Array.isArray(val) ? val : [val]
      this.g2Instance[key](...args)
      this.chart.needRepaint = true
    },
    getParent () {
      return this.view || this.chart
    }
  }
}
</script>
