class dataDto {
    declare time: string | number
    declare fillWithZeros?: boolean
}
export function splitTime(data: dataDto) {
    let { time, fillWithZeros } = data
    let _fillWithZeros = fillWithZeros ?? true
    let next = new Date(time).getTime()
    let now = new Date().getTime()
    time = (next - now) / 1000
    let day = parseInt(String(time / 60 / 60 / 24)),
        hour = parseInt(String((time / 60 / 60) % 24)),
        minute = parseInt(String(time / 60 % 60)),
        second = parseInt(String(time % 60))
    return {
        year: parseInt(String(time / 60 / 60 / 24 / 365)),
        month: parseInt(String(time / 60 / 60 / 24 / 30)),
        week: parseInt(String((time / 60 / 60 / 24) / 7)),
        day: _fillWithZeros ? String(day).padStart(2, '0') : day,
        hour: _fillWithZeros ? String(hour).padStart(2, '0') : hour,
        minute: _fillWithZeros ? String(minute).padStart(2, '0') : minute,
        second: _fillWithZeros ? String(second).padStart(2, '0') : second
    }
}