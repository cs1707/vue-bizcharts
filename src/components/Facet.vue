<script>

export default {
  name: 'BizFacet',
  inject: {
    chart: {}
  },
  props: {
    type: String,
    fields: [String, Array],
    padding: Number,
    showTitle: {
      type: Boolean,
      default: true
    },
    autoSetAxis: {
      type: Boolean,
      default: true
    },
    colTitle: Object,
    rowTitle: Object,
    eachView: Function,
    rows: {},
    cols: {},
    rowIndex: {},
    colIndex: {},
    rowField: {},
    colField: {}
  },
  beforeMount () {
    this.chart.facet = this
    this.addElement()
  },
  beforeUpdate () {
  },
  watch: {
    $props: {
      handler (val) {
        // 疑问：如何隐藏 label 🤔 ️
        this.updateElement()
      },
      deep: true
    }
  },
  beforeDestroy () {
    this.chart.facet = null
    this.chart.needReExecute = true
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
      const { type, ...config } = this.$props
      console.log(config)
      g2Instance.facet(type, config)
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
