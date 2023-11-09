import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Subscription, interval } from 'rxjs';

interface EconomyData {
  dolar: { date: string; value: number };
  uf: { date: string; value: number };
  euro: { date: string; value: number };
  utm: { date: string; value: number };
  ipc: { date: string; value: number };
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {

  dataEconomy: EconomyData | undefined;
  isLoading = true;
  private dataUpdateSubscription!: Subscription;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Realizar la primera consulta al iniciar la aplicación
    this.fillDataEconomy();

    // Configurar un temporizador para realizar consultas cada 24 horas (86400 segundos)
    const dailyTimer = interval(86400 * 1000);
    this.dataUpdateSubscription = dailyTimer.subscribe(() => {
      this.fillDataEconomy();
    });
  }

  fillDataEconomy() {
    this.isLoading = true;
    this.apiService.getDataEconomy().subscribe(
      (data: any) => {
        console.log('Datos del API', data);
        this.dataEconomy = data.data;
        this.isLoading = false;
      },
      (error: any) => {
        this.isLoading = false;
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