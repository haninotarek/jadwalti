
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import ProgressBar from '../components/ProgressBar'
import './Report.css'

export default function Report() {
    const { subjects, studyLog } = useApp()
    const navigate = useNavigate()


    const getSubjectTotal = (subjectId) => {
        return studyLog
            .filter((log) => log.subjectId === subjectId)
            .reduce((sum, log) => sum + log.minutes, 0)
    }

    // إجمالي دقائق النهارده
    const todayLogs = studyLog.filter((log) => {
        const logDate = new Date(log.date).toDateString()
        const today = new Date().toDateString()
        return logDate === today
    })

    const todayTotal = todayLogs.reduce((sum, log) => sum + log.minutes, 0)
    const todaySessions = todayLogs.length

    // إجمالي دقائق هذا الأسبوع
    const weekLogs = studyLog.filter((log) => {
        const logDate = new Date(log.date)
        const today = new Date()
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
        return logDate >= weekAgo
    })

    const weekTotal = weekLogs.reduce((sum, log) => sum + log.minutes, 0)

    // أكثر مادة تم مذاكرتها
    const mostStudied = subjects.length > 0
        ? subjects.reduce((max, s) =>
            getSubjectTotal(s.id) > getSubjectTotal(max.id) ? s : max
            , subjects[0])
        : null

    // تنسيق الوقت
    const formatTime = (minutes) => {
        if (minutes < 60) return `${minutes}د`
        const h = Math.floor(minutes / 60)
        const m = minutes % 60
        if (m === 0) return `${h}س`
        return `${h}س ${m}د`
    }

    // إيجاد اسم المادة من الـ ID
    const getSubjectName = (id) => {
        const subject = subjects.find((s) => s.id === id)
        return subject ? subject.name : 'مادة محذوفة'
    }

    return (
        <div className="report">
            { }
            <header className="report-header">
                <div className="logo" onClick={() => navigate('/')}>
                    <div className="logo-dot"></div>
                    جدولتي
                </div>
                <div className="report-nav">
                    <button
                        className="nav-btn"
                        onClick={() => navigate('/dashboard')}
                    >
                        المواد
                    </button>
                    <button
                        className="nav-btn"
                        onClick={() => navigate('/study')}
                    >
                        ⏱ المذاكرة
                    </button>
                </div>
            </header>

            { }
            <div className="report-container">
                <div className="report-title">
                    <h1> تقريرك</h1>
                    <p>إنجازك في المذاكرة بالتفصيل</p>
                </div>

                { }
                <div className="stats-grid">
                    <div className="stat-card stat-primary">
                        <div className="stat-icon">⏱</div>
                        <div className="stat-value">{formatTime(todayTotal)}</div>
                        <div className="stat-label">ذاكرت النهارده</div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">🎯</div>
                        <div className="stat-value">{todaySessions}</div>
                        <div className="stat-label">جلسة بومودورو</div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">📅</div>
                        <div className="stat-value">{formatTime(weekTotal)}</div>
                        <div className="stat-label">آخر 7 أيام</div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">🏆</div>
                        <div className="stat-value-sm">
                            {mostStudied?.name || '—'}
                        </div>
                        <div className="stat-label">أكتر مادة ذاكرتها</div>
                    </div>
                </div>

                { }
                <div className="report-card">
                    <h3 className="card-title">تقدمك في كل مادة</h3>

                    {subjects.length === 0 ? (
                        <p className="empty-msg">لسه مفيش مواد. روح ضيف مواد الأول!</p>
                    ) : (
                        <>
                            {subjects.map((subject) => {
                                const minutes = getSubjectTotal(subject.id)
                                // الهدف الافتراضي: 10 ساعات لكل مادة
                                const targetMinutes = 10 * 60
                                const percent = Math.round((minutes / targetMinutes) * 100)

                                return (
                                    <ProgressBar
                                        key={subject.id}
                                        label={subject.name}
                                        color={subject.color}
                                        percent={percent}
                                        value={formatTime(minutes)}
                                        sublabel={`${percent}%`}
                                    />
                                )
                            })}
                        </>
                    )}
                </div>

                { }
                <div className="report-card">
                    <h3 className="card-title">آخر الجلسات</h3>

                    {studyLog.length === 0 ? (
                        <p className="empty-msg">لسه مفيش جلسات.يلا بينا نبدأ اول جلسة سوا !</p>
                    ) : (
                        <div className="sessions-list">
                            {[...studyLog].reverse().slice(0, 10).map((log) => {
                                const date = new Date(log.date)
                                const dateStr = date.toLocaleDateString('ar-EG', {
                                    weekday: 'short',
                                    day: 'numeric',
                                    month: 'short',
                                })
                                const timeStr = date.toLocaleTimeString('ar-EG', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })

                                return (
                                    <div key={log.id} className="session-item">
                                        <div className="session-info">
                                            <div className="session-subject">
                                                📖 {getSubjectName(log.subjectId)}
                                            </div>
                                            <div className="session-meta">
                                                {dateStr} • {timeStr}
                                            </div>
                                        </div>
                                        <div className="session-duration">
                                            {formatTime(log.minutes)}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}