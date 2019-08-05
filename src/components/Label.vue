<script>

export default {
  name: 'BizLabel',
  inject: {
    chart: {},
    view: {
      default: null
    },
    geom: {}
  },
  props: {
    content: [String, Array],
    labelLine: Object,
    position: String,
    offset: Number,
    textStyle: [Object, Function],
    autoRotate: {
      type: Boolean,
      default: true
    },
    formatter: Function,
    htmlTemplate: Function
  },
  beforeMount () {
    this.addElement()
  },
  beforeUpdate () {
    console.log('label before update')
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
      const { content, ...labelOthers } = this.$props

      if (content) {
        if (Array.isArray(content)) {
          this.g2Instance = g2Instance.label(content[0], content[1], labelOthers)
        } else {
          this.g2Instance = g2Instance.label(content, labelOthers)
        }
        this.chart.needRepaint = true
      }
    },
    getParent () {
      return this.geom
    }
  },
  render () {
    return null
  }
}
</script>
