import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions, EventApi, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {

  eventos: any[] = []
  currentEvents: EventApi[] = [];
  calendarOptions: CalendarOptions | undefined;
  areas: any;
  opciones: any;
  proyectos: any;
  selectedOption: string | undefined;
  showCalendar: boolean | undefined;
  arrayObjt: any[] = [];
  date: Date[] | undefined;
  description: string | undefined;

  constructor(private router: Router, private changeDetector: ChangeDetectorRef) { 
    this.showCalendar = false;
  }

  ngOnInit(): void {
    this.dataselect();
  }

  dataselect() {
    this.areas = [
      {name: 'Laboratorios', code: 'Laboratorios'},
      {name: 'Equipos', code: 'Equipos'}
    ];
    this.proyectos = [
      {name: 'Proyecto 1', code: 'Proyecto 1'},
      {name: 'Proyecto 2', code: 'Proyecto 2'}
    ]
  }

  updateOptions(event: any) {
    this.showCalendar = false;
    if(event.value.name === 'Equipos') {
      this.opciones = [
        {name: 'Equipo 1', code: 'Equipo 1'},
        {name: 'Equipo 2', code: 'Equipo 2'}
      ];
    } else {
      this.opciones = [
        {name: 'Ensayo', code: 'Ensayo'},
        {name: 'Pruebas', code: 'Pruebas'}
      ];
    }
  }

  updateOptionsTwo(event: any) {
    switch(event.value.name) {
      case 'Equipo 1':
        this.selectedOption = 'Equipo1';
        this.showCalendar = true;
        this.arrayObjt = [
          {
            title: 'Uso equipo 1 proyecto 1',
            date: new Date()
          }
        ];
        this.setEvents(this.arrayObjt);
        break;
      case 'Equipo 2':
        this.selectedOption = 'Equipo2';
        this.showCalendar = true;
        this.arrayObjt = [];
        this.setEvents(this.arrayObjt);
        break;
      case 'Ensayo':
        this.selectedOption = 'Ensayo';
        this.showCalendar = true;
        this.arrayObjt = [
          {
            title: 'Ensayo 1 proyecto 1',
            date: new Date('2024-02-01T05:30:00')
          }
        ];
        this.setEvents(this.arrayObjt);
        break;
      case 'Pruebas':
        this.selectedOption = 'Pruebas';
        this.showCalendar = true;
        this.arrayObjt = [];
        this.setEvents(this.arrayObjt);
        break;
      default:
        break;
    }
  }

  setEvents(array: any) {
    this.eventos = array;
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
      eventsSet: this.handleEvents.bind(this)
    };
  }

  handleEventClick(clickInfo: EventClickArg) {
    Swal.fire({
      title: `${clickInfo.event.title}`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ir a la cita'
    }).then((result) => {
      if (result.isConfirmed) {
        
      }
    })
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  agregar() {
    const objt = [
      {
        title: this.description,
        date: this.date
      }
    ]
    this.eventos.push(objt);
    this.setEvents(this.eventos);
  }

  

  navigateTo() {
    this.router.navigate(['/dashboard']);
  }

  customEventContent = (arg: { event: EventApi }) => {
    return { html: `<div class='evento'>${arg.event.title}</div>` }; // Mostrar solo el nombre del evento
  }

}
