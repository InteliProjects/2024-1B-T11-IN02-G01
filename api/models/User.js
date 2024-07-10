module.exports = {

  attributes: {

    nome: { type: 'string', required: true },
    email: { type: 'string', required: true, unique: true},
    senha: { type: 'string', required: true},
    data_nascimento: { type: 'string'},
    telefone:{ type: 'string'},
    cidade: { type: 'string'},
    genero: { type: 'string'},
    cep: { type: 'string'},
    areas_interesse: { type: 'string'},
    motivacao: { type: 'string'}, 
    createdAt: { type: 'number', autoCreatedAt: true, },
    publicar_perfil: { type: 'boolean', defaultsTo: false},
    id_customizacoes: {collection: 'customizacao', via: 'id_usuarios'},
    id_oportunidades: {collection: 'oportunidade', via: 'id_usuarios'},
    id_publicacoes: {collection: 'publicacao', via: 'id_usuarios'},
    id_organizacoes: {model: 'organizacao', unique: true},
    id_inscricoes: {collection: 'inscricao', via: 'id_usuarios'}
  },
};

