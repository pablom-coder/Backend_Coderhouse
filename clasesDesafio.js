class Usuario{
    nombre;
    apellido;
    libros;
    mascotas;

    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(){
        console.log(`Su nombre es ${this.nombre} ${this.apellido}`);
    }

    addMascota(nombre_mascota){
        this.mascotas.push(nombre_mascota);
        console.log(this.mascotas)
    }

    cantMascotas(){
        let cantidad = this.mascotas.length;
        console.log(cantidad);
    }

    addBook(nombreLibro, autorLibro){
        let nuevoLibro = {nombre:nombreLibro, autor:autorLibro}
        this.libros.push(nuevoLibro);
    }

    getBookNames(){
        console.log(this.libros.map(e => e.nombre));
    }
}

const libros  = [
    {
        nombre : "Relato de un náufrago",
        autor: "Gabriel García Márquez"
    }
]

const perros = ["tannia", "delfina", "pancha"]

const usuario = new Usuario("Bon", "Jovi", libros, perros);


// metodos
usuario.getFullName()

usuario.addMascota("valeria")

usuario.cantMascotas()

usuario.addBook("El Mago de Oz" , "Frank Baum")

usuario.getBookNames()