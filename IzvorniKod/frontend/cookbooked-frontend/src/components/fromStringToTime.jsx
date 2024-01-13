function fromStringToTime(durationStr) {
    if(!durationStr) return '';
    const durationMatch = durationStr.match(/PT(\d+H)?(\d+M)?/);
    let totalMinutes = 0;

    if (durationMatch && durationMatch[1]) {
    totalMinutes += parseInt(durationMatch[1].slice(0, -1)) * 60;
    }

    if (durationMatch && durationMatch[2]) {
    totalMinutes += parseInt(durationMatch[2].slice(0, -1));
    }

    return totalMinutes;
};

export default fromStringToTime;

