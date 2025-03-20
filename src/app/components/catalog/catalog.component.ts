import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { CatalogService } from '../../services/catalog.service'; // Asegúrate de que la ruta sea correcta


@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export default class CatalogComponent implements OnInit {

  servicios: any[] = [];

  constructor(
    private CartService: CartService,
    private router: Router,
    private catalogService: CatalogService  // Asegúrate de inyectar el servicio CatalogService
  ) {}

  ngOnInit(): void {
    // Cargar servicios del catalogService
    this.servicios = this.catalogService.getServicios(); // Usar this.catalogService
  }


  showMessage: boolean = false;  // Declara la propiedad aquí
  showMesage: boolean = false;
  cartItemCount: number = 0;  // Propiedad para almacenar la cantidad de artículos en el carrito
  
  cartCount: number = 0;

  addItemToCart() {
    this.cartCount++;
  }

  getCartCount() {
    return this.cartCount;
  }
  
  
  
  brands = [
    'Acura', 'Alfa Romeo', 'Aston Martin', 'Aprilia', 'Audi', 'BAIC', 'Bajaj', 
    'Benelli', 'Bentley', 'BMW', 'BMW M', 'BMW Motorrad', 'Bugatti', 'Buick', 
    'Cadillac', 'Chevrolet', 'Chery', 'Citroën', 'Dacia', 'Dongfeng', 'Dodge', 
    'Ferrari', 'Fiat', 'Ford', 'Foton', 'Genesis', 'Geely', 'Great Wall', 'Harley-Davidson', 
    'Honda', 'Honda Motos', 'Hummer', 'Hyundai', 'Indian', 'Infiniti', 'Isuzu', 'Jaguar', 
    'JAC', 'Jeep', 'Kawasaki', 'Kia', 'Koenigsegg', 'KTM', 'Land Rover', 'Lamborghini', 
    'Lancia', 'Lexus', 'Lincoln', 'Lucid', 'Maserati', 'Mazda', 'McLaren', 'Mercedes-Benz', 
    'Mini', 'Mitsubishi', 'Motomel', 'Nissan', 'Opel', 'Pagani', 'Peugeot', 'Piaggio', 
    'Polaris', 'Porsche', 'Ram', 'Renault', 'Rimac', 'Rolls-Royce', 'Royal Enfield', 
    'Seat', 'Skoda', 'Subaru', 'Suzuki', 'Suzuki Motos', 'Tesla', 'Tata Motors', 'Toyota', 
    'Triumph', 'TVS', 'Volkswagen', 'Volvo', 'Wuling', 'Yamaha', 'Zero Motorcycles', 
    'Zotye'
  ];
  

  models: { [key: string]: string[] } = {
    'Acura': ['ILX', 'MDX', 'RDX', 'TLX'],
  'Alfa Romeo': ['Giulia', 'Stelvio', 'Tonale'],
  'Aston Martin': ['DB11', 'DBX', 'Vantage'],
  'Audi': ['A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q2', 'Q3', 'Q5', 'Q7', 'Q8', 'RS6', 'RS7', 'RS Q8', 'TT'],
  'Bentley': ['Bentayga', 'Continental GT', 'Flying Spur'],
  'BMW': ['1 Series', '2 Series', '3 Series', '4 Series', '5 Series', '6 Series', '7 Series', '8 Series', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'Z4', 'M2', 'M3', 'M4', 'M5', 'M8'],
  'Bugatti': ['Chiron', 'Divo', 'Veyron'],
  'Buick': ['Enclave', 'Encore', 'Envision', 'LaCrosse', 'Regal', 'Verano'],
  'Cadillac': ['CT4', 'CT5', 'CT6', 'Escalade', 'XT4', 'XT5', 'XT6'],
  'Chevrolet': ['Blazer', 'Bolt', 'Camaro', 'Colorado', 'Corvette', 'Equinox', 'Malibu', 'Silverado', 'Suburban', 'Tahoe', 'Traverse', 'Trax'],
  'Chrysler': ['200', '300', 'Pacifica', 'Voyager'],
  'Citroën': ['Berlingo', 'C3', 'C3 Aircross', 'C4', 'C4 Cactus', 'C5 Aircross'],
  'Dacia': ['Duster', 'Logan', 'Sandero', 'Stepway'],
  'Dodge': ['Challenger', 'Charger', 'Durango', 'Journey'],
  'Ferrari': ['488', '812 Superfast', 'F8 Tributo', 'GTC4Lusso', 'Portofino', 'Roma', 'SF90 Stradale'],
  'Fiat': ['500', '500L', '500X', 'Argo', 'Cronos', 'Panda', 'Strada', 'Tipo'],
  'Ford': ['Bronco','Raptor', 'EcoSport', 'Edge', 'Escape', 'Expedition', 'Explorer', 'F-150', 'Mustang', 'Ranger'],
  'Genesis': ['G70', 'G80', 'G90'],
  'GMC': ['Acadia', 'Canyon', 'Sierra', 'Terrain', 'Yukon'],
  'Great Wall': ['H6', 'Poer', 'Wingle 7'],
  'Haval': ['H2', 'H6', 'Jolion'],
  'Honda': ['Accord', 'Civic', 'City', 'CR-V', 'Fit', 'HR-V', 'Odyssey', 'Pilot', 'Ridgeline'],
  'Hummer': ['H1', 'H2', 'H3'],
  'Hyundai': ['Accent', 'Creta', 'Elantra', 'Kona', 'Palisade', 'Santa Fe', 'Sonata', 'Tucson', 'Venue'],
  'Infiniti': ['Q50', 'Q60', 'QX50', 'QX60', 'QX80'],
  'Isuzu': ['D-Max', 'MU-X'],
  'Jaguar': ['E-Pace', 'F-Pace', 'F-Type', 'I-Pace', 'XE', 'XF', 'XJ'],
  'Jeep': ['Cherokee', 'Compass', 'Gladiator', 'Grand Cherokee', 'Renegade', 'Wrangler'],
  'Kia': ['Carnival', 'Cerato', 'Forte', 'K5', 'Optima', 'Rio', 'Seltos', 'Sorento', 'Soul', 'Sportage', 'Stinger', 'Telluride'],
  'Land Rover': ['Defender', 'Discovery', 'Range Rover', 'Range Rover Evoque', 'Range Rover Sport', 'Range Rover Velar'],
  'Lamborghini': ['Aventador', 'Huracán', 'Urus'],
  'Lancia': ['Delta', 'Thema', 'Ypsilon'],
  'Lexus': ['ES', 'GS', 'GX', 'IS', 'LC', 'LS', 'LX', 'NX', 'RC', 'RX', 'UX'],
  'Lincoln': ['Aviator', 'Corsair', 'Navigator', 'Nautilus'],
  'Maserati': ['Ghibli', 'Levante', 'Quattroporte'],
  'Mazda': ['2', '3', '6', 'CX-3', 'CX-30', 'CX-5', 'CX-9', 'MX-5'],
  'Mercedes-Benz': ['A-Class', 'C-Class', 'CLA', 'CLS', 'E-Class', 'G-Class', 'GLA', 'GLB', 'GLC', 'GLE', 'GLS', 'S-Class', 'SL', 'SLC'],
  'Mini': ['Clubman', 'Cooper', 'Countryman'],
  'Mitsubishi': ['ASX', 'Eclipse Cross', 'L200', 'Mirage', 'Montero', 'Outlander', 'Pajero Sport'],
  'Nissan': ['Almera', 'Armada', 'Frontier', 'Kicks', 'March', 'Maxima', 'Murano', 'Navara', 'Pathfinder', 'Patrol', 'Qashqai', 'Rogue', 'Sentra', 'Sunny', 'Versa', 'X-Trail'],
  'Opel': ['Astra', 'Corsa', 'Grandland X', 'Insignia', 'Mokka', 'Zafira'],
  'Peugeot': ['2008', '208', '3008', '308', '5008', '508'],
  'Porsche': ['911', 'Boxster', 'Cayenne', 'Cayman', 'Macan', 'Panamera', 'Taycan'],
  'Ram': ['1500', '2500', '3500', 'ProMaster'],
  'Renault': ['Captur', 'Clio', 'Duster', 'Kangoo', 'Kwid', 'Logan', 'Megane', 'Oroch', 'Sandero', 'Stepway'],
  'Rolls-Royce': ['Cullinan', 'Ghost', 'Phantom', 'Wraith'],
  'Seat': ['Ateca', 'Ibiza', 'Leon', 'Tarraco'],
  'Skoda': ['Fabia', 'Karoq', 'Kodiaq', 'Octavia', 'Superb'],
  'Subaru': ['BRZ', 'Crosstrek', 'Forester', 'Impreza', 'Legacy', 'Outback', 'WRX'],
  'Suzuki': ['Alto', 'Baleno', 'Celerio', 'Ciaz', 'Ertiga', 'Swift', 'Vitara', 'Wagon R'],
  'Tesla': ['Model 3', 'Model S', 'Model X', 'Model Y'],
  'Toyota': ['4Runner', 'Avanza', 'Camry', 'Corolla', 'Fortuner', 'Highlander', 'Hilux', 'Land Cruiser', 'Land Cruiser Prado', 'Prius', 'RAV4', 'Rush', 'Tacoma', 'Tundra', 'Yaris'],
  'Volkswagen': ['Arteon', 'Atlas', 'Beetle', 'CC', 'Golf', 'Jetta', 'Passat', 'Polo', 'Tiguan', 'Touareg'],
  'Volvo': ['XC40', 'XC60', 'XC90', 'S60', 'S90', 'V60', 'V90'],
  'Polaris': ['RZR', 'Sportsman', 'Slingshot', 'General'],
  'Indian': ['Scout', 'Chief', 'Chieftain', 'Roadmaster'],
  'Zero Motorcycles': ['SR/F', 'FX', 'DSR', 'S'],
  'Rivian': ['R1T', 'R1S'],
  'Lucid': ['Air'],
  'Rimac': ['Nevera'],
  'Koenigsegg': ['Agera', 'Jesko', 'Regera'],
  'Pininfarina': ['Battista'],
  'Pagani': ['Huayra'],
  'McLaren': ['720S', '765LT', 'Artura'],
  'BYD': ['Tang', 'Song', 'Qin'],
  'Wuling': ['Hong Guang', 'Mini EV'],
  'Chery': ['Tiggo', 'Arrizo'],
  'Geely': ['Emgrand', 'Geometry'],
  'Dongfeng': ['T5', 'MX5'],
  'Zotye': ['T600'],
  'BAIC': ['BJ40', 'Senova'],
  'Foton': ['Tunland'],
  'JAC': ['T6', 'S2'],
  'Tata Motors': ['Tigor', 'Nexon'],
  'Mahindra': ['Thar', 'XUV700']
  };

  services = [
    { name: 'Lavado Exterior', price: 1120, description: 'Limpieza completa del exterior del vehículo.', image: './assets/img/exterior (1).webp' },
    { name: 'Lavado Interior', price: 1400, description: 'Limpieza profunda del interior del vehículo, incluyendo alfombrillas y asientos.', image: './assets/img/llimpiezainterior.webp' },
    { name: 'Lavado Completo', price: 2200, description: 'Limpieza completa tanto del exterior como del interior del vehículo.', image: './assets/img/exterior (1).webp' },
    { name: 'Lavado Premium', price: 4600, description: 'Lavado exterior, interior y pulido de pintura con protección de cera.', image: './assets/img/premium.webp' },
    { name: 'Lavado Ecológico', price: 1120, description: 'Lavado del vehículo utilizando productos ecológicos y técnicas de bajo consumo de agua.', image: './assets/img/exterior (1).webp' },
    { name: 'Cambio de Aceite', price: 1400, description: 'Cambio de aceite y revisión de niveles del motor y otros fluidos.', image: './assets/img/llimpiezainterior.webp' },
    { name: 'Inspección de Frenos', price: 4600, description: 'Revisión y mantenimiento de los frenos para asegurar su funcionamiento óptimo.', image: './assets/img/premium.webp' },
    { name: 'Revisión de Batería', price: 1120, description: 'Revisión de la batería para asegurarse de que esté en buen estado.', image: './assets/img/exterior (1).webp' },
    { name: 'Protección de Pintura', price: 2500, description: 'Aplicación de ceras y selladores para proteger la pintura del vehículo de agentes externos.', image: './assets/img/llimpiezainterior.webp' },
    { name: 'Alineación', price: 4600, description: 'Alineación de las ruedas para asegurar el desgaste uniforme de los neumáticos y un manejo seguro.', image: './assets/img/premium.webp' },
    { name: 'Restauración de Faros', price: 1800, description: 'Restauración de faros opacos o amarillentos para mejorar la visibilidad y estética del vehículo.', image: './assets/img/premium.webp' },
    { name: 'Revisión de Neumáticos', price: 1800, description: 'Revisión y cambio de neumáticos según el desgaste o daño para garantizar la seguridad del vehículo.', image: './assets/img/premium.webp' }
]

employees = [
  { 
    persona: 'Guillermo Hdez', 
    servicio: 'Lavado Sencillo precio', 
    comentario: 'TENGO UNA BIBLIA ARMADA HASTA LOS DIENTES PARA PODER DEFENDERME DEL ENEMIGO', 
    encargado: 'PERRITO VERDE' 
  },
  { 
    persona: 'Carlos Méndez', 
    servicio: 'Lavado Interior', 
    comentario: 'ME GUSTA DEJAR TODO EN PERFECTO ESTADO', 
    encargado: 'LALO EL RÁPIDO' 
  },
  { 
    persona: 'Ana Gómez', 
    servicio: 'Lavado Completo', 
    comentario: 'ME ENCANTA LA CALIDAD EN EL SERVICIO', 
    encargado: 'JUAN EL EXPERTO' 
  },
  { 
    persona: 'Pedro Sánchez', 
    servicio: 'Lavado Premium', 
    comentario: 'SIEMPRE CUIDO CADA DETALLE DEL VEHÍCULO', 
    encargado: 'FERNANDO EL RÁPIDO' 
  },
  { 
    persona: 'Marta Díaz', 
    servicio: 'Revisión de Neumáticos', 
    comentario: 'LA SEGURIDAD ES LO MÁS IMPORTANTE PARA MÍ', 
    encargado: 'MARIO EL EXPERTO' 
  }
];


// Variables para los select
selectedBrand = '';
selectedModel = '';
selectedEmployee = '';  // Variable independiente para el empleado



addToCart(service: any) {
  if (this.selectedBrand && this.selectedModel && this.selectedEmployee) {
    const item = {
      service: service,
      brand: this.selectedBrand,
      model: this.selectedModel,
      employee: this.selectedEmployee, // Agrega la información del empleado
    };
    this.CartService.addToCart(item);
    this.cartItemCount = this.CartService.getCartItemCount();
    this.showMessage = true;
    setTimeout(() => this.showMessage = false, 3000);
  } else {
    alert('Por favor selecciona una marca, modelo y empleado.');
  }
}


}