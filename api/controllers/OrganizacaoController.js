/**
 * OrganizacaoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

//const Organizacao = require("../models/Organizacao");

module.exports = {
    //Função para cadastrar uma nova organização
    create: async function (req, res) {
        console.log(req.body)
        try {
            const newOrg = await Organizacao.create({
                nome: await sails.helpers.nameformating(req.body.nomeDaOSC),
                area_interesse: req.body.areasAtuacaoOSC,
                nome_organizacao: req.body.organizacaoOSC,
                objetivo: req.body.descricaoOSC,
                id_usuarios: req.cookies.userID,
                imagem: await sails.helpers.uploadfile(req, 'imagem')

            }).fetch();
            return res.json(newOrg);
        } catch (error) {
            console.log(error)
            return res.status(500).send(error.message);
        }
    },

    //Função para listar as organizações
    find: async function (req, res) {
        try {
            const organizations = await Organizacao.find()
                .select(['nome', 'site', 'objetivo', 'imagem']);
            return res.json(organizations);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    },

    findOrg: async function (req, res) {
        try {
            const organization = await Organizacao.find({ nome: { contains: req.body.name } })
                .select(['nome', 'area_interesse', 'site', 'objetivo', 'imagem']);
            if (!organization) {
                return res.status(404).json({ error: 'Voluntário não encontrado' });
            }
            if (organization.length === 0) {
                return res.status(404).json({ error: 'Voluntário não encontrado' });
            }
            return res.json(organization);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    },

    findNew: async function (req, res) {
        try {
            console.log("entrou");
            const limit = 20; 

            const newOrganizations = await Organizacao.find()
                .sort('createdAt DESC')
                .limit(limit)
                .select(['nome', 'site', 'objetivo', 'createdAt', 'imagem']);
            console.log(newOrganizations);

            return res.json(newOrganizations);
        } catch (error) {
            console.log(error.message);
            return res.status(500).send(error.message);
        }
    },

    findPopup: async function (req, res) {
        try {
            const popup = await Organizacao.find()
                .select(['nome', 'nome_organizacao', 'area_interesse', 'email',
                    'telefone', 'site', 'objetivo', 'imagem' ]);
            console.log(popup);
            return res.json(popup);
        } catch(err) {
            console.log(err);
            return res.send(err.message);
        }
    }

};

