export const movieSchema = {
    type : 'object',
    required : ['title', 'year', 'director', 'genre', 'length'],
    properties : {
        title : { type : 'string' },
        year : { type : 'integer', minimum : 1888 },
        director : { type : 'string' },
        genre : { type : 'string' },
        length : { type : 'integer', minimum : 1 }
    },
    additionalProperties : false
}