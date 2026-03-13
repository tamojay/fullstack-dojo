import "./ProgressRing.css";

interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

export function ProgressRing({
  percentage,
  size = 40,
  strokeWidth = 3,
  color = "var(--accent-green)",
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const center = size / 2;

  return (
    <svg
      className="progress-ring"
      width={size}
      height={size}
      aria-label={`${percentage}% complete`}
      role="img"
    >
      <circle
        className="progress-ring__track"
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={strokeWidth}
        fill="none"
        stroke="var(--border)"
      />
      <circle
        className="progress-ring__fill"
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={strokeWidth}
        fill="none"
        stroke={color}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${center} ${center})`}
      />
      <text
        className="progress-ring__text"
        x={center}
        y={center}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={size < 36 ? 8 : 10}
        fill="var(--text-secondary)"
      >
        {percentage}%
      </text>
    </svg>
  );
}
