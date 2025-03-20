import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminsidebarComponent } from '../adminsidebar/adminsidebar.component';
import { CatalogService } from '../../services/catalog.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-services',
  standalone: true,
  imports: [FormsModule, CommonModule, AdminsidebarComponent],
  templateUrl: './manage-services.component.html',
  styleUrls: ['./manage-services.component.css'],
})
export default class ManageServicesComponent implements OnInit {
  nuevoServicio = {
    titulo: '',
  descripcion: '',
  precio: 0,
  imagen: '',
  marca: '',  // Agregar estas propiedades
  modelo: '', 

  };
  servicios: any[] = [];
  servicioEditado: any = null; // Para almacenar el servicio que está siendo editado

  constructor(private catalogService: CatalogService) {}

  ngOnInit(): void {
    // Cargar servicios desde el catalogService (probablemente de localStorage)
    this.servicios = this.catalogService.getServicios();
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.nuevoServicio.imagen = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  guardarServicio(): void {
    if (this.servicioEditado) {
      // Si estamos editando, actualizamos el servicio
      this.catalogService.editarServicio(this.servicioEditado.id, { ...this.nuevoServicio });
      this.servicioEditado = null; // Limpiar después de la edición
    } else {
      // Si no estamos editando, agregamos un nuevo servicio
      this.catalogService.agregarServicio({ ...this.nuevoServicio });
    }
    this.servicios = this.catalogService.getServicios(); // Actualizar la lista de servicios
    this.nuevoServicio = { titulo: '', descripcion: '', precio: 0, imagen: '',marca: '',  modelo: '',  // Suponiendo que 'vehiculos' es un arreglo

    }; // Limpiar el formulario
  }
  
  editarServicio(servicio: any): void {
    // Cargar los datos del servicio en el formulario para editar
    this.servicioEditado = servicio;
    this.nuevoServicio = { ...servicio }; // Cargar los valores en el formulario
  }


  eliminarServicio(servicio: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás recuperar este servicio una vez eliminado.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '¡Sí, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        const index = this.servicios.indexOf(servicio);
        if (index > -1) {
          this.catalogService.eliminarServicio(index);
          this.servicios = this.catalogService.getServicios(); // Actualizar la lista de servicios
          Swal.fire(
            '¡Eliminado!',
            'El servicio ha sido eliminado.',
            'success'
          );
        }
      }
    });
  }
  
  

  
  brands = [
    'Acura', 'Aston Martin', 'Audi', 'Bentley', 'BMW', 'Bugatti', 
    'Buick', 'Cadillac', 'Chevrolet', 'Chrysler', 'Citroën', 
    'Dodge', 'Ferrari', 'Fiat', 'Ford', 'Genesis', 'GMC', 
    'Honda', 'Hummer', 'Hyundai', 'Infiniti', 'Isuzu', 'Jaguar', 
    'Jeep', 'Kia', 'Land Rover', 'Lamborghini', 'Lexus', 'Lincoln', 
    'Maserati', 'Mazda', 'Mercedes-Benz', 'Mini', 'Mitsubishi', 
    'Nissan', 'Opel', 'Peugeot', 'Porsche', 'Ram', 'Renault', 
    'Rolls-Royce', 'Seat', 'Skoda', 'Subaru', 'Suzuki', 'Tesla', 
    'Toyota', 'Volkswagen', 'Volvo'
  ];

  models: { [key: string]: string[] } = {
    'Toyota': ['Corolla', 'Camry', 'RAV4', 'Highlander', 'Prius', 'Land Cruiser', 'Tacoma', '4Runner', 'Tundra', 'C-HR'],
    'Honda': ['Civic', 'Accord', 'CR-V', 'Pilot', 'Fit', 'Odyssey', 'Ridgeline', 'HR-V', 'Passport'],
    'Ford': ['Focus', 'Fusion', 'Escape', 'Explorer', 'F-150', 'Mustang', 'Bronco', 'Edge', 'Maverick', 'Expedition'],
    'Chevrolet': ['Cruze', 'Malibu', 'Equinox', 'Silverado', 'Tahoe', 'Traverse', 'Blazer', 'Camaro', 'Suburban'],
    'Nissan': ['Altima', 'Sentra', 'Rogue', 'Murano', 'Versa', 'Maxima', 'Pathfinder', 'Armada', 'Frontier', '370Z'],
    'BMW': ['3 Series', '5 Series', 'X1', 'X3', 'X5', 'Z4', '7 Series', 'X7', 'M3', 'M5'],
    'Mercedes-Benz': ['C-Class', 'E-Class', 'GLC', 'GLE', 'S-Class', 'A-Class', 'GLA', 'G-Class', 'CLA', 'AMG GT'],
    'Audi': ['A3', 'A4', 'Q3', 'Q5', 'Q7', 'TT', 'A6', 'A8', 'e-tron', 'RS5'],
    'Hyundai': ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Kona', 'Accent', 'Palisade', 'Ioniq', 'Genesis G70'],
    'Kia': ['Forte', 'Optima', 'Sportage', 'Sorento', 'Seltos', 'Telluride', 'Soul', 'Carnival', 'Stinger'],
    'Volkswagen': ['Jetta', 'Passat', 'Tiguan', 'Atlas', 'Golf', 'Beetle', 'Arteon', 'ID.4', 'Taos'],
    'Mazda': ['Mazda3', 'Mazda6', 'CX-3', 'CX-5', 'CX-9', 'MX-5', 'CX-50', 'CX-90'],
    'Tesla': ['Model S', 'Model 3', 'Model X', 'Model Y', 'Cybertruck', 'Roadster'],
    'Subaru': ['Impreza', 'Legacy', 'Outback', 'Forester', 'Crosstrek', 'WRX', 'Ascent', 'BRZ'],
    'Jeep': ['Cherokee', 'Grand Cherokee', 'Wrangler', 'Renegade', 'Compass', 'Gladiator', 'Patriot', 'Commander'],
    'Lexus': ['ES', 'RX', 'NX', 'GX', 'LS', 'UX', 'LX', 'IS', 'RC'],
    'Porsche': ['911', 'Cayenne', 'Panamera', 'Macan', 'Taycan', 'Boxster', '718', 'Carrera GT'],
    'Dodge': ['Charger', 'Challenger', 'Durango', 'Journey', 'Viper', 'Grand Caravan'],
    'Ram': ['1500', '2500', '3500', 'ProMaster', 'Rebel', 'TRX'],
    'Chrysler': ['300', 'Pacifica', 'Voyager'],
    'Buick': ['Encore', 'Enclave', 'Envision', 'Regal', 'LaCrosse'],
    'GMC': ['Sierra', 'Canyon', 'Yukon', 'Acadia', 'Terrain'],
    'Land Rover': ['Range Rover', 'Defender', 'Discovery', 'Evoque', 'Velar'],
    'Jaguar': ['F-Pace', 'E-Pace', 'I-Pace', 'XF', 'XJ', 'F-Type'],
    'Volvo': ['S60', 'S90', 'XC40', 'XC60', 'XC90'],
    'Mini': ['Cooper', 'Clubman', 'Countryman', 'Paceman'],
    'Fiat': ['500', 'Panda', 'Tipo', '124 Spider'],
    'Alfa Romeo': ['Giulia', 'Stelvio', '4C'],
    'Mitsubishi': ['Outlander', 'Eclipse Cross', 'ASX', 'Lancer', 'Pajero'],
    'Peugeot': ['208', '308', '3008', '508', '2008', '5008'],
    'Renault': ['Clio', 'Captur', 'Megane', 'Kadjar', 'Twingo', 'Scenic'],
    'Citroën': ['C3', 'C4', 'C5 Aircross', 'Berlingo'],
    'Suzuki': ['Swift', 'Vitara', 'Jimny', 'S-Cross'],
    'Skoda': ['Octavia', 'Superb', 'Kodiaq', 'Kamiq'],
    'Opel': ['Astra', 'Corsa', 'Insignia', 'Mokka'],
    'Seat': ['Ibiza', 'Leon', 'Ateca', 'Arona', 'Tarraco'],
    'Isuzu': ['D-Max', 'MU-X'],
    'Hummer': ['H1', 'H2', 'H3'],
    'Infiniti': ['Q50', 'Q60', 'QX50', 'QX80'],
    'Acura': ['TLX', 'RDX', 'MDX', 'ILX'],
    'Genesis': ['G70', 'G80', 'G90'],
    'Lincoln': ['Navigator', 'Aviator', 'Corsair', 'Nautilus'],
    'Cadillac': ['Escalade', 'XT5', 'XT4', 'CT4'],
    'Bentley': ['Bentayga', 'Continental', 'Flying Spur'],
    'Rolls-Royce': ['Phantom', 'Ghost', 'Cullinan'],
    'Aston Martin': ['DB11', 'Vantage', 'DBX'],
    'Maserati': ['Ghibli', 'Levante', 'Quattroporte'],
    'Ferrari': ['488', 'Portofino', 'F8 Tributo', 'Roma'],
    'Lamborghini': ['Huracán', 'Aventador', 'Urus'],
    'Bugatti': ['Chiron', 'Divo', 'Veyron']
  };
}
