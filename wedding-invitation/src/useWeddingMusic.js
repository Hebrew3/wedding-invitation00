import { useRef, useCallback, useState, useEffect } from "react";
import weddingSong from "../music/Palagi - Tj Monterde  Violin Cover by BOJO.mp3";

const DEFAULT_VOLUME = 0.42;

export function useWeddingMusic() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = new Audio(weddingSong);
    audio.loop = true;
    audio.volume = DEFAULT_VOLUME;
    audio.preload = "auto";
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.pause();
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audioRef.current = null;
    };
  }, []);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio
      .play()
      .catch(() => {
        /* Autoplay blocked — user can tap the music control */
      });
  }, []);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !audio.muted;
    setIsMuted(audio.muted);

    if (!audio.muted && audio.paused) {
      audio.play().catch(() => {});
    }
  }, []);

  const mute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || audio.muted) return;
    audio.muted = true;
    setIsMuted(true);
  }, []);

  return { play, toggleMute, mute, isPlaying, isMuted };
}
