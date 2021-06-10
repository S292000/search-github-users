import React from 'react';

import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';

import Chart from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.candy';

ReactFC.fcRoot(FusionCharts,Chart,FusionTheme);

const ChartComponent = ({data}) => {
  const chartConfigs = {
    type: 'doughnut2d',
    width: '100%',
    height: '400',
    dataFormat: 'json',
    dataSource: {
      chart: {
        caption: 'Stars per language',
        decimals: 0,
        doughnutRadius: "45%",
        showPercentValues: 0,
        theme: 'candy',
      },
      data: data,//this could also be written as data: data => data, using ES6 shorthand.
    }
  }
  return <ReactFC {...chartConfigs}/>
}

const Doughnut2D = ({data}) => {
  return <ChartComponent data={data}/>
};

export default Doughnut2D;
