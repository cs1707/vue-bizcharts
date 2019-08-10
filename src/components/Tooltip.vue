<script>

export default {
  name: 'BizTooltip',
  inject: {
    chart: {},
    view: {
      default: null
    }
  },
  inheritAttrs: false,
  props: {
    useHtml: {
      type: Boolean,
      default: true
    },
    type: String,
    triggerOn: {
      type: String,
      default: 'mousemove'
    },
    inPlot: {
      type: Boolean,
      default: true
    },
    position: String,
    showTitle: {
      type: Boolean,
      default: true
    },
    title: String,
    shared: {
      type: Boolean,
      default: true
    },
    follow: {
      type: Boolean,
      default: true
    },
    offset: Number,
    enterable: {
      type: Boolean,
      default: false
    },
    crosshairs: [Object, Boolean],
    hideMarkers: {
      type: Boolean
    },
    htmlContent: Function,
    containerTpl: String,
    itemTpl: String,
    'g2-tooltip': Object,
    'g2-tooltip-title': Object,
    'g2-tooltip-list': Object,
    'g2-tooltip-list-item': Object,
    'g2-tooltip-marker': Object,
    boardStyle: Object,
    titleStyle: Object,
    nameStyle: Object,
    valueStyle: Object,
    itemGap: Number,
    triangleWidth: Number,
    triangleHeight: Number
  },
  beforeMount () {
    this.addElement()
  },
  beforeUpdate () {
    console.log('legend before update')
  },
  watch: {
    $props: {
      handler (val) {
        this.updateElement()
      },
      deep: true
    }
  },
  beforeDestroy () {
    console.log('tooltip before destroy')
    this.deleteElement()
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
      this.g2Instance = g2Instance.tooltip({ ...this.$props, ...this.$attrs })
      this.chart.needRepaint = true
    },
    deleteElement () {
      const g2Instance = this.getParent().g2Instance
      if (!g2Instance) {
        return
      }
      g2Instance.tooltip(false)
      this.chart.needRepaint = true
    },
    getParent () {
      return this.view || this.chart
    }
  },
  render () {
    return null
  }
}
</script>
