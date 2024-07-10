/**
 * Customizacoes.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    acessorio_rosto: { type: 'string' },
    acessorio_cabeca: { type: 'string' },
    acessorio_pernas: { type: 'string' },
    id_usuarios: {model: 'user', unique: true}

  },

};

