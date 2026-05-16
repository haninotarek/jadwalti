
import { useState, useEffect, useRef } from 'react'
import { useApp } from '../context/AppContext'
import './PomodoroTimer.css'

export default function PomodoroTimer({ subject, onFocus }) {
    const { settings, logSession } = useApp()

    // ----- States -----
    const [timeLeft, setTimeLeft] = useState(settings.pomodoroMinutes * 60)
    const [running, setRunning] = useState(false)
    const [isBreak, setIsBreak] = useState(false)

    const intervalRef = useRef(null)

    // ----- التايمر -----
    useEffect(() => {
        if (running && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((t) => t - 1)
            }, 1000)
        }

        return () => clearInterval(intervalRef.current)
    }, [running, timeLeft])

    // ----- لما التايمر يوصل صفر -----
    useEffect(() => {
        if (timeLeft === 0 && running) {
            setRunning(false)

            // لو كنا بنذاكر (مش راحة)، نسجل الجلسة
            if (!isBreak && subject) {
                logSession(subject.subjectId, settings.pomodoroMinutes)
            }

            // تنبيه
            alert(isBreak ? ' خلصت الراحة، يلا نكمل!' : '🎉 خلصت الجلسة! خد راحة')

            // نحول من مذاكرة لراحة أو العكس
            const nextIsBreak = !isBreak
            setIsBreak(nextIsBreak)
            setTimeLeft(
                nextIsBreak
                    ? settings.breakMinutes * 60
                    : settings.pomodoroMinutes * 60
            )
        }
    }, [timeLeft, running, isBreak, subject, settings, logSession])

    // ----- دوال التحكم -----
    const toggleTimer = () => {
        setRunning((r) => !r)
    }

    const resetTimer = () => {
        clearInterval(intervalRef.current)
        setRunning(false)
        setIsBreak(false)
        setTimeLeft(settings.pomodoroMinutes * 60)
    }

    // تنسيق الأرقام
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60
    const pad = (n) => String(n).padStart(2, '0')

    return (
        <div className="pomodoro-card">
            <div className="pomodoro-label">
                {isBreak
                    ? '☕ وقت الراحة'
                    : subject
                        ? ` ${subject.subjectName}`
                        : 'اختار مادة من الجدول'}
            </div>

            <div className="pomodoro-timer">
                {pad(minutes)}:{pad(seconds)}
            </div>

            <div className="pomodoro-status">
                {running ? ' شغّال دلوقتي' : '⏸ متوقف'}
            </div>

            <div className="pomodoro-controls">
                <button
                    className={`timer-btn ${running ? 'timer-btn-active' : 'timer-btn-primary'}`}
                    onClick={toggleTimer}
                    disabled={!subject && !isBreak}
                >
                    {running ? '⏸ وقف' : '▶ شغّل'}
                </button>

                <button className="timer-btn" onClick={resetTimer}>
                    ↺ من الأول
                </button>

                <button
                    className="timer-btn timer-btn-focus"
                    onClick={onFocus}
                    disabled={!subject}
                >
                    🌑 Focus
                </button>
            </div>
        </div>
    )
}