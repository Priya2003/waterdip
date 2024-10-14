import React from 'react';
import ApexCharts from 'apexcharts';

const ColumnChart: React.FC<{ data: any[] }> = ({ data }) => {
  const visitorsByCountry = data.reduce((acc, item) => {
    acc[item.country] = (acc[item.country] || 0) + (item.adults + item.children + item.babies);
    return acc;
  }, {});

  const seriesData = Object.keys(visitorsByCountry).map(country => ({
    x: country,
    y: visitorsByCountry[country]
  }));

  const options = {
    chart: { type: 'bar', height: 350 },
    series: [{ name: 'Visitors', data: seriesData }],
    xaxis: { categories: Object.keys(visitorsByCountry) }
  };

  React.useEffect(() => {
    const chart = new ApexCharts(document.querySelector('#column-chart'), options);
    chart.render();

    return () => chart.destroy();
  }, [data]);

  return <div id="column-chart"></div>;
};

export default ColumnChart;
