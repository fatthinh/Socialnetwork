export const getDateTimeDifference = (dateTime) => {
    const requestTime = new Date(dateTime);
    const currentTime = new Date();

    // Calculate the time difference in milliseconds
    const difference = Math.abs(currentTime.getTime() - requestTime.getTime());

    // If the time difference is less than 1 second, return "Right now"
    if (difference < 1000) {
        return 'Right now';
    }

    // Convert milliseconds to seconds, minutes, hours, days, months, and years
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    // Format the result as a string
    if (years > 0) {
        return years + (years === 1 ? ' year ago' : ' years ago');
    } else if (months > 0) {
        return months + (months === 1 ? ' month ago' : ' months ago');
    } else if (days > 0) {
        return days + (days === 1 ? ' day ago' : ' days ago');
    } else if (hours > 0) {
        return hours + (hours === 1 ? ' hour ago' : ' hours ago');
    } else if (minutes > 0) {
        return minutes + (minutes === 1 ? ' minute ago' : ' minutes ago');
    } else {
        return seconds + (seconds === 1 ? ' second ago' : ' seconds ago');
    }
};

export const convertDate = (str) => {
    var date = new Date(str),
        mnth = ('0' + (date.getMonth() + 1)).slice(-2),
        day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
};
