import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CalendarOptions } from '@fullcalendar/common';
import { environment } from 'src/environments/environment';
import { Programme } from '../Entity/programme';
import { ProgrammeService } from '../service/programme.service';


@Component({
  selector: 'app-programme',
  templateUrl: './programme.component.html',
  styleUrls: ['./programme.component.css'],
})
export class ProgrammeComponent implements OnInit {

  @ViewChild('closebutton') closebutton;
  updateimage;
  readonly host = environment.baseurl;
  programme = new Programme();
  programmeupdate = new Programme();
  categories = ['Interviews', 'Tournée', "Fonds d'archives", 'Plaidoyer'];
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  changed = false;
  eventToHold: any;
  public edit: boolean;
  Events = [];
  calendarOptions: CalendarOptions;
  displayEvent: any;
  isProgramDetails: boolean = false;
  isCategory: boolean = false;
  newProgram: boolean = false;
  isProgram: boolean = false;
  viewEvent: boolean = false;
  viewAllEvents: boolean = false;
  editProgram: boolean = false;

  // cat: any;
  // cats: any[];
  // prog: Programme;
  // progs: Programme[];
  // finalProgs: Map<string, Programme[]>;
  // imageSrc: any;
  // public id: string;
  // public name: string;  
  // public title: string;
  // public titlear: string;
  // public adresse: string;
  // public adressear: string;
  // public data: string;
  // public date: string;
  // public idCateg: string;
  // programmeforupdate = new Programme();
  // category: string;
  // selectedFiles: FileList;
  // progressInfos = [];
  // fileToUpload: any;
  // imageUrl: any;
  // imageSource;
  // idProgram: string;
  // url: string;
  // photoUrl;
  // photoVideoURl: SafeResourceUrl;
  // legende: string;
  // titre: string;
  // listVideos: Array<any> = [];
  // p;
  // editPhoto: boolean;

  constructor(
    private http: HttpClient,
    private programService: ProgrammeService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.AfficherProgramme();
    
  }

  newProgramForm() {
    this.editProgram = false;
    this.isProgram = true;
    this.isCategory = false;
    this.isProgramDetails = false;
    this.newProgram = true;
    this.edit = false;
  }

  addProgram() {
    this.programme.data = this.cardImageBase64;
    this.programme.admin = 1;
    this.programService.addprogramme(this.programme);
    this.closebutton.nativeElement.click();
    setTimeout(() => {
      location.reload();
    }, 500);
    }

  AfficherProgramme() {
    this.programService.getallprogramme().subscribe((data) => {
      for (var prog of data) {

        let charArray: string[] = prog.date.split('/');
        console.log(charArray);
        let reverseArray: string[] = charArray.reverse();
        console.log(reverseArray);
        let reversedArray: string = reverseArray.join('-');     
           console.log(reversedArray);
        let thirdDate = new Date(reversedArray);
        
        this.Events.push({
          title: prog.title,
          date: thirdDate,
          adresse: prog.adresse,
          adressear: prog.adressear,
          category: prog.categorie,
          idProg: prog.id,
          eventDate: thirdDate,
          data: prog.data,
          description: prog.description,
          descriptionar: prog.descriptionar,
        });
      }
      this.afficherCalendar(this.Events);
    });


  }

  afficherCalendar(events: any[]) {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,listWeek',
      },
      dayMaxEvents: true,
      events: events,
      editable: false,
      eventClick: this.handleEventClick.bind(this),
      customButtons: {
        myCustomButton: {
          text: 'custom!',
          click: function () {
            alert('clicked the custom button!');
          },
        },
      },
      selectable: true,
    };
  }

  // update(param) {
  //   this.editPhoto = false;
  //   this.editProgram = false;
  //   this.isProgram = false;
  //   this.isCategory = true;
  //   this.isProgramDetails = false;
  //   console.log(param);
  //   this.edit = true;
  //   setTimeout(() => {
  //     this.id = param.id;
  //     this.name = param.name;
  //   }, 500);
  // }

  // initforupdate(param) {
  //   this.programme.admin = 1;
  //   this.programme.date = param.extendedProps.eventDate;
  //   this.programme.adresse = param.extendedProps.adresse;
  //   this.programme.adressear = param.extendedProps.adressear;
  //   this.programme.title = param.title;
  //   this.programme.titlear = param.titlear;
  //   this.programme.categorie = param.extendedProps.category;
  //   this.programme.description = param.extendedProps.description;
  //   this.programme.descriptionar = param.extendedProps.descriptionar;
  //   this.programme.data = param.extendedProps.data;
  //   this.programme.id = param.extendedProps.idProg;
  // }



  updateProgramme(param) {
  console.warn(param.extendedProps.idProg);
  this.programService.getonebyid(param.extendedProps.idProg).subscribe((data)=>{
  console.log(data);
  this.programmeupdate =data;
  this.programmeupdate.date =
      this.programmeupdate.date.substr(6, 4) +
      '-' +
      this.programmeupdate.date.substr(3, 2) +
      '-' +
      this.programmeupdate.date.substr(0, 2);
      console.warn(this.programmeupdate.date);
      this.http.get(this.host + '/programme/get/'+this.programmeupdate.id+'/full.jpg').subscribe((data)=>{this.updateimage=data;
      });
  });
  
  }

  updateprogramme() {
    if (this.cardImageBase64 == undefined) {
      this.programmeupdate.data=this.updateimage;
    }else{
      this.programmeupdate.data = this.cardImageBase64;
    }
    this.programService.updateprogramme(this.programmeupdate).subscribe((data) => {
      console.log(data);
      setTimeout(function () {
        location.reload();
      }, 1000);
    });
    
  }


  deleteProgramme(param) {
    this.programService.deleteprogramme(param['extendedProps']['idProg'])
    setTimeout(() => {},500);
  }


  handleEventClick(arg) {
    this.eventToHold = arg;
    this.editProgram = false;
    this.viewEvent = true;
    this.isProgram = true;
    this.newProgram = false;
    this.isCategory = false;
    this.isProgramDetails = true;
    console.log(arg.event._def);
    this.displayEvent = arg.event._def;
  }

  retour() {
    this.viewEvent = false;
  }

  returnToProgram() {
    this.viewAllEvents = false;
    this.viewEvent = false;
  }

  fileChangeEvent(fileInput: any) {
    this.changed = true;
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];
          console.log(img_height, img_width);
          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
          }
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }






}
