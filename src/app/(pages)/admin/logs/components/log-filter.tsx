import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

enum FilterTypes {
    TODAY = "today",
    THREE_DAYS = "three-days",
    SEVEN_DAYS = "seven-days",
    CUSTOM = "custom",
}

interface ILogFilter {
    onFilterChange: (filter: string) => void
}

const LogFilter = ({ onFilterChange }: ILogFilter) => {
    return <div className="flex items-center gap-4">
        <div>Filters:</div>
        <label>
            <Select onValueChange={onFilterChange}>
                <SelectTrigger>
                    <SelectValue placeholder="Timeframe" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value={FilterTypes.TODAY}>Today</SelectItem>
                        <SelectItem value={FilterTypes.THREE_DAYS}>
                            Last 3 days
                        </SelectItem>
                        <SelectItem value={FilterTypes.SEVEN_DAYS}>
                            Last 7 days
                        </SelectItem>
                        <SelectItem value={FilterTypes.CUSTOM}>
                            Custom Date
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </label>
    </div>
}

export default LogFilter