import { useState } from "react"

const Report = () => {
    const [reportType, setReportType] = useState("Monthly")

    return (
        <div>
            <h1>Reports</h1>
            <p>Test</p>
            
            <div>
                <label>View</label>
                <button
                    type="button"
                    onClick={() => setReportType("Monthly")}
                >
                    Monthly
                </button>

                <button
                    type="button"
                    onClick={() => setReportType("Yearly")}
                >
                    Yearly
                    </button>
            </div>
        </div>
    )
}

export default Report