import {
  Chart,
  Geom,
  Tooltip,
  Label
} from '@/components'

export default {
  render () {
    var sets = [
      {
        sets: ['A'],
        size: 12,
        label: 'A'
      },
      {
        sets: ['B'],
        size: 12,
        label: 'B'
      },
      {
        sets: ['C'],
        size: 12,
        label: 'C'
      },
      {
        sets: ['A', 'B'],
        size: 2,
        label: 'A&B'
      },
      {
        sets: ['A', 'C'],
        size: 2,
        label: 'A&C'
      },
      {
        sets: ['B', 'C'],
        size: 2,
        label: 'B&C'
      },
      {
        sets: ['A', 'B', 'C'],
        size: 1
      }
    ]
    return (
      <div>
        <Chart height={window.innerHeight} padding={10} forceFit data={sets}>
          <Tooltip visible={false} />
          <Geom
            type="venn"
            color="label"
            active={false}
            size="size"
            style={{
              lineWidth: 10,
              padding: 10,
              textStyle: {
                fill: 'white',
                textAlign: 'center',
                fontSize: 32
              }
            }}
            sets={'sets'}
            position="x*y"
          >
            <Label content="label" textStyle={{ fill: 'white' }}/>
          </Geom>
        </Chart>
      </div>
    )
  }
}
