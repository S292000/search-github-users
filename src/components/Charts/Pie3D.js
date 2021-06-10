import React from 'react';

import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';

import Chart from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts,Chart,FusionTheme);

const ChartComponent = ({data}) => {
  const chartConfigs = {
    type: 'pie3d',
    width: '400',
    height: '400',
    dataFormat: 'json',
    dataSource: {
      chart: {
        caption: 'Languages',
        theme: 'fusion',
        decimals: 0,
        pieRadius: "35%",
      },
      data: data,//this could also be written as data: data => data, using ES6 shorthand.
    }
  }
  return <ReactFC {...chartConfigs}/>
}

const Pie3D = ({data}) => {
  return <ChartComponent data={data}/>
};

export default Pie3D;
