
import './ProgressBar.css'

export default function ProgressBar({ label, color, percent, value, sublabel }) {
    return (
        <div className="progress-wrapper">
            <div className="progress-row">
                <div className="progress-label-group">
                    <div
                        className="progress-dot"
                        style={{ background: color }}
                    />
                    <span className="progress-label">{label}</span>
                    {sublabel && (
                        <span className="progress-sublabel">{sublabel}</span>
                    )}
                </div>
                <span className="progress-value">{value}</span>
            </div>
            <div className="progress-track">
                <div
                    className="progress-fill"
                    style={{
                        width: `${Math.min(100, percent)}%`,
                        background: color
                    }}
                />
            </div>
        </div>
    )
}