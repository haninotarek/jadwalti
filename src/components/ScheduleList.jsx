
import './ScheduleList.css'

export default function ScheduleList({ schedule, active, onSelect }) {
    return (
        <div className="schedule-card">
            <h3 className="schedule-title">
                خطة المذاكرة
            </h3>

            {schedule.length === 0 ? (
                <div className="schedule-empty">
                    <p>لسه مفيش خطة!</p>
                    <p className="schedule-empty-hint">روح Dashboard وأضف موادك</p>
                </div>
            ) : (
                <div className="schedule-list">
                    {schedule.map((item) => (
                        <div
                            key={item.subjectId}
                            className={`schedule-item ${active?.subjectId === item.subjectId ? 'schedule-item-active' : ''}`}
                            onClick={() => onSelect(item)}
                        >
                            <div
                                className="schedule-dot"
                                style={{ background: item.color }}
                            />
                            <div className="schedule-info">
                                <div className="schedule-name">{item.subjectName}</div>
                                <div className="schedule-meta">
                                    {item.hoursPerDay} ساعة/يوم • {item.daysLeft} يوم متبقي
                                </div>
                            </div>
                            {active?.subjectId === item.subjectId && (
                                <span className="schedule-badge">دلوقتي</span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}