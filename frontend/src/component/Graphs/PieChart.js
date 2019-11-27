import React from 'react';
import * as d3 from 'd3';

class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.createBarChart = this.createPieChart.bind(this);
  }

  componentDidMount() {
    this.createPieChart();
  }

  createPieChart() {
    const margin = 40;
    const height = 450;
    const width = 700;
    const radius = Math.min(width, height) / 2 - margin;

    const rawSvg = d3
      .select(this.refs.pieChart)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
    const svg = rawSvg
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    const pie = d3.pie().value(d => d.value);
    const data = pie(d3.entries(this.props.data).sort((a, b) => b.value - a.value));
    const arcGenerator = d3
      .arc()
      .innerRadius(0)
      .outerRadius(radius);
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    svg
      .selectAll('mySlices')
      .data(data)
      .enter()
      .append('path')
      .attr('d', arcGenerator)
      .attr('fill', (d, i) => colorScale(i))
      .style('opacity', 0.7);

    // svg
    //   .selectAll('mySlices')
    //   .data(data)
    //   .enter()
    //   .append('text')
    //   .text(d => `${d.data.key}: ${d.data.value}`)
    //   .attr('transform', d => 'translate(' + arcGenerator.centroid(d) + ')')
    //   .style('text-anchor', 'middle')
    //   .style('font-size', 17);
    const legend = rawSvg
      .selectAll('legendElems')
      .data(data)
      .enter()
      .append('g')
      .attr('transform', (d, i) => 'translate(' + (width - 175) + ',' + (i * 20 + 20) + ')')
      .attr('class', 'legend');
    legend
      .append('rect')
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', (d, i) => colorScale(i));
    legend
      .append('text')
      .text(d => `${d.data.key}: ${d.data.value}`)
      .style('font-size', 12)
      .attr('y', 10)
      .attr('x', 15);
  }

  render() {
    return <div ref="pieChart"></div>;
  }
}

export default PieChart;
