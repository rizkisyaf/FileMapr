import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { FileStructure } from '../types';

interface TreeMapProps {
  data: FileStructure;
}

// Extend the d3 HierarchyNode to include x0, x1, y0, y1 (rectangular coordinates added by treemap layout)
interface HierarchyRectNode extends d3.HierarchyRectangularNode<FileStructure> {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
}

const TreeMap: React.FC<TreeMapProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        const { width } = svgRef.current.getBoundingClientRect();
        setDimensions({ width, height: width * 0.75 });
      }
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!data || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const { width, height } = dimensions;

    const root = d3.hierarchy<FileStructure>(data)
      .sum(d => d.size || 0)
      .sort((a, b) => (b.value || 0) - (a.value || 0));

    const treemap = d3.treemap<FileStructure>()
      .size([width, height])
      .padding(1)
      .round(true);

    treemap(root);

    const cell = svg.selectAll('g')
      .data(root.leaves() as HierarchyRectNode[]) // Cast to HierarchyRectNode to access x0, y0, etc.
      .enter().append('g')
      .attr('transform', d => `translate(${d.x0},${d.y0})`);

    cell.append('rect')
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .attr('fill', d => d3.interpolateBlues((d.value || 0) / root.value!));

    cell.append('text')
      .selectAll('tspan')
      .data(d => d.data.name.split(/(?=[A-Z][^A-Z])/g))
      .enter().append('tspan')
      .attr('x', 3)
      .attr('y', (_d, i) => 13 + i * 10)
      .attr('font-size', '10px')
      .text(d => d);

    cell.append('title')
      .text(d => `${d.data.name}\nSize: ${d.value} bytes`);

  }, [data, dimensions]);

  return <svg ref={svgRef} width="100%" height={dimensions.height}></svg>;
};

export default TreeMap;
