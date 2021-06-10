import React from 'react';

import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';

import Chart from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts,Chart,FusionTheme);

const ChartComponent = ({data}) => {
  const chartConfigs = {
    type: 'column3d',
    width: '100%',
    height: '400',
    dataFormat: 'json',
    dataSource: {
      chart: {
        caption: 'Most Popular',
        yAxisName: 'Stars',
        xAxisName: 'Repos',
        xAxisNameFontSize: '16px',
        yAxisNameFontSize: '16px',
      },
      data: data,//this could also be written as data: data => data, using ES6 shorthand.
    }
  }
  return <ReactFC {...chartConfigs}/>
}

const Column3D = ({data}) => {
  return <ChartComponent data={data}/>
};

export default Column3D;
