import {Component} from '@angular/core';
import {ZXingScannerModule} from '@zxing/ngx-scanner';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DropdownChangeEvent, DropdownModule} from 'primeng/dropdown';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {MessageModule} from 'primeng/message';
import {BarcodeFormat} from '@zxing/library';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from "primeng/button";
import {StyleClassModule} from "primeng/styleclass";
import {Produto} from "../../Models/product.model";

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
    ButtonModule,
    StyleClassModule
  ],
  templateUrl: './qr-code-scanner.component.html',
  styleUrls: ['./qr-code-scanner.component.scss'],
  providers: [],
})
export class QrCodeScannerComponent{
  availableDevices: MediaDeviceInfo[] = [];
  currentDevice: MediaDeviceInfo | undefined;
  hasDevices: boolean | undefined;
  hasPermission: boolean | undefined;
  deviceSelected!: string;

  formatsEnabled: BarcodeFormat[] = [BarcodeFormat.QR_CODE];

  dadosProduto!: Produto;
  displayModal: boolean = false;

  overlay: boolean = true;

  constructor(private messageService: MessageService) {}

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
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
    // console.log('Resultado do QR code:', result);
    if (result.startsWith('LINK - ')) {
      const link = result.substring('LINK - '.length);
      this.handleLink(link);
    } else if (result.startsWith('Nome - ')) {
      const formattedData = result;
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
    this.dadosProduto = this.converterParaProduto(data)
    console.log("NOME DO PRODUTO" ,this.dadosProduto.nome);
    this.displayModal = true;
  }

  converterParaProduto(dados: string): Produto {
    const linhas = dados.split('\n'); // Dividir as linhas do texto
    const produto: Partial<Produto> = {
      tags: [],
      categorias: []
    }; // Partial para permitir campos opcionais até o objeto estar completo

    linhas.forEach((linha) => {
      const [chave, valor] = linha.split(' - '); // Separar chave e valor
      if (chave && valor) {
        const chaveLimpa = chave.trim();
        const valorLimpo = valor.trim();

        // Mapear as chaves para a interface Produto
        switch (chaveLimpa) {
          case 'Nome':
            produto.nome = valorLimpo;
            break;
          case 'Ingredientes':
            produto.ingredientes = valorLimpo;
            break;
          case 'Descrição':
            produto.descricao = valorLimpo;
            break;
          case 'Marca':
            produto.marca = valorLimpo;
            break;
          case 'Peso':
            const [peso, unidade] = valorLimpo.split(' ');
            produto.peso = parseFloat(peso);
            produto.unidadeMedida = unidade;
            break;
          case 'Preço':
            produto.preco = parseFloat(valorLimpo);
            break;
          case 'País de Origem':
            produto.paisOrigem = valorLimpo;
            break;
          case 'Categorias':
            produto.categorias = valorLimpo.split(',').map((categoria) => categoria.trim());
            break;
          case 'Validade':
            produto.validade = new Date(valorLimpo);
            break;
          case 'Data de Fabricação':
            produto.dataFabricacao = new Date(valorLimpo);
            break;
          case 'Lote':
            produto.lote = valorLimpo;
            break;
          case 'Tags':
            produto.tags = valorLimpo.split(',').map((tag) => tag.trim());
            break;
          default:
            // Caso haja alguma chave desconhecida
            console.warn(`Chave não reconhecida: ${chaveLimpa}`);
        }
      }
    });

    return produto as Produto; // Garantimos que o objeto agora seja do tipo Produto
  }

  clickOverlay() {
    const div = document.getElementsByClassName('scanner-overlay')[0];
    if (div) {
      div.classList.add('slide-up');
      setTimeout(() => {
        this.overlay = false;
      }, 1000); // Tempo da animação
      setTimeout(() => {
        this.overlay = true;
        div.classList.remove('slide-up');
      }, 20000);
    }
  }
}
