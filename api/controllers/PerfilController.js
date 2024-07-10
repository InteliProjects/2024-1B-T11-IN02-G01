/**
 * PerfilController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { create, update } = require('sails-postgresql');

module.exports = {
  
    // Função que atualiza o perfil do usuário
    update: async function (req, res) {
      console.log(req.body);
        try {
          var publicarPerfil;
          if(req.body.publicar_perfil == 'true'){
            publicarPerfil = true;
          }else{
            publicarPerfil = false;
          }
          console.log(req.body);
          const user = await User.updateOne({ id: req.params.id }, {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha,
            sobrenome: req.body.sobrenome,
            data_nascimento: req.body.dataNascimento,
            telefone: req.body.telefone,
            areas_interesse: req.body.areaInteresse,
            motivacao: req.body.descricaoPerfil,
            publicar_perfil: publicarPerfil,
            cep: req.body.cep,
            cidade: await sails.helpers.consultacep(req.body.cep),

          });
          return res.json(user);
        } catch (error) {
          console.log(error.message)
          return res.status(500).send(error.message);
        }
      },
};

