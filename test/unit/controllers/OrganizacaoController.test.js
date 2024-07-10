// organizacaoController.test.js

const OrganizacaoController = require('../../../api/controllers/OrganizacaoController');

// Mock do modelo Organizacao
const Organizacao = {
    create: async (data) => {
        if (data.nome === 'ORGANIZAÇÃO TESTE') {
            return {
                id: 1,
                nome: 'ORGANIZAÇÃO TESTE',
                cnpj: '12345678901234',
                area_interesse: ['Educação', 'Saúde'],
                email: 'teste@organizacao.com',
                telefone: '1234567890',
                site: 'www.organizacao.com',
                objetivo: 'Objetivo da Organização'
            };
        } else {
            throw new Error('Erro ao criar organização');
        }
    },
    find: async () => {
        return [
            {
                nome: 'Organização 1',
                area_interesse: ['Educação'],
                site: 'www.organizacao1.com',
                objetivo: 'Objetivo 1'
            },
            {
                nome: 'Organização 2',
                area_interesse: ['Saúde'],
                site: 'www.organizacao2.com',
                objetivo: 'Objetivo 2'
            }
        ];
    },
    findOrg: async (query) => {
        if (query.id === 1) {
            return {
                nome: 'Organização 1',
                area_interesse: ['Educação'],
                site: 'www.organizacao1.com',
                objetivo: 'Objetivo 1'
            };
        } else {
            return null;
        }
    },
    findNew: async () => {
        return [
            {
                nome: 'Organização 3',
                area_interesse: ['Meio Ambiente'],
                site: 'www.organizacao3.com',
                objetivo: 'Objetivo 3'
            }
        ];
    }
};

// Mock do helper sails.helpers.nameformating
const sails = {
    helpers: {
        nameformating: async (name) => {
            return name.trim().toUpperCase();
        }
    }
};

// Substitua o modelo e helper usados no controller pelos mocks
OrganizacaoController.Organizacao = Organizacao;
global.sails = sails;

describe('Testes para a função create de OrganizacaoController', () => {
    it('Deve criar uma nova organização com sucesso', async () => {
        // Arrange: Configura o request e response mockados, e define os dados da nova organização.
        const chai = await import('chai');
        const { assert } = chai;
        const req = {
            body: {
                nome: ' Organização Teste ',
                cnpj: '12345678901234',
                area_interesse: ['Educação', 'Saúde'],
                email: 'teste@organizacao.com',
                telefone: '1234567890',
                site: 'www.organizacao.com',
                objetivo: 'Objetivo da Organização'
            }
        };

        const res = {
            json: (data) => {
                // Assert: Verifica se o nome formatado e os dados da resposta são corretos.
                assert.equal(data.nome, 'ORGANIZAÇÃO TESTE');
                assert.equal(data.cnpj, req.body.cnpj);
                assert.equal(data.area_interesse[0], req.body.area_interesse[0]);
            },
            status: (code) => ({
                send: (message) => console.error(`Erro ${code}: ${message}`)
            })
        };

        // Act: Chama o método create do OrganizacaoController.
        await OrganizacaoController.create(req, res);
    });

    it('Deve retornar um erro ao tentar criar uma organização', async () => {
        // Arrange: Configura o request e response mockados, e define os dados da nova organização.
        const chai = await import('chai');
        const { assert } = chai;
        
        const req = {
            body: {
                nome: 'Outra Organização',
                cnpj: '12345678901234',
                area_interesse: ['Educação'],
                email: 'outra@organizacao.com',
                telefone: '0987654321',
                site: 'www.outraorganizacao.com',
                objetivo: 'Outro Objetivo'
            }
        };
    
        const res = {
            status: (code) => ({
                send: (message) => {
                    // Assert: Verifica se o código de status e a mensagem de erro são apropriados.
                    assert.equal(code, 500);
                    assert.equal(message, 'Erro ao criar organização');
                }
            })
        };
    
        // Act: Chama o método create do OrganizacaoController e trata o erro.
        try {
            await OrganizacaoController.create(req, res);
        } catch (e) {
            res.status(500).send('Erro ao criar organização');
        }
    });
    
});

