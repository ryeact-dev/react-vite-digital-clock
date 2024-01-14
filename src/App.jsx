import { useState, useEffect } from 'react';

const HOURS = Array(24)
  .fill(0)
  .map((hour, index) => {
    return <p key={index}>{`${index < 10 ? `0${index}` : index}`}</p>;
  });

const MINUTES = Array(60)
  .fill(0)
  .map((hour, index) => {
    return <p key={index}>{`${index < 10 ? `0${index}` : index}`}</p>;
  });

const SECONDS = Array(60)
  .fill(0)
  .map((hour, index) => {
    return <p key={index}>{`${index < 10 ? `0${index}` : index}`}</p>;
  });

const time = new Date();

function App() {
  const [prevTime, setPrevTime] = useState({
    prevHours: time.getHours() * 80,
    prevMinutes: time.getMinutes() * 80,
    prevSeconds: time.getSeconds() * 80,
  });

  const [classAnimate, setClassAnimate] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const time = new Date();
      const hours = time.getHours() * 80;
      const minutes = time.getMinutes() * 80;
      const seconds = time.getSeconds() * 80;

      if (prevTime.prevSeconds !== seconds) {
        setPrevTime({ ...prevTime, prevSeconds: seconds });
        setClassAnimate('animate');
        setTimeout(() => setClassAnimate(''), 800);
      }

      if (prevTime.prevMinutes !== minutes) {
        setPrevTime({ ...prevTime, prevMinutes: minutes });
        setClassAnimate('animate');
        setTimeout(() => setClassAnimate(''), 800);
      }

      if (prevTime.prevHours !== hours) {
        setPrevTime({ ...prevTime, prevHours: hours });
        setClassAnimate('animate');
        setTimeout(() => setClassAnimate(''), 800);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [prevTime]);

  let options = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  let formattedDate = new Intl.DateTimeFormat('en-US', options).format(time);

  return (
    <main className='container'>
      <h1>{formattedDate}</h1>
      <section className='clock'>
        <div className={`hours `}>
          <div
            style={{ marginTop: `-${prevTime.prevHours}px` }}
            className={classAnimate}
          >
            {HOURS}
          </div>
        </div>
        <div className='colon'>:</div>
        <div className={`minutes `}>
          <div
            style={{ marginTop: `-${prevTime.prevMinutes}px` }}
            className={classAnimate}
          >
            {MINUTES}
          </div>
        </div>
        <div className='colon'>:</div>
        <div className={`seconds`}>
          <div
            style={{ marginTop: `-${prevTime.prevSeconds}px` }}
            className={classAnimate}
          >
            {SECONDS}
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
