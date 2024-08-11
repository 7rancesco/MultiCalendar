<script setup lang="ts">
    import {calendar} from './calendar';
    import Column from './Column.vue';
    import { onMounted, ref, watch } from 'vue';
    import { dragMove } from './dnd';

    onMounted(() => {
        const calendar_container = document.getElementById('calendar_container');

        if(calendar_container){
            calendar_container.scrollTop = 1500;
        }
    })
    
    const setColor = () => {
        calendar.theme = {
            color: calendar.theme.color,
            color2: calendar.theme.color2,
            background: calendar.theme.background,
            background2: calendar.theme.background2
        }   
    }

</script>
<template>

    <button @click="calendar.dates = ['Lun 28 Gen 2024'];setColor()">1Date</button>
    <button @click="calendar.dates = ['Lun 28 Gen 2024', 'Mar 29 Gen 2024'];setColor()">2Date</button>
    <button @click="calendar.calendars = ['Regia', 'Registrazione'];setColor()">2Calendars</button>
    <button @click="calendar.calendars = ['Canto', 'Registrazione', 'Regia', 'Strumenti', 'Locale'];setColor()">5Calendars</button>
    <!-- width non deve essere maggiore della larghezza schermo -->
    <div id="calendar_container" :style="'width: '+( ((calendar.calendars.length * 200 ) * calendar.dates.length) + 30 )+'px;'">
        <div id="calendar_headerbar" :style="'width: '+( (calendar.calendars.length * 200 ) * calendar.dates.length  )+'px;'">
            <div v-for="date in calendar.dates" class="calendar_header">
                <div class="calendar_header_heading">
                    {{ date }}
                </div>
                <div class="calendar_head_columns_container">
                    <div v-for="col_name in calendar.calendars" class="calendar_head_column">
                        {{ col_name }}
                    </div>                    
                </div>
            </div>
        </div>
        <div id="calendar_timebar">
            <div v-for="time in calendar.times" class="calendar_time_container">
                {{ time }}
            </div>            
        </div>
        <div id="calendar_container_in"
            @mousemove="(e) => {dragMove(e)}"
            @touchmove="(e) => {dragMove(e)}"
        >
            <div v-for="date in calendar.dates" class="calendar_columns_container">
                <div class="calendar_column" v-for="col_name in calendar.calendars">
                    <Column :events="calendar.events.filter(e => e.date === date && e.calendar === col_name)"></Column>
                </div>
            </div>
        </div>
    </div>

</template>
<style scoped>
    #calendar_container{
        max-width: 300px;
        height: 600px;
        position: relative;
        overflow: scroll;
        border-radius: 5px;
        user-select: none;
        color: v-bind('calendar.theme.color');
    }
    
    @media(min-width: 450px)
    {
        #calendar_container{
            max-width: 1200px;
        }
        
    }

    /* @media(min-width: 1200px)
    {
        #calendar_container::-webkit-scrollbar {
            width: 6px;
            height: 6px;
            
        }

        #calendar_container::-webkit-scrollbar-track {
            background: #9b9d9e;
        }

        #calendar_container::-webkit-scrollbar-thumb {
            background: #7b7b7b;
            border-radius: 3px;
        }

        #calendar_container::-webkit-scrollbar-thumb:hover{
            
            transition: all 1s;
        }
    } */

    #calendar_container_in{
        width: auto;
        height: 2400px;
        position: absolute;
        top: 40px;
        left: 30px;
        z-index: 0;
        display: flex;
    }

    #calendar_timebar{
        width: 30px;
        height: 2400px;
        position: sticky;
        top: 0;
        left: 0;
        
        z-index: 1;
        background-image: url('./time_line.svg');
        background-position: 40px 0px;
        background-color: v-bind('calendar.theme.background2');
    }

    .calendar_time_container{
        height: 100px;
        box-shadow: 0px 0px 1px 0px gray inset;
        font-size: 14px;
        text-align: center;
        color: v-bind('calendar.theme.color2');
    }

    #calendar_headerbar{
        /* V-Bind */
        height: 40px;
        position: sticky;
        top: 0;
        left: 30px;
        z-index: 2;
        display: flex;
        background: v-bind('calendar.theme.background');
    }

    .calendar_header{
        width: auto;
        box-shadow: 0px 0px 1px 0px #e2e2e2 inset;
    }
    .calendar_header:nth-child(even){
        
    }

    .calendar_header_heading{
        width: auto;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 0px 1px 0px black inset;
        font-size: 19px;
    }

    .calendar_head_columns_container{
        width: auto;
        display: flex;
    }

    .calendar_head_column{
        width: 200px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 0px 1px 0px #e2e2e2 inset;
        font-size: 16px;
        
    }

    .calendar_columns_container{
        display: flex;
        box-shadow: 0px 0px 1px 1px #e2e2e2 inset;
        position: relative;
    }

    .calendar_columns_container:nth-child(even){
        
    }
    .calendar_column{
        width: 200px;
        height: 2400px;
        box-shadow: 0px 0px 1px 0px gray inset;
        background-image: url('./row_line.svg');
        background-position: 0px 0px;
        position: relative;
    }

    .calendar_column:nth-child(odd){
        
    }
    .calendar_column:nth-child(even){
        
    }

</style>