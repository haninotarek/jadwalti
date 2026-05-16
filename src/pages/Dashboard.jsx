
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import SubjectCard from '../components/SubjectCard'
import './Dashboard.css'
import { generateSchedule } from '../utils/scheduleGenerator'

export default function Dashboard() {
    // جلب البيانات والدوال من الـ Context
    const { subjects, addSubject, removeSubject, settings, setSchedule } = useApp()
    const navigate = useNavigate()

    // state محلي للفورم
    const [name, setName] = useState('')
    const [examDate, setExamDate] = useState('')

    // دالة الإضافة
    const handleAdd = () => {
        if (!name.trim() || !examDate) {
            alert('اكتب اسم المادة وتاريخ الامتحان!')
            return
        }

        // إضافة المادة عن طريق الـ Context
        addSubject({ name: name.trim(), examDate })

        // بنفضي الفورم
        setName('')
        setExamDate('')
    }

    const handleGenerate = () => {
        if (subjects.length === 0) {
            alert('ضيفي مواد الأول!')
            return
        }

        const newSchedule = generateSchedule(subjects, settings.dailyHours)


        setSchedule(newSchedule)

        // طباعة الخطة في الـ Console عشان نشوفها (مؤقت)
        console.log('📅 الخطة الجديدة:', newSchedule)

        // الانتقال لصفحة المذاكرة
        navigate('/study')
    }
    return (
        <div className="dashboard">
            {/* HEADER */}
            <header className="dashboard-header">
                <div className="logo" onClick={() => navigate('/')}>
                    <div className="logo-dot"></div>
                    جدولتي
                </div>
            </header>

            {/* CONTENT */}
            <div className="dashboard-container">
                <div className="dashboard-title">
                    <h1>📚 موادك وامتحاناتك</h1>
                    <p>ضيف موادك وتواريخ الامتحانات عشان نعملك خطة</p>
                </div>

                { }
                <div className="add-card">
                    <div className="form-group">
                        <label>اسم المادة</label>
                        <input
                            type="text"
                            placeholder="مثلاً: Data Structure"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                        />
                    </div>

                    <div className="form-group">
                        <label>تاريخ الامتحان</label>
                        <input
                            type="date"
                            value={examDate}
                            onChange={(e) => setExamDate(e.target.value)}
                        />
                    </div>

                    <button className="btn-add-subject" onClick={handleAdd}>
                        + ضيف المادة
                    </button>
                </div>

                { }
                {subjects.length > 0 ? (
                    <>
                        <div className="subjects-header">
                            <span>موادك ({subjects.length})</span>
                        </div>
                        <div className="subjects-grid">
                            {subjects.map((subject) => (
                                <SubjectCard
                                    key={subject.id}
                                    subject={subject}
                                    onRemove={removeSubject}
                                />
                            ))}
                        </div>

                        { }
                        <button className="btn-generate" onClick={handleGenerate}>
                            اعملي خطتي
                        </button>
                    </>
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon">📭</div>
                        <h3>لسه مضفتش أي مادة</h3>
                        <p>ابدأ بإضافة مادتك الأولى من فوق</p>
                    </div>
                )}
            </div>
        </div>
    )
}