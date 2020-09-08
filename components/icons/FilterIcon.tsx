interface Props {
    onClick: () => void;
    fill: string;
    className?: string;
}
const FilterIcon = ({ fill = '#fff', onClick, className }: Props) => {
    return (
        <div onClick={onClick} role="button" tabIndex={0} onKeyPress={onClick} className={className}>
            <svg width={16} height={16} viewBox="0 0 16 16">
                <path d="M0 0h16v16H0z" fill="none" />
                <path fill={fill} d="M12.5 3.104a2.751 2.751 0 010 5.292v6.854a.75.75 0 11-1.5 0V8.396a2.751 2.751 0 010-5.292V.75a.75.75 0 111.5 0v2.354zM5 7.604a2.751 2.751 0 010 5.292v2.354a.75.75 0 11-1.5 0v-2.354a2.751 2.751 0 010-5.292V.75a.75.75 0 011.5 0v6.854zM4.25 11.5a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5zm7.5-4.5a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z" />
            </svg>
        </div>

    )
}

export default FilterIcon