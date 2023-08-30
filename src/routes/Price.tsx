import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
  coinId:string;
}
interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}
function Price({coinId}:ChartProps){
  const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId],()=>fetchCoinHistory(coinId));
  const exceptData = data ?? [];
  let chartData = null;
  if (Array.isArray(data)) {
    chartData = exceptData?.map((i) => {
      return {
        x: i.time_close,
        y: [i.open, i.high, i.low, i.close],
      };
    });
  }
 
  return( <div>{isLoading? "Price Loading...": chartData?
  (<>
  <ApexChart 
  type="candlestick"
  series={[{ data: chartData }]}
  options={{
    theme: {
      mode: "dark"
    },
    chart: {
      type: 'candlestick',
      height: 350,
      background: "transparent",
      toolbar:{
        show:false
      }
    },
    tooltip: {
      y: {
        formatter: (value) =>
          `${Number(value)}`,
      },
    },
    grid: {
      show: false
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { show: false },
      type: 'datetime',
    },
    
    yaxis: {
      show:false,
      tooltip: {
        enabled: true
      }
    },
    
  }}></ApexChart>
  </>
  ):"Not found"}</div>)
}

export default Price;