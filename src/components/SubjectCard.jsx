
import './SubjectCard.css'

export default function SubjectCard({ subject, onRemove }) {
    // حساب الأيام المتبقية للامتحان
    const today = new Date()
    const exam = new Date(subject.examDate)
    const daysLeft = Math.max(
        0,
        Math.ceil((exam - today) / (1000 * 60 * 60 * 24))
    )

    // تحديد لون التحذير حسب قرب الامتحان
    const getUrgencyColor = () => {
        if (daysLeft === 0) return '#f04d8c'
        if (daysLeft <= 3) return '#f0a04d'
        if (daysLeft <= 7) return '#c8f04d'
        return '#6b6b80'
    }

    return (
        <div className="subject-card">
            { }
            <div
                className="subject-color-dot"
                style={{ background: subject.color }}
            />

            { }
            <div className="subject-info">
                <div className="subject-name">{subject.name}</div>
                <div
                    className="subject-days"
                    style={{ color: getUrgencyColor() }}
                >
                    {daysLeft === 0
                        ? '🔴 امتحان النهارده!'
                        : `${daysLeft} يوم متبقي`}
                </div>
            </div>

            { }

            <button
                className="subject-remove"
                onClick={() => onRemove(subject.id)}
                title="حذف المادة"
            >
                ×
            </button>
        </div>
    )
}