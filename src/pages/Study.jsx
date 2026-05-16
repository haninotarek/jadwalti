
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import PomodoroTimer from '../components/PomodoroTimer'
import ScheduleList from '../components/ScheduleList'
import FocusMode from '../components/FocusMode'
import './Study.css'

export default function Study() {
    const { schedule } = useApp()
    const navigate = useNavigate()

    const [activeSubject, setActiveSubject] = useState(schedule[0] || null)
    const [focusActive, setFocusActive] = useState(false)

    return (
        <div className="study">
            {/* Focus Mode - يظهر فوق كل حاجة */}
            {focusActive && (
                <FocusMode
                    subject={activeSubject}
                    onExit={() => setFocusActive(false)}
                />
            )}

            {/* HEADER */}
            <header className="study-header">
                <div className="logo" onClick={() => navigate('/')}>
                    <div className="logo-dot"></div>
                    جدولتي
                </div>
                <button
                    className="back-btn"
                    onClick={() => navigate('/dashboard')}
                >
                    ← رجوع لموادي
                </button>
            </header>

            {/* CONTENT */}
            <div className="study-container">
                <div className="study-grid">
                    <div>
                        <PomodoroTimer
                            subject={activeSubject}
                            onFocus={() => setFocusActive(true)}
                        />
                    </div>

                    <div>
                        <ScheduleList
                            schedule={schedule}
                            active={activeSubject}
                            onSelect={setActiveSubject}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}