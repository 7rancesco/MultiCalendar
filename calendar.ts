import { reactive, onMounted } from "vue";

interface CalendarEvent {
    id: number,
    date: string,
    calendar: string,
    hour: string,
    minutes: string,
    duration: number
}

interface Calendar {
    dates: string[],
    calendars: string[],
    times: string[],
    events: CalendarEvent[]
}

const calendar = reactive<Calendar>({
    dates: ['Lun 28 Gen 2024', 'Mar 29 Gen 2024'],
    calendars: ['Canto', 'Registrazione', 'Regia', 'Strumenti', 'Locale'],
    times: [''],
    events: [
        {id: 1, date: 'Lun 28 Gen 2024', calendar:'Regia', hour: '15', minutes:'00', duration: 60},
        {id: 2, date: 'Lun 28 Gen 2024', calendar:'Regia', hour: '16', minutes:'00', duration: 60},
        {id: 3, date: 'Lun 28 Gen 2024', calendar:'Regia', hour: '16', minutes:'30', duration: 60},
        {id: 4, date: 'Lun 28 Gen 2024', calendar:'Regia', hour: '17', minutes:'30', duration: 30},
        {id: 5, date: 'Lun 28 Gen 2024', calendar:'Regia', hour: '18', minutes:'00', duration: 120},
        {id: 6, date: 'Lun 28 Gen 2024', calendar:'Regia', hour: '18', minutes:'30', duration: 30},
        {id: 7, date: 'Lun 28 Gen 2024', calendar:'Regia', hour: '19', minutes:'00', duration: 60},
        {id: 8, date: 'Lun 28 Gen 2024', calendar:'Regia', hour: '21', minutes:'00', duration: 60},
        {id: 9, date: 'Lun 28 Gen 2024', calendar:'Regia', hour: '21', minutes:'00', duration: 60},
        {id: 10, date: 'Lun 28 Gen 2024', calendar:'Regia', hour: '21', minutes:'00', duration: 60},
        {id: 11, date: 'Lun 28 Gen 2024', calendar:'Regia', hour: '21', minutes:'00', duration: 60},
        {id: 12, date: 'Lun 28 Gen 2024', calendar:'Regia', hour: '21', minutes:'00', duration: 60},
        {id: 13, date: 'Lun 28 Gen 2024', calendar:'Regia', hour: '21', minutes:'00', duration: 60},
        {id: 14, date: 'Lun 28 Gen 2024', calendar:'Regia', hour: '21', minutes:'00', duration: 60},
        {id: 15, date: 'Lun 28 Gen 2024', calendar:'Regia', hour: '21', minutes:'00', duration: 60},
        {id: 16, date: 'Lun 28 Gen 2024', calendar:'Regia', hour: '21', minutes:'00', duration: 60},        
    ]
});

const t = [];
for (let i = 0; i < 24; i++) {
    if(i < 10){
        t.push(`0${i}:00`)
    } else {
        t.push(`${i}:00`)
    }
}
calendar.times = t;

export {
    calendar
}