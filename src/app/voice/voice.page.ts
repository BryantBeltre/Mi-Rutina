/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VoiceRecorder, VoiceRecorderPlugin, GenericResponse, CurrentRecordingStatus, Base64String } from 'capacitor-voice-recorder';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { GestureController } from '@ionic/angular';
import {Haptics, ImpactStyle} from '@capacitor/haptics';

interface grabando{
  value: {
    recordDataBase64: Base64String;
    msDuration: number;
    mimeType: string;
  };
}

@Component({
  selector: 'app-voice',
  templateUrl: './voice.page.html',
  styleUrls: ['./voice.page.scss'],
})
export class VoicePage implements OnInit, AfterViewInit {

  recording= false;
  archivograbado= [];
  duracionDisplay = '';
  duracion= 0;
  @ViewChild('recordbtn',{read:ElementRef}) recordbtn: ElementRef;
  constructor(private gesture: GestureController) { }

  ngOnInit() {
    this.cargarAudio();
    VoiceRecorder.requestAudioRecordingPermission();
  }

  ngAfterViewInit() {
    const longpress = this.gesture.create({
      el: this.recordbtn.nativeElement,
      threshold: 0,
      gestureName: 'long-press',
      onStart: eve => {
        Haptics.impact({style: ImpactStyle.Light});
        this.grabar();
      },
      onEnd: eve => {
        Haptics.impact({style: ImpactStyle.Light});
        this.detener();
      }
    },true);
    longpress.enable();
  }

  CalcularDuracion(){
    if(!this.recording){
      this.duracion=0;
      this.duracionDisplay = '';
      return;
    }
    this.duracion +=1;

    const minutes = Math.floor(this.duracion / 60);
    const seconds = (this.duracion % 60).toString().padStart(2, '0');
    this.duracionDisplay = `${minutes}:${seconds}`;

    setTimeout(() =>{
      this.CalcularDuracion();
    },1000);
  }

  async cargarAudio(){
    Filesystem.readdir({
      path: '',
      directory: Directory.Data
    }).then(result =>{
      console.log(result);
      this.archivograbado= result.files;
    });
  }

  grabar(){
    if(this.recording){
      return;
    }
    this.recording = true;
    VoiceRecorder.startRecording();
  }

  detener(){
    if(!this.recording){
      return;
    }
    VoiceRecorder.stopRecording().then(async (result: grabando)=>{
      this.recording = false;
      if (result.value && result.value.recordDataBase64){
        const grabardata= result.value.recordDataBase64;
        console.log('una nota cabrona', grabardata);
        const namefile = new Date().getTime() + '.wav';
        await Filesystem.writeFile({
          path: namefile,
          directory: Directory.Data,
          data: grabardata
        });
        this.cargarAudio();
      };
    });
  }

  async reproducir(namefile){
    const audioFile = await Filesystem.readFile({
      path: namefile,
      directory: Directory.Data
    });
    console.log('ey you', audioFile);
    const base64Sound = audioFile.data;

    const audioRef = new Audio(`data:audio/acc;base64,${base64Sound}`);
    audioRef.oncanplaythrough = () => audioRef.play();
    audioRef.load();
  }

  async eliminarAudio(nameFile){
    await Filesystem.deleteFile({
      directory: Directory.Data,
      path: nameFile
    });
    this.cargarAudio();
  }

}
