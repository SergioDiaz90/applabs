import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions, EventApi, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  eventos: any[] = []
  currentEvents: EventApi[] = [];
  calendarOptions: CalendarOptions | undefined;

  constructor(private router: Router) { }

  ngOnInit(): void {
    let arrayObjt = [{
      title: 'Programacion ensayo 1 proyecto 1',
      date: new Date()
    },{
      title: 'Programacion ensayo 25 proyecto 4',
      date: new Date('2024-02-25T14:30:00')
    },
    {
      title: 'Programacion ensayo 4 proyecto 3',
      date: new Date('2024-02-18T05:30:00')
    },
    {
      title: 'Programacion ensayo 7 proyecto 2',
      date: new Date('2024-02-25T15:30:00')
    },
    {
      title: 'Programacion ensayo 2 proyecto 1',
      date: new Date('2024-03-30T14:30:00')
    },];
    arrayObjt.forEach(element => {
      this.eventos.push(element);
    });
    this.initCalendar();
  }

  initCalendar() {
    this.calendarOptions = {
      plugins: [
        interactionPlugin,
        dayGridPlugin,
        timeGridPlugin,
        listPlugin,
      ],
      eventContent: this.customEventContent,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      initialView: 'dayGridMonth',
      initialEvents: this.eventos,
      weekends: true,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      locale: esLocale,
    };
  }

  navigateTo() {
    this.router.navigate(['/dashboard']);
  }

  customEventContent = (arg: { event: EventApi }) => {
    return { html: `<div class='evento'>${arg.event.title}</div>` }; // Mostrar solo el nombre del evento
  }

}
