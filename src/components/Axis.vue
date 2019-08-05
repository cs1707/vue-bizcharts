<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BizAxis',
  inject: ['chart'],
  props: {
    name: {
      type: String
      // required: true
    },
    visible: {
      type: Boolean,
      default: true
    },
    position: String,
    title: {
      type: [Object, Boolean],
      default: null
    },
    line: Object,
    tickLine: Object,
    label: Object,
    grid: Object,
    subTickCount: Number,
    subTickLine: Object
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

  },
  methods: {
    addElement () {
      this.updateElement()
    },
    updateElement () {
      const g2Instance = this.chart.g2Instance
      if (!g2Instance) {
        return
      }
      const { name, visible, ...others } = this.$props
      if (visible) {
        this.g2Instance = g2Instance.axis(name, others)
      } else {
        this.g2Instance = g2Instance.axis(name, false)
      }
      this.chart.needRepaint = true
    },
    removeElement () {
      // emmm 这里应该有坑
      this.chart.g2Instancet.axis(this.name, false)
      this.chart.needRepaint = true
    }
  }
}
</script>
