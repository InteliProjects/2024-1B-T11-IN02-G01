/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { create, update } = require('sails-postgresql');

module.exports = {
  //Função para criar um novo usuário
  create: async function (req, res) {
    try {
      const user = await User.create({
        nome: await sails.helpers.nameformating(req.body.nome),
        email: req.body.email,
        senha: req.body.senha,
      }).fetch();
      //Cria um cookie no navegador do usuário com seu ID; Utilizar no futuro para manter usuário logado
      res.cookie('userID', user.id, { maxAge: 60 * 60 * 24 * 7 * 1000 });

      return res.json(user);
      //Retorna a mensagem de erro caso haja algum problema com as verificações acima
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },
  //Função para adicionar as informações de customização do usuário
  updateCustomizacoes: async function (req, res) {
    try {
      const user = await User.update({ id: req.params.id }, {
        id_customizacoes: req.body.id_customizacao,
      }).fetch();
      return res.json(user);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },
  //Função para retornar as informações do usuário junto das customizações
  populateCustomizacoes: async function (req, res) {
    try {
      //Acha e retorna as informações do usuário junto das customizações
      const user = await User.findOne({ id: req.params.id }).populate('id_customizacoes');
      return res.json(user);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },
  login: async function (req, res) {
    try {
      user = await User.findOne({ email: req.body.email });
      if (user.senha === req.body.senha) {
        res.cookie('userID', user.id, { maxAge: 60 * 60 * 24 * 7 * 1000 });
        return res.status(201).json(user);
      } else {
        return res.status(401).send('Senha incorreta');
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send('Não foi possível realizar o login');
    }

  },

  logout: async function (req, res) {
    try {
      sails.log('entrou')
      // Limpa o cookie 'userID'
      res.clearCookie('userID');
      return res.redirect('/login');
    } catch (error) {
      return res.send('Não foi possível realizar o logout');
    }
  },

  findByName: async function (req, res) {
    try {

      const users = await User.find({ nome: { contains: req.body.nome } });
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).send(error.message);

    }
  },

  //Função para listar voluntários publicados
  listVolunteers: async function (req, res) {
    try {
      const volunteers = await User.find({ publicar_perfil: true })
        .select(['nome', 'motivacao', 'areas_interesse']);
      return res.status(200).json(volunteers);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send(error.message);
    }
  },

  //Função para encontrar um voluntário específico
  findVolunteer: async function (req, res) {
    try {
      const volunteer = await User.find({ nome: { contains: req.body.name }, publicar_perfil: true })
        .select(['nome', 'motivacao', 'areas_interesse']);
      if (!volunteer) {
        return res.status(404).json({ error: 'Voluntário não encontrado' });
      }
      if (volunteer.length === 0) {
        return res.statatus(404).send('Nenhuma oportnidade encontrada');
      }
      return res.status(200).json(volunteer);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },

  findNewVolunteer: async function (req, res) {
    try {
      const limit = 20; // Define o limite fixo de 20 usuários

      // Buscar usuários ordenados pela data de criação em ordem decrescente
      const newVolunteer = await User.find({ publicar_perfil: true })
        .sort('createdAt DESC')
        .limit(limit)
        .select(['nome', 'motivacao', 'createdAt']);
      console.log(newVolunteer);
      return res.status(200).json(newVolunteer);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },
  findVolunteerById: async function (req, res) {
    try {
      const volunteer = await User.findOne({ id: req.params.id })
      if (!volunteer) {
        return res.status(404).json({ error: 'Voluntário não encontrado' });
      }
      return res.status(200).json(volunteer);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },

  findPopup: async function (req, res) {
    try {
      const popup = await User.find({ publicar_perfil: true })
        .select(['nome', 'areas_interesse', 'motivacao', 'email']);
      console.log(popup);
      return res.json(popup);
    } catch (err) {
      return res.json(err.message);
    }
  }



};
