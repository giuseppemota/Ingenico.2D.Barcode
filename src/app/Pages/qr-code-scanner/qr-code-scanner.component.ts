import {Component, OnInit} from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { BarcodeFormat } from '@zxing/library';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-qr-code-scanner',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ZXingScannerModule,
    DropdownModule,
    ToastModule,
    MessageModule,
    DialogModule,
  ],
  templateUrl: './qr-code-scanner.component.html',
  styleUrls: ['./qr-code-scanner.component.scss'],
  providers: [],
})
export class QrCodeScannerComponent implements OnInit{
  availableDevices: MediaDeviceInfo[] = [];
  currentDevice: MediaDeviceInfo | undefined;
  hasDevices: boolean | undefined;
  hasPermission: boolean | undefined;
  deviceSelected!: string;

  formatsEnabled: BarcodeFormat[] = [BarcodeFormat.QR_CODE];

  dadosProduto!: any
  displayModal: boolean = false;

  timeout : any;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.startTimer();
  }

  startTimer() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.aplicarBlur(), 5000);
  }

  aplicarBlur(){
    const camera = document.querySelector('.camera-container');
    if(camera){
      camera.classList.add('blur');
    }
  }

  removerBlur() {
    const camera = document.querySelector('.camera-container');
    if(camera){
      camera.classList.remove('blur');
      this.startTimer();
    }
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
    console.log(this.hasDevices);
  }

  onDeviceSelectChange(event: DropdownChangeEvent) {
    const selectedDeviceId = event.value?.deviceId || ''; // Garante que 'event.value' é tratado corretamente

    // Atualiza o dispositivo atual
    if (selectedDeviceId) {
      const device = this.availableDevices.find(
        (device) => device.deviceId === selectedDeviceId
      );
      if (device) {
        this.deviceSelected = device.deviceId;
        this.currentDevice = device; // Atualiza a câmera no scanner
      } else {
        this.deviceSelected = '';
        this.currentDevice = undefined; // Se limpar, remove a câmera
      }
    } else {
      // Se limpar a seleção, definimos o dispositivo como undefined
      this.deviceSelected = '';
      this.currentDevice = undefined;
    }
  }

  onDeviceChange(device: MediaDeviceInfo) {
    const selectedStr = device?.deviceId || '';
    if (this.deviceSelected === selectedStr) {
      return;
    }
    this.deviceSelected = selectedStr;
    this.currentDevice = device || undefined;
  }

  onHasPermission(has: boolean): void {
    this.hasPermission = has;
  }

  onCodeResult(result: string) {
    if (result.startsWith('LINK - ')) {
      const link = result.substring('LINK - '.length);
      this.handleLink(link);
    } else if (result.startsWith('DADOS:')) {
      const formattedData = result.substring('DADOS:'.length);
      this.handleFormattedData(formattedData);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'QR code não reconhecido',
      });
    }
  }

  handleLink(link: string): void {
    window.location.href = link;
  }

  handleFormattedData(data: string): void {
    this.dadosProduto = JSON.parse(data)
    this.displayModal = true;
  }
}
