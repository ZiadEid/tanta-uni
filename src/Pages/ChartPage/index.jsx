import { useEffect } from 'react'
import { useStore } from '../../Store'
import ChartLine from '../../Components/ChartsType/ChartLine';
import ChartBar from '../../Components/ChartsType/ChartBar';
import ChartArea from '../../Components/ChartsType/ChartArea';
import ChartPie from '../../Components/ChartsType/ChartPie';
import ChartRadar from './../../Components/ChartsType/ChartRadar';
import ChartRadialBar from '../../Components/ChartsType/ChartRadialBar';
import ChartScatter from '../../Components/ChartsType/ChartScatter';
import ChartComposed from '../../Components/ChartsType/ChartComposed';


const ChartPage = () => {
  // Global State
  const { chartActive } = useStore();

  useEffect(() => {
    chartActive();
  }, [])
  return (
    <div className="grow relative px-6 mt-2">
      <div className='bg-[#171e2e26] dark:bg-gray-800 backdrop-blur shadow-lg rounded-lg flex flex-wrap'>
        <div className='w-1/2 '>
          <ChartLine />
        </div>
        <div className='w-1/2 '>
          <ChartBar />
        </div>
        <div className='w-1/2 '>
          <ChartArea />
        </div>
        <div className='w-1/2 '>
          <ChartPie />
        </div>
        <div className='w-1/2 '>
          <ChartRadar />
        </div>
        <div className='w-1/2 '>
          <ChartRadialBar />
        </div>
        <div className='w-1/2 '>
          <ChartScatter />
        </div>
        <div className='w-1/2 '>
          <ChartComposed />
        </div>
      </div>
    </div>
  );
}

export default ChartPage