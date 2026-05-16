// storage.js - التعامل مع localStorage

// حفظ بيانات في localStorage
export function saveToStorage(key, value) {
    try {
        // localStorage بيخزن نصوص بس، فلازم نحول الـ object لـ string
        localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
        console.error('Storage save error:', e)
    }
}

// قراءة بيانات من localStorage
export function loadFromStorage(key) {
    try {
        const item = localStorage.getItem(key)
        // لو لقينا حاجة، نحولها من string لـ object تاني
        return item ? JSON.parse(item) : null
    } catch (e) {
        console.error('Storage load error:', e)
        return null
    }
}

// مسح كل البيانات (مفيدة لو عايزين reset)
export function clearStorage() {
    localStorage.clear()
}