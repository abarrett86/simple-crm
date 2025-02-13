export const getFormattedDatetime = (dateTime:Date) => {
    const date = new Date(dateTime);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
          })}`;
}