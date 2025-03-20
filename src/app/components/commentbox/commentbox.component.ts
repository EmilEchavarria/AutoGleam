import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2'; // Asegúrate de importar SweetAlert2

@Component({
  selector: 'app-commentbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './commentbox.component.html',
  styleUrls: ['./commentbox.component.css']
})
export class CommentboxComponent implements OnInit {
  userName: string;
  userEmail: string;
  isEditing: boolean = false;

  comments: any[] = [];
  newComment: any = { text: '', name: 'Pepito', avatar: 'https://i.imgur.com/zQZSWrt.jpg', time: 'Hace unos momentos', likes: 0 };
  isExpanded: boolean = false;

  likedComments: Set<number> = new Set<number>(); // Almacena los índices de los comentarios con like

  constructor(private userService: UserService) {
    this.userEmail = this.userService.getUserEmail();
    this.userName = this.userEmail.split('@')[0];
  }

  ngOnInit(): void {
    const storedComments = JSON.parse(localStorage.getItem('comments') || '[]');
    this.comments = storedComments;

    const storedLikes = JSON.parse(localStorage.getItem('likedComments') || '[]');
    this.likedComments = new Set<number>(storedLikes); // Cargar comentarios ya likeados
  }

  submitComment() {
    const newComment = {
      text: this.newComment.text,
      likes: 0,
      time: new Date().toLocaleString(),  // Asignar la hora y fecha actual
    };
    this.comments.push(newComment);
    this.newComment.text = '';  // Limpiar el campo de texto
  }
  


  incrementLikes(comment: any, index: number): void {
    // Verificamos si el comentario ya tiene un like
    if (this.likedComments.has(index)) {
      // Si ya tiene un like, lo quitamos
      comment.likes--;
      this.likedComments.delete(index);  // Quitamos el índice del conjunto
    } else {
      // Si no tiene un like, lo agregamos
      comment.likes++;
      this.likedComments.add(index);  // Agregamos el índice al conjunto
    }
  
    // Actualizamos el almacenamiento local con los comentarios y los likes
    localStorage.setItem('comments', JSON.stringify(this.comments));
    localStorage.setItem('likedComments', JSON.stringify(Array.from(this.likedComments)));
  }
  
  

  deleteComment(index: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡Este comentario será eliminado!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.comments.splice(index, 1); // Elimina el comentario de la lista
        this.likedComments.delete(index); // Elimina el índice de la lista de likes
        localStorage.setItem('comments', JSON.stringify(this.comments)); // Actualiza los comentarios en almacenamiento local
        localStorage.setItem('likedComments', JSON.stringify(Array.from(this.likedComments))); // Actualiza los likes
        Swal.fire(
          'Eliminado!',
          'Tu comentario ha sido eliminado.',
          'success'
        );
      }
    });
  }
  

  toggleComments(): void {
    this.isExpanded = !this.isExpanded; // Cambia el estado de expansión
  }

  get visibleComments() {
    return this.isExpanded ? this.comments : this.comments.slice(0, 3); // Muestra solo 3 comentarios inicialmente
  }
}
