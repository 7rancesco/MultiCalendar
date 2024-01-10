<script setup lang="ts">
    import {calendar} from './calendar';
    import Column from './Column.vue';
    import { onMounted } from 'vue';
    import { dragMove } from './dnd';

    onMounted(() => {
        const calendar_container = document.getElementById('calendar_container');

        if(calendar_container){
            calendar_container.scrollTop = 1500;
        }
    })

</script>
<template>

    <button @click="calendar.dates = ['Mar 29 Gen 2024']">1Date</button>
    <button @click="calendar.dates = ['Lun 28 Gen 2024', 'Mar 29 Gen 2024']">2Date</button>
    <button @click="calendar.calendars = ['Canto', 'Registrazione']">2Calendars</button>
    <button @click="calendar.calendars = ['Canto', 'Registrazione', 'Regia', 'Strumenti', 'Locale']">5Calendars</button>
    *Sistemare Layout container quando cambiano i filtri
    <div id="calendar_container">
        <div id="calendar_headerbar">
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
        width: 100%;
        max-width: 1200px;
        height: 600px;
        position: relative;
        overflow: scroll;
        border: solid 3px rgba(235, 239, 244, 0.713);
        border-radius: 5px;
        background: rgb(255, 255, 255);
        user-select: none;
    }

    @media(min-width: 1200px)
    {
        #calendar_container::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }

        #calendar_container::-webkit-scrollbar-track {
            background: white;
        }

        #calendar_container::-webkit-scrollbar-thumb {
            background: #bedef9;
            border-radius: 3px;
        }

        #calendar_container::-webkit-scrollbar-thumb:hover{
            background: rgb(47, 122, 202);
            transition: all 1s;
        }
    }

    #calendar_container_in{
        width: auto;
        height: 2400px;
        position: absolute;
        top: 40px;
        left: 30px;
        background: #f1f1f1;
        z-index: 0;
        display: flex;
    }

    #calendar_timebar{
        width: 30px;
        height: 2400px;
        position: sticky;
        top: 0;
        left: 0;
        background: #355a81db;
        z-index: 1;
        background-image: url('./time_line.svg');
        background-position: 40px 0px;
        color: rgb(37, 255, 233);
    }

    .calendar_time_container{
        height: 100px;
        box-shadow: 0px 0px 1px 0px gray inset;
        font-size: 12px;
        text-align: center;
    }

    #calendar_headerbar{
        width: 2000px;/* V-Bind */
        height: 40px;
        position: sticky;
        top: 0;
        left: 40px;
        background: rgba(255, 255, 255, 0.654);
        z-index: 2;
        display: flex;
        background: rgba(19, 110, 201, 0.82);
        color: rgb(210, 223, 247);
    }

    .calendar_header{
        width: auto;
        box-shadow: 0px 0px 2px 0px gray inset;
    }
    .calendar_header:nth-child(even){
        background: rgba(10, 56, 147, 0.072);
    }

    .calendar_header_heading{
        width: auto;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 0px 1px 0px rgb(255, 255, 255) inset;
        font-size: 14px;
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
        box-shadow: 0px 0px 1px 0px rgb(255, 255, 255) inset;
        font-size: 12px;
        background: rgb(66, 109, 161);
    }

    .calendar_columns_container{
        display: flex;
        box-shadow: 0px 0px 2px 2px blue inset;
        position: relative;
    }

    .calendar_columns_container:nth-child(even){
        background: rgb(179, 201, 233);
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
        background-color: rgba(255, 255, 255, 0.723);
    }
    .calendar_column:nth-child(even){
        background-color: rgba(232, 244, 255, 0.694);
    }

</style>