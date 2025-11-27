import styles from './progressBar.module.css';
import { ChangeEvent } from 'react';

type progressBarProp = {
   max: number;
   value: number;
   step: number;
   onChange: (e: ChangeEvent<HTMLInputElement>) => void;
   readOnly: boolean;
};

export default function ProgressBar({
   max,
   value,
   step,
   onChange,
   readOnly,
}: progressBarProp) {
   return (
      <input
         className={styles.styledProgressInput} // Применение стилей к ползунку
         type="range" // Тип элемента - ползунок
         min="0" // Минимальное значение ползунка
         max={max} // Максимальное значение, зависит от длительности аудио
         value={value} // Текущее значение ползунка
         step={step} // Шаг изменения значения
         onChange={onChange} // Обработчик события изменения
         readOnly={readOnly}
      />
   );
}





















// import React, { useState, useRef, useEffect } from 'react';

// const AudioPlayer = () => {
//    const audioRef = useRef(null);
//    // Начальная громкость установлена на 50%
//    const [volume, setVolume] = useState(0.5); 

//    useEffect(() => {
//       if (audioRef.current) {
//          audioRef.current.volume = volume;
//       }
//    }, [volume]);

//    return (
//       <div>
//          <audio ref={audioRef} src="your-audio-file.mp3" controls></audio>
//          <input
//             type="range"
//             min="0"
//             max="1"
//             step="0.01"
//             value={volume}
//             onChange={(e) => setVolume(e.target.value)}
//          />
//       </div>
//    );
// };

// export default AudioPlayer;