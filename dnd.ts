import { ref } from "vue";

const drag = ref<boolean>(false);
const eventID = ref<number>(0);
const startX = ref<number>(0);
const startY = ref<number>(0);
const currentX = ref<number>(0);
const currentY = ref<number>(0);
const element = ref<HTMLElement>();
const scrollTopStart = ref<number>(0);
const dragTimeStart = ref<number>(0);


let waitingForDrag : number;
const clearWFD = () => {
    clearInterval(waitingForDrag);
    dragTimeStart.value = 0;
    waitingForDrag = 0;
}

const dragStart = (id : number, e : MouseEvent | TouchEvent) => {
    waitingForDrag = setInterval(() => {
        if(dragTimeStart.value >= 6)
        {
            drag.value = true;
            const event = document.getElementById(`event-${eventID.value}`);
            if(event)
            {
                event.classList.add('move-event')
            }     
            clearWFD();
        }
        dragTimeStart.value+= 1;
    }, 50)
    eventID.value = id;
    const event = document.getElementById(`event-${eventID.value}`);
    if(event)
    {
        element.value = event;
    }

    if(e instanceof MouseEvent){
        startX.value = e.clientX;
        startY.value = e.clientY;
    } else if (e instanceof TouchEvent)
    {
        startX.value = e.touches[0].clientX;
        startY.value = e.touches[0].clientY;
    }  
    
    const container = document.getElementById('calendar_container');
    if(container)
    {
        scrollTopStart.value = container.scrollTop;
    }    

}

const dragMove = (e : MouseEvent | TouchEvent) => {
    clearWFD();
    if(drag.value)
    {
        if(element.value)
        {
            let x = 0;
            let y = 0;
            if(e instanceof MouseEvent){
                x = e.clientX;
                y = e.clientY;
            } else if (e instanceof TouchEvent)
            {
                x = e.touches[0].clientX;
                y = e.touches[0].clientY;
            }

            currentX.value = x - startX.value;
            currentY.value = y - startY.value;

            const container = document.getElementById('calendar_container');
            if(container)
            {
                if(container.scrollTop !== scrollTopStart.value)
                {
                    currentY.value = currentY.value + (container.scrollTop - scrollTopStart.value)
                }
            }

            element.value.style.transform = `translate(${currentX.value}px, ${currentY.value}px)`;
            
        }
    }
}

const detectPosition = (x : number, y : number) => {
    let headerColumn = '';
    let columnName = '';
    let top = 0;

    const container = document.getElementById('calendar_container');
    if(container)
    {
        top = y + container.scrollTop
    }

    const headers = document.getElementsByClassName('calendar_header_heading');
    if(headers)
    {
        for (let i = 0; i < headers.length; i++) {
            const element = headers.item(i);
            if(element)
            {
                const position = element.getClientRects();
                const xPosition = position.item(0)?.x;
                const w = position.item(0)?.width;
                if(xPosition && w){
                    if(x >= xPosition && x <= (xPosition + w))
                    {
                        const item = element.textContent
                        if(item)
                        {
                            headerColumn = item;
                        }
                    }
                }
            }
        }
    }

    const columns = document.getElementsByClassName('calendar_head_column');
    if(columns)
    {
        for (let i = 0; i < columns.length; i++) {
            const element = columns.item(i);
            if(element)
            {
                const position = element.getClientRects();
                const xPosition = position.item(0)?.x;
                const w = position.item(0)?.width;
                if(xPosition && w){
                    if(x >= xPosition && x <= (xPosition + w))
                    {
                        const item = element.textContent
                        if(item)
                        {
                            columnName = item;
                        }
                    }
                }
            }
        }
    }

    return {
        header: headerColumn,
        column: columnName,
        top: top,
        id:eventID.value
    }
}

const dragEnd = () => {
    clearWFD();
    const event = document.getElementById(`event-${eventID.value}`);
    if(event)
    {
        element.value = event;
        event.classList.remove('move-event')
    }

    let cY = 0;
    const container = document.getElementById('calendar_container');
    if(container)
    {
        cY = container.offsetTop;
    }
    
    if(element.value && drag.value)
    {
        drag.value = false;
        const position = element.value.getClientRects();
        const x = position.item(0)?.x;
        const y = position.item(0)?.y;
        if(x && y){
            element.value.style.transform = ``;
            return detectPosition(x, (y - cY) + 6) //5 = translateY in .move-event + 1 = border tollerance
        }
    }
    else
    {
        const element = document.getElementById(`event-${eventID.value}`);
        if(element)
        {
            const groupAttr = element.getAttribute('group');
            if(groupAttr){
                const groupLength = groupAttr.length;
                if(groupLength > 0)
                {
                    alert(groupAttr)
                }
            }
            else
            {
                alert(eventID.value)
            }
            
        }
    }
    drag.value = false;
    return {
        header: '',
        column: '',
        top: 0,
        id:0
    }    
}

export {
    dragStart,
    dragMove,
    dragEnd
}

