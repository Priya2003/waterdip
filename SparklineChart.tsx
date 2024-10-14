import React from 'react';
import ApexCharts from 'apexcharts';

const SparklineChart: React.FC<{ data: any[], visitorType: string }> = ({ data, visitorType }) => {
  const visitorData = data.map(item => item[visitorType]);

  const options = {
    chart: { type: 'line', height: 100, sparkline: { enabled: true } },
    series: [{ data: visitorData }],
    stroke: { curve: 'smooth' }
  };

  React.useEffect(() => {
    const chart = new ApexCharts(document.querySelector(`#sparkline-${visitorType}`), options);
    chart.render();

    return () => chart.destroy();
  }, [data]);

  return <div id={`sparkline-${visitorType}`}></div>;
};

export default SparklineChart;
