
export function generateSchedule(subjects, dailyHours) {
    // لو مفيش مواد، رجّع قايمة فاضية
    if (!subjects.length) return []

    const today = new Date()

    const subjectsWithWeight = subjects.map((subject) => {
        const examDate = new Date(subject.examDate)

        const daysLeft = Math.max(
            1,
            Math.ceil((examDate - today) / (1000 * 60 * 60 * 24))
        )

        const weight = 1 / daysLeft

        return {
            ...subject,
            daysLeft,
            weight,
        }
    })

    const totalWeight = subjectsWithWeight.reduce(
        (sum, s) => sum + s.weight,
        0
    )

    const schedule = subjectsWithWeight.map((subject) => {
        // نسبة الوزن × ساعات المذاكرة اليومية
        const hoursPerDay = (subject.weight / totalWeight) * dailyHours

        return {
            subjectId: subject.id,
            subjectName: subject.name,
            color: subject.color,
            examDate: subject.examDate,
            daysLeft: subject.daysLeft,
            hoursPerDay: parseFloat(hoursPerDay.toFixed(2)),  // تقريب لرقمين عشريين
            minutesPerDay: Math.round(hoursPerDay * 60),     // تحويل لدقايق
        }
    })

    schedule.sort((a, b) => a.daysLeft - b.daysLeft)

    return schedule
}

/**
 * تنسيق الساعات لعرض سهل القراءة
 * مثلاً: 1.5 → "1 ساعة و 30 دقيقة"
 */
export function formatHours(hours) {
    const totalMinutes = Math.round(hours * 60)
    const h = Math.floor(totalMinutes / 60)
    const m = totalMinutes % 60

    if (h === 0) return `${m} دقيقة`
    if (m === 0) return `${h} ساعة`
    return `${h} س ${m} د`
}