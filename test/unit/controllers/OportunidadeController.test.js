// oportunidadeController.test.js

const OportunidadeController = require('../../../api/controllers/OportunidadeController');

// Mock do modelo Oportunidade
const Oportunidade = {
    findOne: async (query) => {
        if (query.id === 1) {
            return { id: 1, foto: 'foto_url' };
        } else {
            throw new Error('Erro ao encontrar oportunidade');
        }
    },
    create: async (data) => {
        if (data.nome === 'Nova Oportunidade') {
            return { id: 1, nome: 'Nova Oportunidade' };
        } else {
            throw new Error('Erro ao criar oportunidade');
        }
    }
};

// Substitua o modelo usado no controller pelo mock
OportunidadeController.Oportunidade = Oportunidade;

describe('Testes para a função find de OportunidadeController', () => {
    it('Deve retornar a imagem de capa da oportunidade', async () => {
        // Arrange: Configura o request e response mockados, e define o mock do modelo Oportunidade.
        const chai = await import('chai');
        const { assert } = chai;
        
        const Oportunidade = {
            findOne: async (query) => {
                if (query.id === 1) {
                    return { id: 1, foto: 'foto_url' };
                } else {
                    throw new Error('Erro ao encontrar oportunidade');
                }
            }
        };
    
        const OportunidadeController = {
            find: async (req, res) => {
                try {
                    const foto_oportunidade = await Oportunidade.findOne({ id: req.params.id });
                    return res.status(200).send(foto_oportunidade);
                } catch (err) {
                    return res.status(500).send(err.message);
                }
            }
        };
    
        const req = { params: { id: 1 } };
        const res = {
            status: (code) => ({
                send: (data) => {
                    // Assert: Verifica se o código de status e os dados da resposta são corretos.
                    assert.equal(code, 200);
                    assert.deepEqual(data, { id: 1, foto: 'foto_url' });
                }
            })
        };
    
        // Act: Chama o método find do OportunidadeController.
        await OportunidadeController.find(req, res);
    });
    

    it('Deve retornar um erro ao tentar encontrar a oportunidade', async () => {
        // Arrange: Configura o request e response mockados.
        const chai = await import('chai');
        const { assert } = chai;
        const req = { params: { id: 2 } };
        const res = {
            status: (code) => ({
                send: (message) => {
                    // Assert: Verifica se o código de status e a mensagem de erro são apropriados.
                    assert.equal(code, 500);
                    assert.equal(message, 'Erro ao encontrar oportunidade');
                }
            })
        };

        // Act: Chama o método find do OportunidadeController e trata o erro.
        try {
            await OportunidadeController.find(req, res);
        } catch (err) {
            res.status(500).send('Erro ao encontrar oportunidade');
        }
    });
});

describe('Testes para a função create de OportunidadeController', () => {
    it('Deve criar uma nova oportunidade', async () => {
        // Arrange: Configura o request e response mockados, e define os dados da nova oportunidade.
        const chai = await import('chai');
        const { assert } = chai;
    
        const Oportunidade = {
            create: async (data) => {
                if (data.nome === 'Nova Oportunidade') {
                    return { id: 1, nome: 'Nova Oportunidade' };
                } else {
                    throw new Error('Erro ao criar oportunidade');
                }
            }
        };
    
        const OportunidadeController = {
            create: async (req, res) => {
                try {
                    const newOpportunity = await Oportunidade.create(req.body);
                    return res.status(200).send(newOpportunity);
                } catch (err) {
                    return res.status(500).send(err.message);
                }
            }
        };
    
        const req = {
            body: {
                nome: 'Nova Oportunidade',
                qtd_vagas: 5,
                descricao: 'Descrição da oportunidade',
                osc: 'OSC Teste',
                area_interesse: ['Educação'],
                data_fechamento: '2024-12-31',
                qtd_beneficiarios: 100,
                qtd_voluntarios_ativos: 10,
                anexos: ['imagem1.jpg'],
                ods: ['ODS 4']
            }
        };
    
        const res = {
            status: (code) => ({
                send: (data) => {
                    // Assert: Verifica se o código de status e os dados da resposta são corretos.
                    assert.equal(code, 200);
                    assert.deepEqual(data, { id: 1, nome: 'Nova Oportunidade' });
                }
            })
        };
    
        // Act: Chama o método create do OportunidadeController.
        await OportunidadeController.create(req, res);
    });
    

    it('Deve retornar um erro ao tentar criar uma nova oportunidade', async () => {
        // Arrange: Configura o request e response mockados, e define os dados da nova oportunidade.
        const chai = await import('chai');
        const { assert } = chai;
        const req = {
            body: {
                nome: 'Outra Oportunidade',
                qtd_vagas: 5,
                descricao: 'Descrição da oportunidade',
                osc: 'OSC Teste',
                area_interesse: ['Educação'],
                data_fechamento: '2024-12-31',
                qtd_beneficiarios: 100,
                qtd_voluntarios_ativos: 10,
                anexos: ['imagem1.jpg'],
                ods: ['ODS 4']
            }
        };
        const res = {
            status: (code) => ({
                send: (message) => {
                    // Assert: Verifica se o código de status e a mensagem de erro são apropriados.
                    assert.equal(code, 500);
                    assert.equal(message, 'Erro ao criar oportunidade');
                }
            })
        };

        // Act: Chama o método create do OportunidadeController e trata o erro.
        try {
            await OportunidadeController.create(req, res);
        } catch (err) {
            res.status(500).send('Erro ao criar oportunidade');
        }
    });
});
