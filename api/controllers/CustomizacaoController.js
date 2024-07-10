/**
 * CustomizacaoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  //Função de criar uma entrada da tabela Customizacoes, que armazenará as personalizações do avatar do usuário
  create: async function (req, res) {
    try {
      var newCustomizacao = await Customizacao.create(
        {
          //Passa os atributos da tabela Customizacoes
          acessorio_rosto: req.body.acessorio_rosto,
          acessorio_cabeca: req.body.acessorio_cabeca,
          acessorio_pernas: req.body.acessorio_pernas,

        }
      ).fetch();
      //Caso a criação da entrada seja bem sucedida, retorna a entrada criada para o cliente
      return res.json(newCustomizacao);
    } catch (err){
      //Retorna uma mensagem de erro ao cliente caso ocorra algum tipo de erro.
      return res.status(500).send(err.message);
    }


  },
};

