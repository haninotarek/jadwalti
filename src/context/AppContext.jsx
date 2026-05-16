// AppContext.jsx - الذاكرة المركزية للمشروع

import { createContext, useContext, useState, useEffect } from 'react'
import { saveToStorage, loadFromStorage } from '../utils/storage'

// 1. إنشاء الـ Context (الصندوق اللي هيحمل البيانات)
const AppContext = createContext()

// 2. الـ Provider اللي هيلف الموقع كله ويوفر البيانات
export function AppProvider({ children }) {

    // ----- States: البيانات اللي هنشاركها -----

    // المواد اللي اليوزر ضافها
    const [subjects, setSubjects] = useState(
        loadFromStorage('subjects') || []
    )

    // الجدول اللي اتولد من الـ generator
    const [schedule, setSchedule] = useState(
        loadFromStorage('schedule') || []
    )

    // سجل الجلسات (كل مرة اليوزر ذاكر)
    const [studyLog, setStudyLog] = useState(
        loadFromStorage('studyLog') || []
    )

    const [settings, setSettings] = useState(
        loadFromStorage('settings') || {
            pomodoroMinutes: 25,
            breakMinutes: 5,
            dailyHours: 3,
        }
    )

    // ----- useEffect: كل ما يتغير state، يتحفظ في localStorage -----
    useEffect(() => { saveToStorage('subjects', subjects) }, [subjects])
    useEffect(() => { saveToStorage('schedule', schedule) }, [schedule])
    useEffect(() => { saveToStorage('studyLog', studyLog) }, [studyLog])
    useEffect(() => { saveToStorage('settings', settings) }, [settings])

    // ----- Functions: العمليات اللي أي صفحة تقدر تستخدمها -----

    // إضافة مادة جديدة
    const addSubject = (subject) => {
        setSubjects(prev => [...prev, {
            id: Date.now(),        // ID فريد لكل مادة
            ...subject,            // بيانات المادة (الاسم، التاريخ)
            color: getRandomColor() // لون عشوائي
        }])
    }

    // مسح مادة
    const removeSubject = (id) => {
        setSubjects(prev => prev.filter(s => s.id !== id))
    }

    // تسجيل جلسة مذاكرة
    const logSession = (subjectId, minutes) => {
        setStudyLog(prev => [...prev, {
            id: Date.now(),
            subjectId,
            minutes,
            date: new Date().toISOString()
        }])
    }

    // ----- نشارك كل ده مع باقي الموقع -----
    return (
        <AppContext.Provider value={{
            subjects, addSubject, removeSubject,
            schedule, setSchedule,
            studyLog, logSession,
            settings, setSettings
        }}>
            {children}
        </AppContext.Provider>
    )
}

// 3. Hook بسيط عشان أي صفحة تستخدم الـ Context بسهولة
export const useApp = () => useContext(AppContext)

// ----- Helper: لون عشوائي للمادة -----
function getRandomColor() {
    const colors = ['#c8f04d', '#7c6af7', '#f04d8c', '#4df0a0', '#4d9ef0', '#f0a04d']
    return colors[Math.floor(Math.random() * colors.length)]
}