const nameFormatting = require('../../../api/helpers/nameformating'); // Ajusta o caminho conforme necessário

// Grupo de testes para verificar se a função formata nomes válidos corretamente
describe('Verifica se formata nomes válidos corretamente', () => {
    
    // Teste específico para verificar se retorna o nome válido sem modificações
    it('Deve retornar o nome válido sem modificações', async () => {
        
        // Arrange: Importa o módulo chai e deconstructs o assert
        const chai = await import('chai');
        const { assert } = chai;

        // Arrange: Define o nome para verificar
        const nomeParaVerificar = 'João da Silva';
        
        // Act: Chama a função nameFormatting com o nome fornecido
        const nomeFormatado = await nameFormatting.fn({ nome: nomeParaVerificar });

        // Assert: Verifica se o nome formatado é igual ao nome fornecido
        assert.equal(nomeFormatado, 'João da Silva');
    });
});

// Grupo de testes para verificar se a função retorna uma mensagem de nome inválido
describe('Retorna mensagem de nome inválido', () => {
    
    // Teste específico para verificar o comportamento com um nome que contém caracteres inválidos
    it('Deve lançar um erro para um nome com caracteres inválidos', async () => {
        
        // Arrange: Importa o módulo chai e deconstructs o assert
        const chai = await import('chai');
        const { assert } = chai;

        // Arrange: Define o nome inválido para verificar
        const nomeParaVerificar = 'João da Silva 123';
        
        try {
            // Act: Chama a função nameFormatting com o nome inválido
            const nomeFormatado = await nameFormatting.fn({ nome: nomeParaVerificar });
        } catch (err) {
            // Assert: Verifica se a mensagem de erro é 'Nome com caracteres inválidos'
            assert.equal(err.message, 'Nome com caracteres inválidos');
        }
    });

    // Teste específico para verificar o comportamento com um nome vazio
    it('Deve lançar um erro para um nome vazio', async () => {
        
        // Arrange: Importa o módulo chai e deconstructs o assert
        const chai = await import('chai');
        const { assert } = chai;

        // Arrange: Define o nome vazio para verificar
        const nomeParaVerificar = '';
        
        try {
            // Act: Chama a função nameFormatting com o nome vazio
            const nomeFormatado = await nameFormatting.fn({ nome: nomeParaVerificar });
        } catch (err) {
            // Assert: Verifica se a mensagem de erro é 'Nome com caracteres inválidos'
            assert.equal(err.message, 'Nome com caracteres inválidos');
        }
    });

    // Teste específico para verificar o comportamento com ausência de input de nome
    it('Deve lançar um erro para ausência de input de nome', async () => {
        
        // Arrange: Importa o módulo chai e deconstructs o assert
        const chai = await import('chai');
        const { assert } = chai;

        // Arrange: Define um objeto vazio como input
        const input = {};
        
        try {
            // Act: Chama a função nameFormatting com o input vazio
            const nomeFormatado = await nameFormatting.fn(input);
        } catch (err) {
            // Assert: Verifica se a mensagem de erro é 'Nome com caracteres inválidos'
            assert.equal(err.message, 'Nome com caracteres inválidos');
        }
    });
});
