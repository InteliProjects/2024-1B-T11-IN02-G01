/**
 * Publicacao.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    titulo: { type: 'string' },
    conteudo: { type: 'string' },
    anexos: { type: 'string' },
    id_usuarios: {model: 'user'},
    id_organizacoes: {model: 'organizacao'}
  },

};

