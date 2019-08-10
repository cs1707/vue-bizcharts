import { Chart, Geom, Axis, Tooltip } from '@/components'

const data = [
  { year: '1951 年', sales: 38 },
  { year: '1952 年', sales: 52 },
  { year: '1956 年', sales: 61 },
  { year: '1957 年', sales: 145 },
  { year: '1958 年', sales: 48 },
  { year: '1959 年', sales: 38 },
  { year: '1960 年', sales: 38 },
  { year: '1962 年', sales: 38 }
]
const cols = {
  'sales': { tickInterval: 20 }
}

export default {
  render () {
    return (
      <Chart height={400} data={data} scale={cols} forceFit>
        <Axis name="year" />
        <Axis name="value" />
        <Tooltip crosshairs={{ type: 'y' }}/>
        <Geom type="interval" position="year*sales" />
      </Chart>
    )
  }
}
