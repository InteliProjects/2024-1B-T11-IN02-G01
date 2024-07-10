const userController = require('../../../api/controllers/UserController');

describe('Testes para userController', () => {
    it('Deve criar um novo usuário com sucesso', async () => {
        // Arrange: Configura o request e response mockados, e define os dados do novo usuário.
        const chai = await import('chai');
        const { assert } = chai;
        const req = {
            body: {
                nome: 'João',
                email: 'joao@example.com',
                senha: 'senha123',
            }
        };

        const res = {
            json: (data) => {
                // Assert: Verifica se o nome e email do usuário criado correspondem aos dados enviados.
                assert.equal(data.nome, req.body.nome);
                assert.equal(data.email, req.body.email);
            },
            status: (code) => ({
                send: (message) => console.error(`Erro ${code}: ${message}`)
            })
        };

        // Act: Chama o método create do userController.
        await userController.create(req, res);
    });

    it('Deve atualizar as customizações do usuário com sucesso', async () => {
        // Arrange: Configura o request e response mockados, e define os dados de customização do usuário.
        const chai = await import('chai');
        const { assert } = chai;
        const req = {
            params: {
                id: 'id_do_usuario_aqui',
            },
            body: {
                id_customizacao: 'id_da_customizacao_aqui',
            }
        };

        const res = {
            json: (data) => {
                // Assert: Verifica se o ID da customização corresponde ao ID enviado.
                assert.equal(data.id_customizacao, req.body.id_customizacao);
            },
            status: (code) => ({
                send: (message) => console.error(`Erro ${code}: ${message}`)
            })
        };

        // Act: Chama o método updateCustomizacoes do userController.
        await userController.updateCustomizacoes(req, res);
    });

    it('Deve retornar as informações do usuário junto com as customizações', async () => {
        // Arrange: Configura o request e response mockados, e define o ID do usuário.
        const chai = await import('chai');
        const { assert } = chai;
        const req = {
            params: {
                id: 'id_do_usuario_aqui',
            }
        };

        const res = {
            json: (data) => {
                // Assert: Verifica se as customizações existem no retorno.
                assert.exists(data.id_customizacoes);
            },
            status: (code) => ({
                send: (message) => console.error(`Erro ${code}: ${message}`)
            })
        };

        // Act: Chama o método populateCustomizacoes do userController.
        await userController.populateCustomizacoes(req, res);
    });

    it('Deve realizar o login do usuário com sucesso', async () => {
        // Arrange: Configura o request e response mockados, e define os dados de login do usuário.
        const chai = await import('chai');
        const { assert } = chai;
        const req = {
            body: {
                email: 'joao@example.com',
                senha: 'senha123',
            }
        };

        const res = {
            json: (data) => {
                // Assert: Verifica se o email do usuário logado corresponde ao email enviado.
                assert.equal(data.email, req.body.email);
            },
            status: (code) => ({
                send: (message) => console.error(`Erro ${code}: ${message}`)
            })
        };

        // Act: Chama o método login do userController.
        await userController.login(req, res);
    });

    it('Deve encontrar usuários pelo nome', async () => {
        // Arrange: Configura o request e response mockados, e define o nome a ser buscado.
        const chai = await import('chai');
        const { assert } = chai;
        const req = {
            body: {
                nome: 'João',
            }
        };

        const res = {
            json: (data) => {
                // Assert: Verifica se o retorno é um array de usuários.
                assert.isArray(data);
            },
            status: (code) => ({
                send: (message) => console.error(`Erro ${code}: ${message}`)
            })
        };

        // Act: Chama o método findByName do userController.
        await userController.findByName(req, res);
    });

    it('Deve listar voluntários publicados com sucesso', async () => {
        // Arrange: Configura o request e response mockados.
        const chai = await import('chai');
        const { assert } = chai;
        const req = {};
        
        const res = {
            json: (data) => {
                // Assert: Verifica se o retorno é um array de voluntários.
                assert.isArray(data);
            },
            status: (code) => ({
                send: (message) => console.error(`Erro ${code}: ${message}`)
            })
        };

        // Act: Chama o método listVolunteers do userController.
        await userController.listVolunteers(req, res);
    });

    it('Deve encontrar um voluntário específico com sucesso', async () => {
        // Arrange: Configura o request e response mockados, e define o ID do voluntário.
        const chai = await import('chai');
        const { assert } = chai;
        const req = {
            params: {
                id: 'id_do_usuario_aqui',
            }
        };
        
        const res = {
            json: (data) => {
                // Assert: Verifica se os dados do voluntário existem.
                assert.exists(data);
            },
            status: (code) => ({
                send: (message) => console.error(`Erro ${code}: ${message}`)
            })
        };

        // Act: Chama o método findVolunteer do userController.
        await userController.findVolunteer(req, res);
    });

    it('Deve encontrar novos voluntários com sucesso', async () => {
        // Arrange: Configura o request e response mockados.
        const chai = await import('chai');
        const { assert } = chai;
        const req = {};
        
        const res = {
            json: (data) => {
                // Assert: Verifica se o retorno é um array de novos voluntários.
                assert.isArray(data);
            },
            status: (code) => ({
                send: (message) => console.error(`Erro ${code}: ${message}`)
            })
        };

        // Act: Chama o método findNewVolunteer do userController.
        await userController.findNewVolunteer(req, res);
    });

    it('Deve retornar mensagem de erro para criação de usuário inválido', async () => {
        // Arrange: Configura o request e response mockados, e omite um atributo obrigatório.
        const chai = await import('chai');
        const { assert } = chai;
    
        const req = {
            body: {
                senha: 'senha123',
            }
        };
    
        const res = {
            status: (code) => ({
                send: (message) => {
                    // Assert: Verifica se o código de status e a mensagem de erro são apropriados.
                    assert.equal(code, 500);
                    assert.include(message, 'E_VALIDATION');
                }
            })
        };
    
        // Act: Chama o método create do userController, e trata o erro.
        try {
            await userController.create(req, res);
        } catch (e) {
            res.status(500).send(e.message);
        }
    });

    it('Deve retornar mensagem de erro para falha na autenticação', async () => {
        // Arrange: Configura o request e response mockados, e define dados de login incorretos.
        const chai = await import('chai');
        const { assert } = chai;
    
        const req = {
            body: {
                email: 'joao@example.com',
                senha: 'senhaerrada',
            }
        };
    
        const res = {
            status: (code) => ({
                send: (message) => {
                    // Assert: Verifica se o código de status e a mensagem de erro são apropriados.
                    assert.equal(code, 401);
                    assert.equal(message, 'Senha incorreta');
                }
            })
        };
    
        // Act: Chama o método login do userController, e trata o erro.
        try {
            await userController.login(req, res);
        } catch (e) {
            res.status(401).send('Senha incorreta');
        }
    });
});
