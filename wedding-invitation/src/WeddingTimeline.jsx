import "./WeddingTimeline.css";

const TIMELINE_EVENTS = [
  {
    time: "8:30 AM",
    title: "Entourage line up at the church",
    accent: "#d4b86a",
  },
  {
    time: "9:00 AM",
    title: "Wedding Ceremony",
    accent: "#b8c9bc",
  },
  {
    time: "10:00 AM",
    title: "Church Photo Session / Post Nuptial",
    accent: "#b8c9bc",
  },
  {
    time: "11:00 AM",
    title: "Reception's Activities",
    accent: "#e8c4a8",
  },
];

export default function WeddingTimeline() {
  return (
    <section id="timeline" className="section-block timeline-section">
      <div className="max-w-lg mx-auto timeline-wrap">
        <h2 className="timeline-title">The Wedding Timeline</h2>

        <ol className="timeline-list">
          {TIMELINE_EVENTS.map((event) => (
            <li key={event.time} className="timeline-item">
              <span
                className="timeline-dot"
                style={{ backgroundColor: event.accent, borderColor: event.accent }}
                aria-hidden
              />
              <article
                className="timeline-card"
                style={{ borderColor: event.accent }}
              >
                <p className="timeline-time">{event.time}</p>
                <p className="timeline-event">{event.title}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
