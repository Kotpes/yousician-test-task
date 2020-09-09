import inRange from 'lodash.inrange'

const getColor = (level: number) => {
    //1-5 green, 6-10 orange, 10-15 red
    if (inRange(level, 1, 6)) {
        return '#6fc13e'
    }
    if (inRange(level, 6, 11)) {
        return '#ff8e00'
    }
    if (inRange(level, 10, 16)) {
        return '#dc001c'
    }
}

interface Props {
    value: number
    isSelected?: boolean
}

const SvgComponent = ({ value = 1, isSelected }: Props) => {
    const radius = 15;
    const segmentWidth = value * 100 / 15
    const circumference = Math.PI * (radius * 2);
    const progress = ((100 - segmentWidth) / 100) * circumference;
    const progressColor = getColor(value)
    const fill = isSelected ? '#fff' : 'transparent'
    const textColor = isSelected ? '#000' : '#fff'
    const progressStrokeColor = isSelected ? '#fff' : progressColor
    const deviderStrokeColor = isSelected ? '#fff' : '#000'
    const ringStrokeColor = isSelected ? '#fff' : '#383635'

    return (
        <svg viewBox="0 0 42 42" width={45} height={45}>
            <circle
                className="ring"
                cx={21}
                cy={21}
                r={radius}
                fill={fill}
                stroke={ringStrokeColor}
                strokeDasharray={0}
                strokeWidth={1.8}

            />
            <circle
                className="progress"
                cx={21}
                cy={21}
                r={radius}
                fill={fill}
                stroke={progressStrokeColor}
                strokeDasharray={circumference}
                strokeDashoffset={progress}
                strokeWidth={1.8}
                transform='rotate(-90 21 21)'
            />
            <circle
                className="devider"
                cx={21}
                cy={21}
                r={radius}
                fill={fill}
                stroke={deviderStrokeColor}
                strokeDasharray="9% 65.5%"
                transform='rotate(-96 21 21)'
                strokeWidth={2}
            />
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                fill={textColor}
                dy=".3em"
                fontSize="14"
                fontWeight="800"
            >
                {value}
            </text>
        </svg>
    )
}

export default SvgComponent