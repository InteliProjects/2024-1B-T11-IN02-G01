/**
 * Inscricao.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {


    id_usuarios: {model: 'user'},
    id_organizacoes: {model: 'organizacao'},
    id_oportunidades: {model: 'oportunidade'}


  },

};

