import React, { useEffect, useRef, useState } from 'react';

const StreamingCandlestickChart = () => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  const scriptsLoaded = useRef(false);
  const dataTable = useRef(null);
  const currentCandle = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Generate price movement with trend and volatility
  const generatePriceMovement = (lastPrice) => {
    const trend = Math.random() - 0.5; // Random trend between -0.5 and 0.5
    const volatility = 0.002; // 0.2% volatility per tick
    return lastPrice * (1 + (trend * volatility));
  };

  // Initialize a new candle
  const initializeCandle = (prevClose) => {
    return {
      timestamp: new Date(),
      open: prevClose,
      high: prevClose,
      low: prevClose,
      close: prevClose,
      updates: 0
    };
  };

  // Generate initial historical data
  const generateHistoricalData = () => {
    const data = [];
    let currentPrice = 100; // Starting price
    const now = new Date();
    
    // Generate data for the past 50 candles
    for (let i = 50; i >= 0; i--) {
      const timestamp = new Date(now - i * 60000); // One minute candles
      const open = currentPrice;
      currentPrice = generatePriceMovement(currentPrice);
      const close = currentPrice;
      const high = Math.max(open, close) * (1 + Math.random() * 0.001);
      const low = Math.min(open, close) * (1 - Math.random() * 0.001);
      
      data.push([timestamp, open, high, low, close]);
    }
    
    return data;
  };

  useEffect(() => {
    if (scriptsLoaded.current) {
      return;
    }

    const scripts = [
      'https://cdn.anychart.com/releases/8.11.0/js/anychart-core.min.js',
      'https://cdn.anychart.com/releases/8.11.0/js/anychart-stock.min.js',
      'https://cdn.anychart.com/releases/8.11.0/themes/dark_glamour.min.js'
    ];

    let loadedScripts = 0;
    
    const scriptLoadCallback = () => {
      loadedScripts++;
      if (loadedScripts === scripts.length) {
        scriptsLoaded.current = true;
        initializeChart();
      }
    };

    scripts.forEach(src => {
      if (!document.querySelector(`script[src="${src}"]`)) {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = scriptLoadCallback;
        document.body.appendChild(script);
      } else {
        loadedScripts++;
        if (loadedScripts === scripts.length) {
          scriptsLoaded.current = true;
          initializeChart();
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
    };
  }, []);

  const initializeChart = () => {
    if (!window.anychart || !chartContainer.current || chartInstance.current) {
      return;
    }

    window.anychart.onDocumentReady(() => {
      // Create data table
      dataTable.current = window.anychart.data.table();
      const initialData = generateHistoricalData();
      dataTable.current.addData(initialData);

      // Initialize current candle with last close price
      const lastCandle = initialData[initialData.length - 1];
      currentCandle.current = initializeCandle(lastCandle[4]);

      const mapping = dataTable.current.mapAs({
        open: 1,
        high: 2,
        low: 3,
        close: 4
      });

      const chart = window.anychart.stock();
      chartInstance.current = chart;

      window.anychart.theme('darkGlamour');

      const plot = chart.plot(0);
      plot.yGrid(true)
          .xGrid(true)
          .yMinorGrid(true)
          .xMinorGrid(true);

      const series = plot.candlestick(mapping);
      series.name('Live Trading Data');
      series.legendItem().iconType('rising-falling');

      series.fallingFill("#FF0D0D");
      series.fallingStroke("#FF0D0D");
      series.risingFill("#43FF43");
      series.risingStroke("#43FF43");

      // Configure the chart for real-time updates
      chart.title('Live Streaming Chart');
      chart.container('chart-container');
      chart.draw();

      // Auto-scroll to the last point
      const scroller = chart.scroller();
      scroller.autoHide(false);

      setIsInitialized(true);
    });
  };

  // Stream data updates
  useEffect(() => {
    if (!isInitialized || !dataTable.current) return;

    const updateInterval = setInterval(() => {
      if (!currentCandle.current) return;

      // Generate new price
      const newPrice = generatePriceMovement(currentCandle.current.close);
      
      // Update current candle
      currentCandle.current.close = newPrice;
      currentCandle.current.high = Math.max(currentCandle.current.high, newPrice);
      currentCandle.current.low = Math.min(currentCandle.current.low, newPrice);
      currentCandle.current.updates++;

      // Update the chart with the current candle
      dataTable.current.updateRow(
        currentCandle.current.timestamp,
        [
          currentCandle.current.timestamp,
          currentCandle.current.open,
          currentCandle.current.high,
          currentCandle.current.low,
          currentCandle.current.close
        ]
      );

      // Add the updated candle, and create new candle every 60 updates (~ 1 minute)
      if (currentCandle.current.updates >= 60) {
        const newCandle = initializeCandle(currentCandle.current.close);
        currentCandle.current = newCandle;
        dataTable.current.addData([[
          newCandle.timestamp, 
          newCandle.open, 
          newCandle.high, 
          newCandle.low, 
          newCandle.close
        ]]);
      }
    }, 1000); // Update every second

    return () => clearInterval(updateInterval);
  }, [isInitialized]);

  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 w-full h-full">
      <div 
        id="chart-container" 
        ref={chartContainer} 
        className="w-full h-full min-h-[500px]"
      />
    </div>
  );
};

export default StreamingCandlestickChart;
