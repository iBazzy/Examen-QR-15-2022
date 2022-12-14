import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./paginas/registrarse/registrarse.module').then( m => m.RegistrarsePageModule)
  },
  {
    path: 'estudiante',
    loadChildren: () => import('./inicio/estudiante/estudiante.module').then( m => m.EstudiantePageModule)
  },
  {
    path: 'profesor',
    loadChildren: () => import('./inicio/profesor/profesor.module').then( m => m.ProfesorPageModule)
  },
  {
    path: 'password',
    loadChildren: () => import('./paginas/passw/passw.module').then( m => m.PasswPageModule)
  },
  {
    path: 'asigRegistro/:idAsignatura',
    loadChildren: () => import('./inicio/profesor/asi-registro/asi-registro.module').then( m => m.AsiRegistroPageModule)
  }
  ,
  {
    path: 'qr',
    loadChildren: () => import('./inicio/qr/qr.module').then( m => m.QRPageModule)
  }
  ,
  {
    path: 'cambiar/:idAlumno',
    loadChildren: () => import('./paginas/cambiar/cambiar.module').then( m => m.CambiarPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
