import React from 'react';
import * as d3 from 'd3';

class Scatterplot extends React.Component {
  constructor(props) {
    super(props);
    this.createScatterplot = this.createScatterplot.bind(this);
  }

  componentDidMount() {
    this.createScatterplot();
  }

  createScatterplot() {
    const margin = { top: 10, right: 30, bottom: 50, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const maxX = Math.max(...this.props.data.map(d => d[this.props.xAttr]));
    const maxY = Math.max(...this.props.data.map(d => d[this.props.yAttr]));

    const svg = d3
      .select(this.refs.scatterplot)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const x = d3
      .scaleLinear()
      .domain([0, Math.ceil(maxX / 1000000) * 1000000])
      .range([0, width]);
    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    const y = d3
      .scaleLinear()
      .domain([0, Math.ceil(maxY / 10) * 10])
      .range([height, 0]);
    svg.append('g').call(d3.axisLeft(y));

    svg
      .append('text')
      .attr('text-anchor', 'end')
      .attr('x', width / 2 + margin.left)
      .attr('y', height + margin.top + 30)
      .text('Population');

    svg
      .append('text')
      .attr('text-anchor', 'end')
      .attr('transform', 'rotate(-90)')
      .attr('y', -margin.left + 20)
      .attr('x', -margin.top - height / 2 + 70)
      .text('Number of Doctors');

    svg
      .append('g')
      .selectAll('dot')
      .data(this.props.data)
      .enter()
      .append('circle')
      .attr('cx', d => x(d[this.props.xAttr]))
      .attr('cy', d => y(d[this.props.yAttr]))
      .attr('r', 3)
      .style('fill', '#2bc4ad');
  }

  render() {
    return <div ref="scatterplot"></div>;
  }
}

export default Scatterplot;
