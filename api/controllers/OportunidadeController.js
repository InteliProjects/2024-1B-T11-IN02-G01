/**
 * OportunidadeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  //Função para procurar imagem de capa da oportunidade para exibir na tela principal de oportunidades

  findEngagements: async function (req, res) {
    try {
      const limit = 10;
      const oportunidade = await Oportunidade.find() 
        .sort('data_fechamento DESC')
        .limit(limit)
        .select(['nome', 'qtd_vagas', 'data_fechamento', 'anexos', 'link_foto_destaque'])
        .populate('id_usuarios');

      console.log(oportunidade);
      return res.status(200).json(oportunidade);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err.message);
    }
  },

  // Função para buscar todas as oportunidades
  findAll: async function (req, res) {
    try {
      const oportunidades = await Oportunidade.find()
      .select(['nome', 'qtd_vagas', 'descricao', 'anexos', 'link_foto_destaque', 'id']);
      return res.status(200).json(oportunidades);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },
  
  //Função para criar nova oportunidade.
  create: async function (req, res) {
    try {
      console.log(req.body)
      // Armazena uma nova oportunidade em uma variável a partir de um request do formulário da página criacao_oportunidade.ejs
      const newOpportunity = await Oportunidade.create(
        {
          
          // Armazenamento dos atributos da oportunidade de acordo com os campos de entrada no formulário
          nome: req.body.nomeDaVaga,
          qtd_vagas: req.body.NumeroVagas,
          descricao: req.body.descricaoOp,
          osc: req.body.organizacaoOp,
          area_interesse: req.body.areasAtuacao,
          data_fechamento: req.body.prazo,
          qtd_beneficiarios: req.body.beneficiarios,
          qtd_voluntarios_ativos: req.body.voluntarios,
          ods: req.body.ODS,
          anexos: await sails.helpers.uploadfile(req, 'imagem'),
          id_usuarios: req.cookies.userID,
          link_foto_destaque: await sails.helpers.uploadfile(req, 'imagemCapa'),
        }
        
      ).fetch();
      return res.status(200).send(newOpportunity); // Mensagem de sucesso para caso a oportunidade seja devidamente armazenada no banco de dados
    } catch (err) {
      return res.status(500).send(err.message); // Mensagem de erro para caso a oportunidade não seja devidamente armazenada no banco de dados
    }
  },
  searchResults: async function (req, res) {
    try {
      const buscaOportunidade = await Oportunidade.find({ nome: { contains: req.body.name } })
        .select(['nome', 'qtd_vagas', 'descricao', 'anexos', 'link_foto_destaque']);
      if (!buscaOportunidade) {
        return res.status(404).send('Oportunidade não encontrada');
      }
      if (organization.length === 0) {
        return res.status(404).json({ error: 'Voluntário não encontrado' });
      }
      return res.status(200).send(buscaOportunidade);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },

  popup: async function (req, res) {
    try {
      const popupOpoortunidade = await Oportunidade.find()
        .select(['nome', 'area_interesse', 'data_criacao', 'descricao', 'qtd_vagas', 
          'data_fechamento', 'qtd_beneficiarios', 'ods', 'qtd_voluntarios_ativos', 'link', 'anexos'])
        .populate('id_usuarios');
      console.log(popupOpoortunidade);
      return res.status(200).json(popupOpoortunidade);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err.message)
    }
  },
  popupById: async function (req, res) {
    try{
      const popup = await Oportunidade.findOne({ id: req.params.id}).populate('id_usuarios');
      if (!popup) {
        return res.status(404).json({ error: 'Oportunidade não encontrada' });
      }
      return res.status(200).json(popup);
    }catch(err){
      return res.status(500).send(err.message);
    }
  },
  findSpecific: async function (req, res){
    try{
      const oportunidade = await Oportunidade.findOne({id: req.params.id})
      .select('anexos');
      return res.status(200).json(oportunidade);
    }catch(err){
      console.log(err);
      return res.status(500).send(err.message);
    }
  }
};

