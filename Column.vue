<script setup lang="ts">
    import { ref, computed } from 'vue';
    import {calendar, type CalendarEvent} from './calendar';
    import { dragStart, dragEnd } from './dnd';

    interface Prop {
        events: CalendarEvent[]
    }
    const props = defineProps<Prop>();

    function sortByHourMinutesDuration(arr: CalendarEvent[]): CalendarEvent[] {
        return arr.sort((a, b) => {

            if (a.hour !== b.hour) {
            return a.hour.localeCompare(b.hour);
            }

            if (a.minutes !== b.minutes) {
            return a.minutes.localeCompare(b.minutes);
            }

            return a.duration - b.duration;
        });
    }

    interface EventPosition {
        id: number,
        y1: number,
        y2: number,
        w: number,
        x: number,
        split: boolean,
        duration: number,
        group: string,
    }
    const setTopHeight = () => {
        let positions : EventPosition[] = [];
        sortByHourMinutesDuration(props.events).forEach((event, i) => {
            const startInMinutes = (Number(event.hour) * 60) + Number(event.minutes);
            const start = (startInMinutes / 60) * 100;
            let y2Prew = 0;
            if(i !== 0)
            {
                y2Prew = positions[i - 1].y2;
            }

            let split = start < y2Prew ? true : false;

            if(split)
            {
                positions[i - 1].split = true;
            }

            positions.push({
                id: event.id,
                y1: start,
                y2: start + Number(event.duration),
                w: 200,
                x:0,
                split: split,
                duration: event.duration,
                group: ''
            });            
        });
        return positions
    }


    const setGroup = () => {
        let eventGroup = setTopHeight();
        const grouped : EventPosition[][] = [];
        eventGroup.forEach(element => {
            const classes = eventGroup.filter(e => e.y1 === element.y1 && e.y2 === element.y2);
            if(classes.length > 1)
            {
                const checkPushed = grouped.filter(e => JSON.stringify(e) === JSON.stringify(classes));
                if(!checkPushed.length)
                {
                    grouped.push(classes);
                }
            }
        });    
        
        grouped.forEach(gIn => {
            gIn.forEach((e, i) => {
                if(i > 0)
                {
                    eventGroup = eventGroup.filter(ep => ep.id !== e.id);
                }
            });
            
            const eventFirst = eventGroup.find(e => e.id === gIn[0].id);
            if(eventFirst){
                eventFirst.group = JSON.stringify(gIn);
            }
                
        });

        return eventGroup
    }

    const setSplit = () => {
        const noSplitted = setGroup().filter(e => !e.split);
        noSplitted.forEach(element => {
            element.w = 200;
        });

        const splitted = setGroup().filter(e => e.split);
        const rows : EventPosition[][] = [];
        let row : EventPosition[] = [];
        splitted.forEach((element, i) => {
            row.push(element)
            if(splitted[i + 1])
            {
                if(element.y2 <= splitted[i + 1].y1)
                {
                    rows.push(row)
                    row = [];
                }
            }
            else
            {
                rows.push(row)
                row = [];                
            }

        });     
        
        
        rows.forEach(row => {
            const length = row.length;
            let left = 0;
            row.forEach(element => {
                const e = splitted.find(s => s.id === element.id);

                if(e){
                    e.w = 200 / length;
                    e.x= left;
                }

                left+= 200 / length;
            });
        });        

        //Hover area controll
        noSplitted.forEach(ns => {
            ns.x = 0;
            splitted.forEach(s => {
                s.x = s.x !== 0 ? s.x : 0;
                const sWidth = s.w;

                if(ns.x == s.x && ns.y1 > s.y1 && ns.y1 < s.y2)
                {
                    const nsL = sWidth + s.x;
                    ns.x = nsL;
                    ns.w = 200 - nsL;
                }
            });
        });

        const output : EventPosition[] = [];

        splitted.forEach(element => {
            output.push(element)
        });
        noSplitted.forEach(element => {
            output.push(element)
        });

        return output
    }

    const positionatedEvents = computed(() => {
        const evnts = setSplit();

        return evnts
    })

    interface MoveEvent {
        header: string,
        column: string,
        top: number,
        id: number  
    }
    const moveEvent = (obj : MoveEvent) => {
        const event = calendar.events.find(e => e.id === obj.id);
        if(event)
        {
            let topString = (obj.top - 50).toFixed(0).toString();
            
            const l = topString.length;
            if(l < 4)
            {
                topString = `0${topString}`;
            }
            if(l < 3)
            {
                topString = `0${topString}`;
            }
            
            const m = Number(topString.substring(2,4));
            const n_minutes = ((m / 100) * 60).toFixed(0);
            let minutes = (Math.round(Number(n_minutes) / 15) * 15).toString();
            if(minutes.length < 2)
            {
                minutes = `0${minutes}`;
            }
            
            const h = topString.substring(0,2);

            const c = confirm(`Sposta evento a: ${obj.header}, ${h}:${minutes}, aula ${obj.column}`);
            if(c)
            {

                const element = document.getElementById(`event-${event.id}`);
                if(element)
                {
                    const groupAttr = element.getAttribute('group');
                    if(groupAttr){
                        const groupLength = groupAttr.length;
                        if(groupLength > 0)
                        {
                            const eventsGroup : CalendarEvent[] = JSON.parse(groupAttr);
                            eventsGroup.forEach(evnt => {
                                const event = calendar.events.find(e => e.id === evnt.id);
                                if(event){
                                    event.date = obj.header;
                                    event.calendar = obj.column;
                                    event.hour = h;
                                    event.minutes = minutes;
                                }
                                
                            });
                        }
                    }
                    else
                    {
                        event.date = obj.header;
                        event.calendar = obj.column;
                        event.hour = h;
                        event.minutes = minutes;
                    }
                    
                }
            }
            
        }
    }

</script>
<template>
    <div v-for="event in positionatedEvents" 
        class="event"
        :id="`event-${event.id}`"
        :style="`top:${event.y1}px; left:${event.x}px; height:${(event.duration / 60) * 100}px; width:${event.w}px;`"
        :group="event.group"
        @mousedown="(e) => {dragStart(event.id, e)}"
        @touchstart="(e) => {dragStart(event.id, e)}"
        @mouseup="moveEvent(dragEnd())"
        @touchend="moveEvent(dragEnd())"
    >
        {{ event.group ? `Group ${(JSON.parse(event.group)).length}` : `Event ${event.id}` }}
    </div>
</template>
<style scoped>

    @keyframes eventAnimation {
        from{
            transform: translate(0%, 50%) scaleX(0);
        }
        to{
            transform: translate(0%) scaleX(1);
        }
    }

    .event{
        background: rgb(255, 0, 255);
        opacity: 0.8;
        box-shadow: 0px 0px 0px 1px rgb(255, 255, 255) inset;
        position: absolute;
        animation: eventAnimation 0.4s ease-out;
        z-index: 1000;
    }

    .move-event{
        transform: translate(0px, -5px);
        box-shadow: 0px 2px 3px 1px rgba(0, 0, 0, 0.443);
        z-index: 1001;
    } 

</style>