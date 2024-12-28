import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { FilterTypes } from "../logs-service"



interface ILogFilter {
    onFilterSearch: (filterType: FilterTypes | string) => void
}

const LogFilter = ({ onFilterSearch }: ILogFilter) => {
    const [filterType, setFilterType] = useState<FilterTypes | string>(FilterTypes.TODAY)
    return <div className="flex items-center gap-4">
        <div>Filters:</div>
        <label>
            <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                    <SelectValue placeholder="Timeframe" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value={FilterTypes.TODAY}>Latest</SelectItem>
                        <SelectItem value={FilterTypes.YESTERDAY}>Yesterday</SelectItem>
                        <SelectItem value={FilterTypes.THREE_DAYS}>
                            3 days ago
                        </SelectItem>
                        <SelectItem value={FilterTypes.FOUR_DAYS}>
                            4 days ago
                        </SelectItem>
                        <SelectItem value={FilterTypes.FIVE_DAYS}>
                            5 days ago
                        </SelectItem>
                        <SelectItem value={FilterTypes.SIX_DAYS}>
                            6 days ago
                        </SelectItem>
                        <SelectItem value={FilterTypes.SEVEN_DAYS}>
                            7 days ago
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </label>
        <Button onClick={() => onFilterSearch(filterType)}>Search</Button>
    </div>
}

export default LogFilter