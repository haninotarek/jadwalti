
import { useNavigate } from 'react-router-dom'
import './Landing.css'

export default function Landing() {

    const navigate = useNavigate()

    return (
        <>
            { }
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>

            { }
            <nav className="nav">
                <div className="logo">
                    <div className="logo-dot"></div>
                    جدولتي
                </div>
            </nav>

            { }
            <div className="container">
                <section className="hero">
                    <div className="hero-tag">
                        ✦ خطة مذاكرة ذكية لكل طالب
                    </div>
                    <h1>
                        ذاكر أذكى،<br />
                        مش <span className="accent">أكتر</span>
                    </h1>
                    <p>
                        جدولتي بيعمللك خطة مذاكرة على حسب امتحاناتك،
                        مع تايمر تركيز وFocus Mode يخليك تنجز فعلاً.
                    </p>

                    {/* الأزرار - نربطهم بالـ navigate */}
                    <div className="cta-group">
                        <button
                            className="btn-primary"
                            onClick={() => navigate('/dashboard')}
                        >
                            ابدأ دلوقتي
                        </button>
                        <button
                            className="btn-secondary"
                            onClick={() => navigate('/study')}
                        >
                            شوف ازاي بيشتغل
                        </button>
                    </div>

                    { }
                    <div className="stats">
                        <div className="stat">
                            <div className="stat-num">25</div>
                            <div className="stat-label">دقيقة تركيز</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat">
                            <div className="stat-num">∞</div>
                            <div className="stat-label">مواد تقدر تضيفها</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat">
                            <div className="stat-num">0</div>
                            <div className="stat-label">تشتيت في Focus Mode</div>
                        </div>
                    </div>
                </section>

                { }
                <section className="how">
                    <div className="section-title">
                        <h2>إزاي بيشتغل؟</h2>
                        <p>3 خطوات بس وخطتك جاهزة</p>
                    </div>
                    <div className="steps">
                        <div className="step">
                            <div className="step-num">01</div>
                            <h4>حط موادك</h4>
                            <p>أضف موادك وتواريخ امتحاناتك في ثواني</p>
                        </div>
                        <div className="step">
                            <div className="step-num">02</div>
                            <h4>جدولتي يرتب</h4>
                            <p>هيعمللك خطة مذاكرة موزّعة بشكل ذكي</p>
                        </div>
                        <div className="step">
                            <div className="step-num">03</div>
                            <h4>اذاكر وتابع</h4>
                            <p>شغّل التايمر، فعّل Focus Mode، وتابع تقدمك</p>
                        </div>
                    </div>
                </section>
            </div>

            {/* FOOTER - التذييل */}
            <footer>
                صُنع بـ إيد االحنون لكل طالب عايز يذاكر صح<br />
                <strong>جدولتي</strong> — مش بس جدول، ده رفيق مذاكرتك
            </footer>
        </>
    )
}