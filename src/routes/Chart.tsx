import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

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

function Chart({coinId}:ChartProps){
  const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId],()=>fetchCoinHistory(coinId));
  const isDark = useRecoilValue(isDarkAtom);
  return (<div>
    {isLoading? "Chart Loading..." :(
      <>
    <ApexChart
    type="line"
    series={[
      {
        name:"price",
        data: data?.map((price) => Number(price.close)) as number[]
      },
    ]}
    options={{
      theme: {
        mode: isDark? "light": "dark"
      },
      chart: {
        height: 300,
        width: 500,
        toolbar: {
          show: false
        },
        background: "transparent",
      },
      grid: {
        show: false
      },
      yaxis: {
        show: false
      },
      xaxis: {
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { show: false },
        type: "datetime",
        categories: data?.map((price) => price.time_close)
      },
      stroke: {
        curve: "smooth",
        width: 4,
      },
      fill: {
        type: "gradient", gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
      },
      colors: ["#0fbcf9"],
      tooltip:{
        y:{
          formatter:(value)=>`$ ${value.toFixed(2)}`
        }
      }
    }}
    />
    </>
    )}
  </div>)
}

export default Chart;