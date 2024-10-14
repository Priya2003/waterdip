import React from 'react';
import ApexCharts from 'apexcharts';

const TimeSeriesChart: React.FC<{ data: any[] }> = ({ data }) => {
  const seriesData = data.map(item => ({
    x: `${item.arrival_date_year}-${item.arrival_date_month}-${item.arrival_date_day_of_month}`,
    y: item.adults + item.children + item.babies
  }));

  const options = {
    chart: { type: 'line', height: 350 },
    series: [{ name: 'Visitors', data: seriesData }],
    xaxis: { type: 'datetime' }
  };

  React.useEffect(() => {
    const chart = new ApexCharts(document.querySelector('#timeseries-chart'), options);
    chart.render();

    return () => chart.destroy();
  }, [data]);

  return <div id="timeseries-chart"></div>;
};

export default TimeSeriesChart;
