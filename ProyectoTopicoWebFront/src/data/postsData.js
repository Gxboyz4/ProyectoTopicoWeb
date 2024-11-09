export const postsData = [
    { 
        id: 1, 
        idComunidad: 1, 
        idUsuario: 1, 
        idPelicula: 'tt11126994', 
        cantidadLikes: 5, 
        calificacion: 10, 
        contenido: "Me encantó esta película. La trama fue muy interesante y los personajes estaban bien desarrollados. La cinematografía fue impresionante y la banda sonora complementó perfectamente las escenas. Definitivamente la recomendaría a mis amigos.", 
        comentarios: [] 
    },
    {
        id: 2,
        idComunidad: 1,
        idUsuario: 2,
        idPelicula: 'tt0120363',
        cantidadLikes: 3,
        calificacion: 3,
        contenido: "No me gustó esta película. La historia era predecible y los personajes no eran muy interesantes. Además, la actuación no fue convincente y los efectos especiales dejaban mucho que desear. No creo que la vea de nuevo.",
        comentarios: [
            { id: 1, idUsuario: 1, contenido: "¿Por qué no te gustó? ¿Hubo algo en particular que no te agradara?", fechaCreacion: "2021-10-05" },
            { id: 2, idUsuario: 2, contenido: "No me gustó la trama. Sentí que era muy cliché y no aportaba nada nuevo. Además, algunas escenas eran demasiado largas y aburridas.", fechaCreacion: "2021-10-06" }
        ]
    },
    {
        id: 3,
        idComunidad: 2,
        idUsuario: 1,
        idPelicula: 'tt10872600',
        cantidadLikes: 8,
        calificacion: 8,
        contenido: "Buena película. La historia fue intrigante y mantuvo mi interés de principio a fin. Los actores hicieron un gran trabajo y la dirección fue excelente. Sin embargo, hubo algunas partes que podrían haber sido mejoradas.",
        comentarios: [
            { id: 3, idUsuario: 1, contenido: "¿Por qué te gustó? ¿Qué aspectos de la película te parecieron más destacables?", fechaCreacion: "2021-10-07" },
            { id: 4, idUsuario: 2, contenido: "Me gustó la trama. Fue muy original y diferente a lo que suelo ver. Además, los giros en la historia fueron sorprendentes y bien ejecutados.", fechaCreacion: "2021-10-08" },
            { id: 5, idUsuario: 1, contenido: "¿Qué más te gustó? ¿Hubo alguna escena en particular que te impresionara?", fechaCreacion: "2021-10-09" }
        ]
    }
];
