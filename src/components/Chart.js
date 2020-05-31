import React from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

const Chart = ({ postList }) => {
  am4core.ready(function () {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create('chartdiv', am4charts.XYChart);

    // Add data
    chart.data = postList?.map((post) => {
      return { ID: post.objectID, upVotes: post.points };
    });

    // Create axes
    var ID = chart.xAxes.push(new am4charts.ValueAxis());

    // Create value axis
    var upVotes = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    var lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.valueY = 'upVotes';
    lineSeries.dataFields.valueX = 'ID';
    lineSeries.name = 'Posts';
    lineSeries.strokeWidth = 2;

    // Add simple bullet
    var bullet = lineSeries.bullets.push(new am4charts.CircleBullet());
  });

  return <div className='chart' id='chartdiv'></div>;
};

export default Chart;
