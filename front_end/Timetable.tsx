import React, { useEffect, useState } from "react";
import "./Timetable.css";
import { fetchTimetable } from "../api";

// 📌 단과대 리스트
const faculties = ["공통", "공학", "과학", "예술", "경영", "의학"];

// 📌 요일 리스트
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// 📌 시간 슬롯 리스트
const timeSlots = [
    "08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00",
    "11:00 - 12:00", "12:00 - 13:00", "13:00 - 14:00",
    "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00",
    "17:00 - 18:00", "18:00 - 19:00", "19:00 - 20:00",
    "20:00 - 21:00", "21:00 - 22:00"
];

const Timetable: React.FC = () => {
    // 📌 선택한 단과대 상태
    const [selectedFaculty, setSelectedFaculty] = useState<string>("공통");
    // 📌 요일별 시간표 상태
    const [schedule, setSchedule] = useState<Record<string, Record<string, string>>>({});
    // 📌 로딩 상태
    const [loading, setLoading] = useState<boolean>(true);

    // 📌 선택한 단과대에 맞는 시간표 데이터 가져오기
    useEffect(() => {
        fetchTimetable(selectedFaculty)
            .then((data) => {
                setSchedule(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [selectedFaculty]); // 선택한 단과대가 변경될 때마다 데이터 다시 가져오기

    return (
        <div className="timetable-wrapper">
            {/* 📌 단과대 선택 드롭다운 */}
            <div className="faculty-select-container">
                <label htmlFor="faculty-select" className="faculty-label">단과대 선택:</label>
                <select
                    id="faculty-select"
                    value={selectedFaculty}
                    onChange={(e) => setSelectedFaculty(e.target.value)}
                    className="faculty-select"
                >
                    {faculties.map((faculty, index) => (
                        <option key={index} value={faculty}>{faculty}</option>
                    ))}
                </select>
            </div>

            <div className="timetable-container">
                {loading ? <p>Loading timetable...</p> : (
                    <table className="timetable">
                        <thead>
                        <tr>
                            <th>Day/Time</th>
                            {timeSlots.map((slot, index) => (
                                <th key={index}>{slot}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {days.map((day, dayIndex) => (
                            <React.Fragment key={dayIndex}>
                                {/* 📌 첫 번째 행: 요일(rowSpan=6) + 시간표 셀 */}
                                <tr className="first">
                                    <td className="day" rowSpan={6}>{day}</td>
                                    {timeSlots.map((slot, slotIndex) => (
                                        <td key={`${dayIndex}-1-${slotIndex}`}>
                                            {schedule[day]?.[slot] || ""}
                                        </td>
                                    ))}
                                </tr>
                                {/* 📌 두 번째 행 */}
                                <tr>
                                    {timeSlots.map((slot, slotIndex) => (
                                        <td key={`${dayIndex}-2-${slotIndex}`}>
                                            {schedule[day]?.[slot] || ""}
                                        </td>
                                    ))}
                                </tr>
                                {/* 📌 세 번째 행 */}
                                <tr>
                                    {timeSlots.map((slot, slotIndex) => (
                                        <td key={`${dayIndex}-3-${slotIndex}`}>
                                            {schedule[day]?.[slot] || ""}
                                        </td>
                                    ))}
                                </tr>
                                {/* 📌 네 번째 행 */}
                                <tr>
                                    {timeSlots.map((slot, slotIndex) => (
                                        <td key={`${dayIndex}-4-${slotIndex}`}>
                                            {schedule[day]?.[slot] || ""}
                                        </td>
                                    ))}
                                </tr>
                                {/* 📌 다섯 번째 행 */}
                                <tr>
                                    {timeSlots.map((slot, slotIndex) => (
                                        <td key={`${dayIndex}-5-${slotIndex}`}>
                                            {schedule[day]?.[slot] || ""}
                                        </td>
                                    ))}
                                </tr>
                                {/* 📌 여섯 번째 행 (마지막 줄) */}
                                <tr className="last">
                                    {timeSlots.map((slot, slotIndex) => (
                                        <td key={`${dayIndex}-6-${slotIndex}`}>
                                            {schedule[day]?.[slot] || ""}
                                        </td>
                                    ))}
                                </tr>
                            </React.Fragment>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Timetable;
