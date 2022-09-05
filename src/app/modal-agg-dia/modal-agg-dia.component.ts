import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, Platform } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource,Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';




const IMAGE_DIR = 'stored-imges';
interface LocalFile{
  nombre: string;
  path: string;
  data: string;
}

@Component({
  selector: 'app-modal-agg-dia',
  templateUrl: './modal-agg-dia.component.html',
  styleUrls: ['./modal-agg-dia.component.scss'],
})


export class ModalAggDiaComponent implements OnInit {
  imagenes: LocalFile[]=[];

  constructor(private modal: ModalController, private plataforma: Platform, private cargandoCtrl: LoadingController) { }

  cerrarM(){
    this.modal.dismiss();
  }

  async ngOnInit(){
    this.cargararchivo();
  }

  async cargararchivo(){
    this.imagenes= [];
    const cargando = await this.cargandoCtrl.create({
      message: 'Cargando  imagen...',
    });
    await cargando.present();

    Filesystem.readdir({
      directory: Directory.Data,
      path: IMAGE_DIR
    }).then(result => {
      console.log('Aqui: ', result);
      this.cargarDatos(result.files);
    }, async error => {
      console.log('error: ', error);
      await Filesystem.mkdir({
        directory:Directory.Data,
        path: IMAGE_DIR
      });
    }).then(_ =>{
      cargando.dismiss();
    });

  }

  async cargarDatos(nombreArchivo: string[]){
    for(const f of nombreArchivo)
    {
      const archivoPath = `${IMAGE_DIR}/${f}`;
      const leerArchivo = await Filesystem.readFile({
        directory: Directory.Data,
        path: archivoPath
      });

      this.imagenes.push({
        nombre: f,
        path: archivoPath,
        data: `data: imagen/jpe; mibase64,${leerArchivo.data}`
      });

    }

  }



  async seleccionarImg(){
    const imagen = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });

    if(imagen){
      this.guardarImg(imagen);

    }

  }

  async guardarImg(img: Photo){
    const mibase64 = '';
    const archivo = new Date().getTime() + '.jpeg';
    const guardaraArchivo =await Filesystem.writeFile({
      directory: Directory.Data,
      path: `${IMAGE_DIR}/${archivo}`,
      data: mibase64
    });
    this.cargararchivo();
  }

 async leebase(img: Photo){
    if(this.plataforma.is('hybrid')){
      const archivo = await Filesystem.readFile({
        path: img.path
      });

      return archivo.data;

    }else{
      const resp = await fetch(img.webPath);
      const blob = await resp.blob();

      return await this.convertirBlob(blob) as string;
    }
  }

  convertirBlob =(blob: Blob) =>  new Promise((resolve, reject)=>{
    const lectura = new FileReader();
    lectura.onerror = reject;
    lectura.onload = () =>{
    resolve(lectura.result);
    };

    lectura.readAsDataURL(blob);
  });

  startUpload(){

  }

  deletImage(){

  }


}
