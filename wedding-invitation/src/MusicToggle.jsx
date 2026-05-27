import "./MusicToggle.css";

export default function MusicToggle({ isPlaying, isMuted, onToggle }) {
  const label = isMuted
    ? "Unmute wedding music"
    : isPlaying
      ? "Mute wedding music"
      : "Play wedding music";

  return (
    <button
      type="button"
      className={`music-toggle${isPlaying && !isMuted ? " is-playing" : ""}`}
      onClick={onToggle}
      aria-label={label}
      title={label}
    >
      <span className="music-toggle-icon" aria-hidden>
        {isMuted ? "🔇" : isPlaying ? "🎵" : "🎶"}
      </span>
      <span className="music-toggle-label">
        {isMuted ? "Music off" : isPlaying ? "Palagi" : "Play music"}
      </span>
    </button>
  );
}
