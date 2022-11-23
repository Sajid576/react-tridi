import React, { useState, useRef } from 'react';

import Tridi from 'react-tridi';
import 'react-tridi/dist/index.css';

const App = () => {
  const [isAutoPlayRunning, setIsAutoPlayRunning] = useState(false);
  const [pins, setPins] = useState([]);
  const tridiRef = useRef(null);

  const frameChangeHandler = (currentFrameIndex) => {
    console.log('current frame index', currentFrameIndex);
  };

  const recordStartHandler = (recordingSessionId) =>
    console.log('on record start', { recordingSessionId, pins });

  const recordStopHandler = (recordingSessionId) =>
    console.log('on record stop', { recordingSessionId, pins });

  const pinClickHandler = (pin) => {
    console.log('on pin click', pin);
    tridiRef.current.toggleRecording(true, pin.recordingSessionId);
  };

  const onLoadChange = (loaded, percentage) => {
    console.log('have all Image loaded? : ' + loaded);
    console.log('current load percentage : ' + percentage + '%');
  };

  return (
    <div style={{ width: '500px' }}>
      <Tridi
        ref={tridiRef}
        images={[
          'https://raw.githubusercontent.com/Sajid576/react-tridi/master/public/images/1.jpg',
          'https://raw.githubusercontent.com/Sajid576/react-tridi/master/public/images/10.jpg',
          'https://raw.githubusercontent.com/Sajid576/react-tridi/master/public/images/2.jpg',
          'https://raw.githubusercontent.com/Sajid576/react-tridi/master/public/images/3.jpg',
        ]}
        //location="./images"
        format='jpg'
        count='36'
        onFrameChange={frameChangeHandler}
        autoplaySpeed={70}
        onAutoplayStart={() => setIsAutoPlayRunning(true)}
        onAutoplayStop={() => setIsAutoPlayRunning(false)}
        onRecordStart={recordStartHandler}
        onRecordStop={recordStopHandler}
        onPinClick={pinClickHandler}
        inverse
        showControlBar
        showStatusBar
        mousewheel
        pins={pins}
        setPins={setPins}
        hintOnStartup
        hintText='Drag to view'
        onLoadChange={onLoadChange}
      />

      <button onClick={() => tridiRef.current.prev()}>Prev</button>
      <button onClick={() => tridiRef.current.next()}>Next</button>
      <button
        onClick={() => tridiRef.current.toggleAutoplay(!isAutoPlayRunning)}
      >
        {isAutoPlayRunning ? 'Pause' : 'Autoplay'}
      </button>
    </div>
  );
};

export default App;
