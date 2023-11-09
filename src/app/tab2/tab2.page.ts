import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy {

  dataCryptos: any;
  isLoading = true;
  private dataUpdateSubscription!: Subscription;

  constructor(private apiService: ApiService ) {}

  ngOnInit(): void {
    // Realizar la primera consulta al iniciar la aplicación
    this.fillDataCryptos();

    // Configurar un temporizador para realizar consultas cada 24 horas (86400 segundos)
    const dailyTimer = interval(86400 * 1000);
    this.dataUpdateSubscription = dailyTimer.subscribe(() => {
      this.fillDataCryptos();
    });
  }
  // getDataEarthquakesRecent
  fillDataCryptos() {
    this.isLoading = true; // Activa el indicador de carga
    this.apiService.getDataCryptos().subscribe(
      (data: any) => {
        console.log('Datos del API', data);
        this.dataCryptos = data;
        this.isLoading = false; // Desactiva el indicador de carga cuando se completan los datos
      },
      (error: any) => {
        this.isLoading = false; // Desactiva el indicador de carga en caso de error
        console.error('Error al obtener datos de la API', error);
      }
    );
  }

  ngOnDestroy() {
    // Asegúrate de cancelar la suscripción al destruir el componente
    if (this.dataUpdateSubscription) {
      this.dataUpdateSubscription.unsubscribe();
    }
  }

}
