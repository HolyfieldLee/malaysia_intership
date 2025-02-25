export const fetchTimetable = async () => {
    try {
        const response = await fetch("http://localhost:5000/timetable"); // 백엔드 API URL
        if (!response.ok) throw new Error("Failed to fetch timetable data");
        return await response.json();
    } catch (error) {
        console.error("Error fetching timetable:", error);
        return {};
    }
};
