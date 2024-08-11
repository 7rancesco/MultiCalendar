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
    theme: {
        color:'white',
        color2:'#093662',
        background: 'steelblue',
        background2: '#d4dfe9'        
    },
    onClick: (data) => {
        alert(`data: ${data}`);
    },
    events: [
        {id: 1, date: 'Mar 29 Gen 2024', calendar:'Canto', hour: '04', minutes:'00', duration: 60, color:'orange'},
        {id: 2, date: 'Lun 28 Gen 2024', calendar:'Regia', hour: '16', minutes:'00', duration: 60, color:'purple'},
        {id: 3, date: 'Lun 28 Gen 2024', calendar:'Regia', hour: '16', minutes:'30', duration: 60, color:'aqua'},
        {id: 4, date: 'Lun 28 Gen 2024', calendar:'Registrazione', hour: '17', minutes:'30', duration: 30, color:'aqua'},
        {id: 5, date: 'Lun 28 Gen 2024', calendar:'Regia', hour: '18', minutes:'00', duration: 120, color:'aqua'},
        {id: 6, date: 'Lun 28 Gen 2024', calendar:'Regia', hour: '18', minutes:'30', duration: 30, color:'pink'},
        {id: 7, date: 'Lun 28 Gen 2024', calendar:'Regia', hour: '19', minutes:'00', duration: 60, color:'aqua'},
        {id: 8, date: 'Lun 28 Gen 2024', calendar:'Regia', hour: '21', minutes:'00', duration: 60, color:'purple'},
        {id: 9, date: 'Lun 28 Gen 2024', calendar:'Regia', hour: '21', minutes:'00', duration: 60, color:'pink'},
        {id: 10, date: 'Lun 28 Gen 2024', calendar:'Regia', hour: '21', minutes:'00', duration: 60, color:'orange'},
        {id: 11, date: 'Lun 28 Gen 2024', calendar:'Regia', hour: '21', minutes:'00', duration: 60, color:'purple'},
        {id: 12, date: 'Lun 28 Gen 2024', calendar:'Regia', hour: '21', minutes:'00', duration: 60, color:'aqua'},
        {id: 13, date: 'Lun 28 Gen 2024', calendar:'Regia', hour: '21', minutes:'00', duration: 60, color:'pink'},
        {id: 14, date: 'Lun 28 Gen 2024', calendar:'Regia', hour: '21', minutes:'00', duration: 60, color:'purple'},
        {id: 15, date: 'Lun 28 Gen 2024', calendar:'Regia', hour: '21', minutes:'00', duration: 60, color:'orange'},
        {id: 16, date: 'Lun 28 Gen 2024', calendar:'Regia', hour: '21', minutes:'00', duration: 60, color:'pink'},        
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
    calendar,
    type CalendarEvent
}