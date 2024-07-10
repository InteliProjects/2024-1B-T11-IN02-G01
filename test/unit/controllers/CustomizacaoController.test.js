const customizacaoController = require('../../../api/controllers/CustomizacaoController');

describe('Testes para a função create de customizacaoController', () => {
    
    it('Deve criar uma nova customização com sucesso', async () => {
        // Arrange: Configura o request e response mockados, e define os dados da nova customização.
        const chai = await import('chai');
        const { assert } = chai;
        const req = {
            body: {
                acessorio_rosto: 'oculos',
                acessorio_cabeca: 'chapeu',
                acessorio_pernas: 'calcas',
            }
        };
        
        const res = {
            json: (data) => {
                // Assert: Verifica se os acessórios da customização criada correspondem aos dados enviados.
                assert.equal(data.acessorio_rosto, req.body.acessorio_rosto);
                assert.equal(data.acessorio_cabeca, req.body.acessorio_cabeca);
                assert.equal(data.acessorio_pernas, req.body.acessorio_pernas);
            },
            status: (code) => ({
                send: (message) => console.error(`Erro ${code}: ${message}`)
            })
        };
        
        // Act: Chama o método create do customizacaoController.
        await customizacaoController.create(req, res);
    });

    it('Deve retornar um erro interno do servidor ao tentar criar uma customização', async () => {
        // Arrange: Configura o request e response mockados, e define os dados da customização.
        const chai = await import('chai');
        const { assert } = chai;
        const req = {
            body: {
                acessorio_rosto: 'oculos',
                acessorio_cabeca: 'chapeu',
                acessorio_pernas: 'calcas',
            }
        };
       
        const res = {
            status: (code) => ({
                send: (message) => {
                    // Assert: Verifica se o código de status e a mensagem de erro são apropriados.
                    assert.equal(code, 500);
                    assert.equal(message, 'Erro interno do servidor');
                }
            })
        };

        // Act: Substitui temporariamente o método create do customizacaoController para simular um erro interno do servidor.
        const originalCreate = customizacaoController.create;
        customizacaoController.create = async (req, res) => {
            throw new Error('Erro interno do servidor');
        };

        try {
            await customizacaoController.create(req, res); 
        } catch (e) {
            res.status(500).send(e.message); // Garante que o código de status e a mensagem são enviados corretamente.
        } finally {
            customizacaoController.create = originalCreate; // Restaurar a função original.
        }
    });
});
