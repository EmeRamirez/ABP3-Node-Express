// const express = require("express");
import express from "express"
const app = express();

//Estas dos importaciones definen las rutas utilizadas por la aplicación
import {dirname, join} from "path";
import { fileURLToPath } from "url";

//__dirname será la ruta en donde se guardará de forma dinámica el path de los archivos, para evitar que deje de funcionar al cambiarlo de directorio
const __dirname = dirname(fileURLToPath(import.meta.url))

// const hbs = require("hbs");
import hbs from "hbs";

hbs.registerPartials(join(__dirname,"/views/partials")) //Añadimos el directorio de partials
app.set('view engine', 'hbs');  //Indica el motor de vista
app.set('views' , './views');  //Indica la ruta de las vistas

app.use(express.static("public")); //Le decimos a express que use este directorio para obtener el contenido estático 


app.listen(3000)

let htmlRend = "";
let paises = "";
let banderas = ["https://proyectoviajero.com/wp-content/uploads/2021/03/Bandera-de-Angola.svg",
"https://proyectoviajero.com/wp-content/uploads/2021/03/Bandera-de-Estados-Unidos.svg",
"https://proyectoviajero.com/wp-content/uploads/2021/03/Bandera-de-Mexico.svg",
"https://proyectoviajero.com/wp-content/uploads/2021/03/Bandera-de-Brasil.svg",
"https://proyectoviajero.com/wp-content/uploads/2021/03/Bandera-de-Espan%CC%83a.svg","https://proyectoviajero.com/wp-content/uploads/2021/03/Bandera-de-Alemania.svg","https://proyectoviajero.com/wp-content/uploads/2021/03/Bandera-de-Australia.svg","https://proyectoviajero.com/wp-content/uploads/2021/03/Bandera-de-Japon.svg"]

//Se importa el módulo FileSystem(fs) para llevar a cabo la lectura del archivo JSON ./paises.json 
import fs from "fs";
fs.readFile('paises.json' , (err,data) => {
    if (err) throw err;
    paises = JSON.parse(data);
    
    let i = 0; //Este iterador se utiliza para añadir el contenido del arreglo 'banderas' a la solicitud

    //El método .keys compatibiliza el uso de métodos de arreglos para ser usados con objetos.
    Object.keys(paises).forEach(key => {
        // console.log(paises[key]);
        htmlRend += `<div class='card'><div class='titulo-pais'><h2>${paises[key].Pais}</h2><img class='bandera' src="${banderas[i]}"></img><h3>${paises[key].Continente}</h3><h3>${paises[key].Capital}</h3></div></div>`;
        i++;
    });
    //La información se acumula en la variable 'htmlRend'
    
})

//Finalmente se renderiza la data recopilada en la variable 'htmlRend'
app.get("/",(req,res) => {
    
    res.render("index", {varHtml:htmlRend})
})



