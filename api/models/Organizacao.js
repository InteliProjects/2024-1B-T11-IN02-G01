/**
 * Organizacao.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    nome: { type: 'string', required: true },
    cnpj: { type: 'string' },
    nome_organizacao: { type: 'string', required: true },
    area_interesse: { type: 'string', required: true },
    email: { type: 'string',},
    telefone: { type: 'string', },
    site: { type: 'string' },
    objetivo: { type: 'string', required: true },
    createdAt: { type: 'number', autoCreatedAt: true, },
    imagem: {type: 'string'},
    id_oportunidades: {collection: 'oportunidade', via: 'id_organizacoes'},
    id_publicacoes: {collection: 'publicacao', via: 'id_organizacoes'},
    id_inscricoes: {collection: 'inscricao', via: 'id_organizacoes'},
    id_usuarios: {collection: 'user', via: 'id_organizacoes'}
  },

};

