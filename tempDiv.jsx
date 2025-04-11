import { useState, useRef } from 'react';

function DegreeShowing() {
  const timeTemperatureData = [
    { time: "23:30", temp: 52 },
    { time: "00:00", temp: 53 },
    { time: "00:30", temp: 54 },
    { time: "01:00", temp: 55 },
    { time: "01:30", temp: 53 },
    { time: "02:00", temp: 51 },
    { time: "02:30", temp: 50 }
  ];

  const [currentIndex, setCurrentIndex] = useState(2);
  const touchStartY = useRef(null);
  const scrollTimeout = useRef(null);

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (touchStartY.current === null) return;
    const touchY = e.touches[0].clientY;
    const diff = touchStartY.current - touchY;

    if (Math.abs(diff) > 20) {
      if (diff > 0 && currentIndex < timeTemperatureData.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else if (diff < 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
      touchStartY.current = null;

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        touchStartY.current = null;
      }, 300);
    }
  };

  const handleTouchEnd = () => {
    touchStartY.current = null;
  };

  const currentItem = timeTemperatureData[currentIndex];
  const prevItem = currentIndex > 0 ? timeTemperatureData[currentIndex - 1] : null;
  const nextItem = currentIndex < timeTemperatureData.length - 1 ? timeTemperatureData[currentIndex + 1] : null;

  const handleWheel = (e) => {
    if (e.deltaY > 0 && currentIndex < timeTemperatureData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (e.deltaY < 0 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div
      className="from-blue-500 to-indigo-600 rounded-2xl shadow-lg p-4 w-full h-full max-w-md mx-auto select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      {/* Time display */}
      <div className="mb-4">
        <h2 className="text-center text-white font-bold text-xl">{currentItem.time}</h2>
        <div className="border-t border-white border-opacity-30 mt-2"></div>
      </div>

      {/* Temperature scroll area */}
      <div className="relative h-[60%] overflow-hidden">
        {prevItem && (
          <div className="absolute w-full top-2 opacity-30 transition-all duration-300">
            <div className="flex justify-center items-baseline">
              <span className="text-white text-3xl font-bold">{prevItem.temp}</span>
              <span className="text-white text-xl font-bold">°</span>
            </div>
          </div>
        )}

        <div className="absolute w-full top-1/2 transform -translate-y-1/2 transition-all duration-300">
          <div className="flex justify-center items-baseline">
            <span className="text-white text-6xl font-bold">{currentItem.temp}</span>
            <span className="text-white text-3xl font-bold">°</span>
          </div>
        </div>

        {nextItem && (
          <div className="absolute w-full bottom-2 opacity-30 transition-all duration-300">
            <div className="flex justify-center items-baseline">
              <span className="text-white text-3xl font-bold">{nextItem.temp}</span>
              <span className="text-white text-xl font-bold">°</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DegreeShowing;
