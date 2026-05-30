import "./WeddingTimeline.css";

const TIMELINE_EVENTS = [
  { time: "7:30 AM", title: "Entourage line up at the church" },
  { time: "8:00 AM", title: "Wedding Ceremony" },
  { time: "9:00 AM", title: "Church Photo Session / Post Nuptial" },
  { time: "10:00 AM", title: "Reception's Activities" },
];

export default function WeddingTimeline() {
  return (
    <section id="timeline" className="section-block timeline-section">
      <div className="max-w-lg mx-auto timeline-wrap">
        <h2 className="section-title text-[#7b001c]">The Wedding Timeline</h2>
        <div className="section-divider" aria-hidden />
        <p className="section-subtitle timeline-subtitle">Our special day</p>

        <ol className="timeline-list">
          {TIMELINE_EVENTS.map((event, index) => (
            <li key={event.time} className="timeline-item" data-step={index + 1}>
              <span className="timeline-dot" aria-hidden />
              <article className="timeline-card">
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
