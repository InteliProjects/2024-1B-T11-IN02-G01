module.exports = {

  attributes: {
    nome: { type: 'string', required: true },
    qtd_vagas: { type: 'number', required: true },
    descricao: { type: 'string', required: true },
    area_interesse: { type: 'string', required: true },
    data_criacao: { type: 'string', autoCreatedAt: true, },
    data_fechamento: { type: 'string', required: true },
    qtd_beneficiarios: { type: 'number', required: true },
    qtd_voluntarios_ativos: { type: 'number', required: true },
    link: { type: 'string' },
    anexos: { type: 'string' },
    ods: { type: 'string', required: true },
    link_foto_destaque: { type: 'string' },
    id_usuarios: { model: 'user' }, 
    id_organizacoes: { model: 'organizacao' },
    id_inscricoes: { collection: 'inscricao', via: 'id_oportunidades' },

  },

};