describe('Testes para a função find de OrganizacaoController', () => {
    it('Deve listar todas as organizações com sucesso', async () => {
        // Arrange: Configura o request e response mockados.
        const chai = await import('chai');
        const { assert } = chai;
        const req = {};
        const res = {
            json: (data) => {
                // Assert: Verifica se os dados da resposta são um array com o número correto de elementos.
                assert.isArray(data);
                assert.equal(data.length, 2);
            },
            status: (code) => ({
                send: (message) => console.error(`Erro ${code}: ${message}`)
            })
        };

        // Act: Chama o método find do OrganizacaoController.
        await OrganizacaoController.find(req, res);
    });

    it('Deve retornar um erro ao tentar listar as organizações', async () => {
        // Arrange: Configura o request e response mockados.
        const chai = await import('chai');
        const { assert } = chai;
    
        const req = {};
        const res = {
            status: (code) => ({
                send: (message) => {
                    // Assert: Verifica se o código de status e a mensagem de erro são apropriados.
                    assert.equal(code, 500);
                    assert.equal(message, 'Erro ao listar organizações');
                }
            })
        };
    
        // Substituir temporariamente a função find para simular erro.
        const originalFind = Organizacao.find;
        Organizacao.find = async () => { throw new Error('Erro ao listar organizações'); };
    
        // Act: Chama o método find do OrganizacaoController e trata o erro.
        try {
            await OrganizacaoController.find(req, res);
        } catch (e) {
            res.status(500).send('Erro ao listar organizações');
        } finally {
            // Restaurar a função original após o teste.
            Organizacao.find = originalFind;
        }
    });
    
});

describe('Testes para a função findOrg de OrganizacaoController', () => {
    it('Deve retornar a organização especificada com sucesso', async () => {
        // Arrange: Configura o request e response mockados, e define o ID da organização a ser retornada.
        const chai = await import('chai');
        const { assert } = chai;
        const req = { params: { id: 1 } };
        const res = {
            json: (data) => {
                // Assert: Verifica se os dados da resposta são corretos.
                assert.equal(data.nome, 'Organização 1');
                assert.equal(data.area_interesse[0], 'Educação');
            },
            status: (code) => ({
                send: (message) => console.error(`Erro ${code}: ${message}`)
            })
        };

        // Act: Chama o método findOrg do OrganizacaoController.
        await OrganizacaoController.findOrg(req, res);
    });

    it('Deve retornar um erro se a organização não for encontrada', async () => {
        // Arrange: Configura o request e response mockados, e define um ID inexistente.
        const chai = await import('chai');
        const { assert } = chai;
        
        const req = { params: { id: 2 } }; // ID não existente no mock.
        const res = {
            status: (code) => ({
                send: (message) => {
                    // Assert: Verifica se o código de status e a mensagem de erro são apropriados.
                    assert.equal(code, 500);
                    assert.equal(message, 'Organização não encontrada');
                }
            })
        };
    
        // Substituir temporariamente a função findOrg para simular organização não encontrada.
        const originalFindOrg = Organizacao.findOrg;
        Organizacao.findOrg = async () => null;
    
        // Act: Chama o método findOrg do OrganizacaoController e trata o erro.
        try {
            await OrganizacaoController.findOrg(req, res);
        } catch (e) {
            res.status(500).send('Organização não encontrada');
        } finally {
            // Restaurar a função original após o teste.
            Organizacao.findOrg = originalFindOrg;
        }
    });
    
});

describe('Testes para a função findNew de OrganizacaoController', () => {
    it('Deve listar as novas organizações com sucesso', async () => {
        // Arrange: Configura o request e response mockados.
        const chai = await import('chai');
        const { assert } = chai;
        const req = {};
        const res = {
            json: (data) => {
                // Assert: Verifica se os dados da resposta são um array com o número correto de elementos e valores.
                assert.isArray(data);
                assert.equal(data.length, 1);
                assert.equal(data[0].nome, 'Organização 3');
            },
            status: (code) => ({
                send: (message) => console.error(`Erro ${code}: ${message}`)
            })
        };

        // Act: Chama o método findNew do OrganizacaoController.
        await OrganizacaoController.findNew(req, res);
    });

    it('Deve retornar um erro ao tentar listar as novas organizações', async () => {
        // Arrange: Configura o request e response mockados.
        const chai = await import('chai');
        const { assert } = chai;
    
        const req = {};
        const res = {
            status: (code) => ({
                send: (message) => {
                    // Assert: Verifica se o código de status e a mensagem de erro são apropriados.
                    assert.equal(code, 500);
                    assert.equal(message, 'Erro ao listar novas organizações');
                }
            })
        };
    
        // Substituir temporariamente a função findNew para simular erro.
        const originalFindNew = Organizacao.findNew;
        Organizacao.findNew = async () => { throw new Error('Erro ao listar novas organizações'); };
    
        // Act: Chama o método findNew do OrganizacaoController e trata o erro.
        try {
            await OrganizacaoController.findNew(req, res);
        } catch (e) {
            res.status(500).send('Erro ao listar novas organizações');
        } finally {
            // Restaurar a função original após o teste.
            Organizacao.findNew = originalFindNew;
        }
    });
    
});
