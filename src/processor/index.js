import G2 from '@antv/g2'

export default class Processor {
  constructor () {
    this.config = {}
    this.elementInfos = {}
    this.added = false
    this.initedG2 = false
    this.updated = false
    this.deleted = false
    this.deleteInfos = {}
    console.log(this)
  }

  createChart (config) {
    const vm = config.chart
    const props = {
      ...vm.$props,
      forceFit: false,
      container: vm.$el
    }
    const chart = new G2.Chart(props)
    vm.g2Instance = chart
    return chart
  }

  executeChartConfig (chart, config) {
    const vm = config.chart
    const props = vm.$props

    chart.coord('rect', {})
    chart.source(props.data, props.scale)
    if ((!vm.facet && !props.axis) || (!vm.facet || props.axis === false)) {
      chart.axis(false)
    }
    chart.legend(false)
    chart.tooltip(false)
    if (props.filter) {
      props.filter.forEach((filterArg) => {
        chart.filter(filterArg[0], filterArg[1])
      })
    }
  }

  synchronizeG2Add (chart, config) {
    const { geoms, axes } = config
    Object.values({ ...geoms, ...axes }).forEach(vm => {
      vm.addElement()
    })
    // this.coord(chart, config);
    // this.axises(chart, config);
    // this.legends(chart, config);
    // this.tooltip(chart, config);
    // this.geoms(chart, config);
    // this.facet(chart, config);
    // this.views(chart, config);
    // // this.synchronizeG2Views(chart, config);
    // this.guide(chart, config.guide);
  }

  createG2Instance () {
    const { config } = this

    const chart = this.createChart(config)

    this.chart = chart
    this.initedG2 = true
    return chart
  }

  destory () {
    this.chart.destroy()
    this.chart = null
  }
}
