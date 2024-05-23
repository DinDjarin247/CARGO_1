import React, { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime({
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
      });
    };

    updateTime(); // 초기 설정
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 interval 해제
  }, []);

  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
      <link
        href="https://cdn.jsdelivr.net/npm/daisyui@4.11.1/dist/full.min.css"
        rel="stylesheet"
        type="text/css"
      />
      <script src="https://cdn.tailwindcss.com"></script>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": time.hours }}></span>
        </span>
        hours
      </div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": time.minutes }}></span>
        </span>
        min
      </div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": time.seconds }}></span>
        </span>
        sec
      </div>
    </div>
  );
};

export default Clock;
