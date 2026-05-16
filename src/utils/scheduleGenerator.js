
export function generateSchedule(subjects, dailyHours) {
    // لو مفيش مواد، رجّع قايمة فاضية
    if (!subjects.length) return []

    const today = new Date()

    // ----- خطوة 1: حساب الأيام المتبقية ووزن كل مادة -----
    const subjectsWithWeight = subjects.map((subject) => {
        const examDate = new Date(subject.examDate)

        // عدد الأيام المتبقية (الحد الأدنى يوم واحد عشان نتجنب القسمة على صفر)
        const daysLeft = Math.max(
            1,
            Math.ceil((examDate - today) / (1000 * 60 * 60 * 24))
        )

        // الوزن: كل ما الامتحان أقرب → الوزن أعلى
        const weight = 1 / daysLeft

        return {
            ...subject,
            daysLeft,
            weight,
        }
    })

    // ----- خطوة 2: حساب مجموع الأوزان -----
    const totalWeight = subjectsWithWeight.reduce(
        (sum, s) => sum + s.weight,
        0
    )

    // ----- خطوة 3: توزيع الساعات على كل مادة -----
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

    // ----- خطوة 4: ترتيب حسب قرب الامتحان -----
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