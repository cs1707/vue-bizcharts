<script>

export default {
  name: 'BizLegend',
  inject: {
    chart: {}
  },
  props: {
    name: String,
    visible: {
      type: Boolean,
      default: true
    },
    reversed: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'bottom-center'
    },
    layout: String,
    title: [Boolean, Object],
    offsetX: {
      type: Number,
      default: 0
    },
    offsetY: {
      type: Number,
      default: 0
    },
    itemGap: Number,
    itemMarginBottom: Number,
    itemWidth: Number,
    unCheckColor: String,
    background: Object,
    allowAllCanceled: Boolean,
    itemFormatter: Function,
    marker: [String, Function],
    textStyle: Object,
    attachLast: {
      type: Boolean,
      default: false
    },
    clickable: {
      type: Boolean,
      default: true
    },
    hoverable: {
      type: Boolean,
      default: true
    },
    selectedMode: String,
    onHover: Function,
    onClick: Function,
    useHtml: {
      type: [Boolean, Function],
      default: false
    },
    container: String,
    containerTpl: String,
    itemTpl: [String, Function],
    'g2-legend': Object,
    'g2-legend-item': Object,
    'g2-legend-list-item': Object,
    'g2-legend-marker': Object,
    'g2-legend-text': Object,
    scroll: Boolean,
    custom: Boolean,
    items: Object,
    sizeType: String,
    slidable: {
      type: Boolean,
      default: true
    },
    width: Number,
    Height: Number
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
      const { name, visible, ...cfg } = this.$props
      if (visible) {
        this.g2Instance = g2Instance.legend(...(name ? [name, cfg] : [cfg]))
      } else {
        this.g2Instance = g2Instance.legend(...(name ? [name, visible] : [visible]))
      }
      this.getParent().needRepaint = true
    },
    deleteElement () {
      const g2Instance = this.getParent().g2Instance
      if (!g2Instance) {
        return
      }
      // 🤔️ 好坑，g2 设了一个所有的都会显示，重置成 false 可能会跟初始状态不一致
      g2Instance.legend(...(this.name ? [name, false] : [false]))
      this.getParent().needRepaint = true
    },
    getParent () {
      return this.chart
    }
  },
  render () {
    return null
  }
}
</script>
