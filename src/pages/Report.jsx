import { useState } from "react"

const Report = () => {
    const [reportType, setReportType] = useState("Monthly")
    const [selectedMonth, setSelectedMonth] = useState("")
    const [selectedYear, setSelectedYear] = useState("")

    return (
    <div>
        <h1>Reports</h1>
        <p>Test</p>
        
        <div>
            <label>View</label>
            <button
            type="button" onClick={() => setReportType("Monthly")}>Monthly</button>
            
            <button type="button" onClick={() => setReportType("Yearly")}>Yearly </button>
            </div>

            {reportType === "Monthly" ? (
                <div>
                    <div className="form-field">
                    <label>Month</label>
                    
                    <select
                    value={selectedMonth}
                    onChange={(event) => setSelectedMonth(event.target.value)}
                    >
                        <option value="">Select Month</option>
                        <option value="0">January</option>
                        <option value="1">February</option>
                        <option value="2">March</option>
                        <option value="3">April</option>
                        <option value="4">May</option>
                        <option value="5">June</option>
                        <option value="6">July</option>
                        <option value="7">August</option>
                        <option value="8">September</option>
                        <option value="9">October</option>
                        <option value="10">November</option>
                        <option value="11">December</option>
                    </select>
                    </div>

                    <div className="form-field">
                    <label>Year</label>

                    <input
                        type="Number"
                        value={selectedYear}
                        onChange={(event) => setSelectedYear(event.target.value)}
                        placeholder="2026"
                    />
                    </div>
                </div>
            ) : (
                <div className="form-field">
                    <label>Year</label>

                    <input
                        type="Number"
                        value={selectedYear}
                        onChange={(event) => setSelectedYear(event.target.value)}
                        placeholder="2026"
                    />
                </div>
            )}
        </div>
    )
}

export default Report