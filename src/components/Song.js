import audioFile from '../assets/song/lofi.mp3';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

export const Song = () => {
  const [audioState, setAudioState] = useState({
    isPlaying: false,
    audio: new Audio(audioFile),
  });

  useEffect(() => {
    const { audio } = audioState;

    audio.loop = true;
    audio.controls = false;

    const isPlaying = localStorage.getItem('isPlaying') === 'true';
    if (isPlaying) {
      audio.play();
      setAudioState({ ...audioState, isPlaying: true });
    }

    const updateLocalStorage = () => {
      localStorage.setItem('isPlaying', 'true');
    };
    window.addEventListener('beforeunload', updateLocalStorage);

    const endedListener = () => {
      audio.play();
    };
    audio.addEventListener('ended', endedListener);

    return () => {
      window.removeEventListener('beforeunload', updateLocalStorage);
      audio.removeEventListener('ended', endedListener);
    };
  }, [audioState]);

  const toggleAudioState = () => {
    const { audio, isPlaying } = audioState;

    if (isPlaying) {
      audio.pause();
      setAudioState({ ...audioState, isPlaying: false });
    } else {
      audio.play();
      setAudioState({ ...audioState, isPlaying: true });
    }
  };

  return (
    <button className="play-button" onClick={toggleAudioState}>
        {audioState.isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
    </button>
  );
};
    