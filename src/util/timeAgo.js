export const timeAgo = (currentTime,prevDate) => {
    const diff = Number(currentTime) - Number(new Date(prevDate));
    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = day * 365;
    switch (true) {
        case diff < minute:
            return `vài giây trước`
        case diff < hour:
            return Math.round(diff / minute) + ' phút trước';
        case diff < day:
            return Math.round(diff / hour) + ' giờ trước';
        case diff < month:
            return Math.round(diff / day) + ' ngày trước';
        case diff < year:
            return Math.round(diff / month) + ' tháng trước';
        case diff > year:
            return Math.round(diff / year) + ' năm trước';
        default:
            return "";
    }
};