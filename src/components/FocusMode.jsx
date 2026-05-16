
import { useState, useEffect, useRef } from 'react'
import { useApp } from '../context/AppContext'
import './FocusMode.css'

export default function FocusMode({ subject, onExit }) {
    const { settings, logSession } = useApp()

    const [minutes, setMinutes] = useState(settings.pomodoroMinutes)
    const [seconds, setSeconds] = useState(0)
    const [running, setRunning] = useState(true)

    const intervalRef = useRef(null)

    //timer 
    useEffect(() => {
        if (running) {
            intervalRef.current = setInterval(() => {
                setSeconds((s) => {
                    if (s === 0) {
                        setMinutes((m) => {
                            if (m === 0) {
                                clearInterval(intervalRef.current)
                                setRunning(false)

                                // تسجيل الجلسة
                                if (subject) {
                                    logSession(subject.subjectId, settings.pomodoroMinutes)
                                }

                                // تنبيه نهاية الجلسة
                                setTimeout(() => {
                                    alert(' خلصت جلسة المذاكرة! خد راحة')
                                    onExit()
                                }, 200)

                                return 0
                            }
                            return m - 1
                        })
                        return 59
                    }
                    return s - 1
                })
            }, 1000)
        }

        return () => clearInterval(intervalRef.current)
    }, [running])

    // ----- منع الـ scroll في الصفحة لما يكون Focus Mode شغّال -----
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])

    const pad = (n) => String(n).padStart(2, '0')

    // هنا بنحسب نسبه التقدم 
    const totalSeconds = settings.pomodoroMinutes * 60
    const currentSeconds = minutes * 60 + seconds
    const progress = ((totalSeconds - currentSeconds) / totalSeconds) * 100

    return (
        <div className="focus-overlay">
            { }
            <div className="focus-bg-glow"></div>

            { }
            <div className="focus-content">
                { }
                <div className="focus-subject">
                    {subject?.subjectName || 'وقت التركيز'}
                </div>

                { }
                <div className="focus-timer">
                    {pad(minutes)}:{pad(seconds)}
                </div>

                {/* شريط التقدم */}
                <div className="focus-progress">
                    <div
                        className="focus-progress-fill"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                { }
                <div className="focus-message">
                    {running
                        ? '✦ أنت في وضع التركيز الكامل'
                        : '⏸ التايمر متوقف'}
                </div>

                { }
                <div className="focus-controls">
                    <button
                        className="focus-btn focus-btn-toggle"
                        onClick={() => setRunning((r) => !r)}
                    >
                        {running ? '⏸ وقف' : '▶ كمّل'}
                    </button>

                    <button
                        className="focus-btn focus-btn-exit"
                        onClick={onExit}
                    >
                        خروج من Focus
                    </button>
                </div>
            </div>
        </div>
    )
}