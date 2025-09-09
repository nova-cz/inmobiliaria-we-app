// Base de datos de propiedades
const properties = [
    {
        id: 1,
        name: "Casa Moderna en Polanco",
        location: "Polanco, CDMX",
        price: 8500000,
        type: "casa",
        bedrooms: 4,
        bathrooms: 3,
        area: 280,
        parking: 2,
        year: 2020,
        image: "img/id1_1.jpeg",
        images: [
            "img/id1_2.jpeg",
            "img/id1_3.jpeg",
            "img/id1_4.jpeg"
        ],
        description: "Hermosa casa moderna en una de las mejores zonas de la ciudad. Cuenta con acabados de lujo y excelente ubicación.",
        features: ["Jardín", "Terraza", "Cocina integral", "Cuarto de servicio"]
    },
    {
        id: 2,
        name: "Departamento en Santa Fe",
        location: "Santa Fe, CDMX",
        price: 4200000,
        type: "departamento",
        bedrooms: 2,
        bathrooms: 2,
        area: 95,
        parking: 1,
        year: 2019,
        image: "img/id2_1.jpeg",
        images: [
            "img/id2_2.jpeg",
            "img/id2_3.jpeg",
            "img/id2_4.jpeg"
        ],
        description: "Moderno departamento con vista panorámica de la ciudad. Excelentes amenidades en el edificio.",
        features: ["Gimnasio", "Alberca", "Seguridad 24/7", "Business center"]
    },
    {
        id: 3,
        name: "Terreno en Cuernavaca",
        location: "Cuernavaca, Morelos",
        price: 1800000,
        type: "terreno",
        bedrooms: 0,
        bathrooms: 0,
        area: 500,
        parking: 0,
        year: 2023,
        image: "img/id3_1.jpeg",
        images: [
            "img/id3_2.jpeg",
            "img/id3_3.jpeg",
        ],
        description: "Amplio terreno plano ideal para construcción. Ubicado en zona residencial tranquila.",
        features: ["Acceso a servicios", "Zona residencial", "Escriturado", "Plano"]
    },
    {
        id: 4,
        name: "Casa en Condesa",
        location: "Condesa, CDMX",
        price: 6500000,
        type: "casa",
        bedrooms: 3,
        bathrooms: 2,
        area: 220,
        parking: 1,
        year: 2018,
        image: "img/id4_1.jpeg",
        images: [
            "img/id4_2.jpeg",
            "img/id4_3.jpeg",
        ],
        description: "Encantadora casa en el corazón de la Condesa. Perfecta para quienes buscan estilo y ubicación.",
        features: ["Patio trasero", "Cerca del parque", "Remodelada", "Estudio"]
    },
    {
        id: 5,
        name: "Loft en Roma Norte",
        location: "Roma Norte, CDMX",
        price: 3800000,
        type: "departamento",
        bedrooms: 1,
        bathrooms: 1,
        area: 75,
        parking: 0,
        year: 2021,
        image: "img/id5_1.jpeg",
        images: [
            "img/id5_2.jpeg",
            "img/id5_3.jpeg"
        ],
        description: "Moderno loft en edificio histórico renovado. Techos altos y mucha luz natural.",
        features: ["Techos altos", "Luz natural", "Área social", "Diseño industrial"]
    },
    {
        id: 6,
        name: "Casa en Las Lomas",
        location: "Las Lomas, CDMX",
        price: 12000000,
        type: "casa",
        bedrooms: 5,
        bathrooms: 4,
        area: 350,
        parking: 3,
        year: 2017,
        image: "img/id6_1.jpeg",
        images: [
            "img/id6_2.jpeg",
            "img/id6_3.jpeg",
        ],
        description: "Elegante residencia en zona exclusiva. Amplios espacios y acabados de primera calidad.",
        features: ["Alberca", "Jardín amplio", "Cuarto de servicio", "Sala de TV"]
    },
    {
        id: 7,
        name: "Departamento en Del Valle",
        location: "Del Valle, CDMX",
        price: 2800000,
        type: "departamento",
        bedrooms: 2,
        bathrooms: 1,
        area: 85,
        parking: 1,
        year: 2016,
        image: "img/id7_1.jpeg",
        images: [
            "img/id7_2.jpeg",
            "img/id7_3.jpeg"
        ],
        description: "Cómodo departamento en zona céntrica. Ideal para profesionistas jóvenes.",
        features: ["Balcón", "Cerca del metro", "Portería", "Área de lavado"]
    },
    {
        id: 8,
        name: "Casa en Satelite",
        location: "Ciudad Satélite, EdoMex",
        price: 4500000,
        type: "casa",
        bedrooms: 3,
        bathrooms: 2,
        area: 180,
        parking: 2,
        year: 2019,
        image: "img/id8_1.jpeg",
        images: [
            "img/id8_2.jpeg",
            "img/id8_3.jpeg"
        ],
        description: "Casa familiar en fraccionamiento seguro. Perfecta para familias con niños.",
        features: ["Jardín", "Área de juegos", "Cocina integral", "Closets"]
    },
    {
        id: 9,
        name: "Penthouse en Interlomas",
        location: "Interlomas, EdoMex",
        price: 15000000,
        type: "departamento",
        bedrooms: 4,
        bathrooms: 3,
        area: 300,
        parking: 3,
        year: 2022,
        image: "img/id9_1.jpeg",
        images: [
            "img/id9_2.jpeg",
            "img/id9_3.jpeg",
        ],
        description: "Espectacular penthouse con terraza privada. Vistas increíbles y acabados de lujo.",
        features: ["Terraza privada", "Jacuzzi", "Vista panorámica", "Domótica"]
    },
    {
        id: 10,
        name: "Terreno en Valle de Bravo",
        location: "Valle de Bravo, EdoMex",
        price: 2500000,
        type: "terreno",
        bedrooms: 0,
        bathrooms: 0,
        area: 800,
        parking: 0,
        year: 2023,
        image: "img/id10_1.jpeg",
        images: [
            "img/id10_2.jpeg",
            "img/id10_3.jpeg"
        ],
        description: "Hermoso terreno con vista al lago. Ideal para casa de descanso.",
        features: ["Vista al lago", "Acceso por carretera", "Zona boscosa", "Escriturado"]
    },
    {
        id: 11,
        name: "Departamento en Doctores",
        location: "Doctores, CDMX",
        price: 1900000,
        type: "departamento",
        bedrooms: 1,
        bathrooms: 1,
        area: 50,
        parking: 0,
        year: 2020,
        image: "img/id11_1.jpeg",
        images: [
            "img/id11_2.jpeg",
            "img/id11_3.jpeg"
        ],
        description: "Compacto departamento totalmente renovado. Excelente inversión.",
        features: ["Remodelado", "Buena ubicación", "Transporte público", "Seguro"]
    },
    {
        id: 12,
        name: "Casa en Xochimilco",
        location: "Xochimilco, CDMX",
        price: 3200000,
        type: "casa",
        bedrooms: 4,
        bathrooms: 2,
        area: 200,
        parking: 2,
        year: 2015,
        image: "img/id12_1.jpeg",
        images: [
            "img/id12_2.jpeg",
            "img/id12_3.jpeg"
        ],
        description: "Casa tradicional mexicana con amplio patio. Perfecta para familias grandes.",
        features: ["Patio amplio", "Estilo tradicional", "Zona tranquila", "4 recámaras"]
    }
];