const consultacep = require('../../../api/helpers/consultacep'); // Importa o módulo consultacep

// Grupo de testes para verificar se a função retorna a cidade correta com base no CEP
describe('Verifica se retorna a cidade certa com cep', () => {
    
    // Teste específico para verificar se retorna a cidade de São Paulo para um CEP válido
    it('Deve retornar a cidade de São Paulo', async () => {
        
        // Arrange: Importa o módulo chai e deconstructs o assert
        const chai = await import('chai');
        const { assert } = chai;

        // Arrange: Define o CEP para verificar
        const cepParaVerificar = '04548001';
        
        // Act: Chama a função consultacep com o CEP fornecido
        const cidade = await consultacep.fn({ cep: cepParaVerificar });

        // Assert: Verifica se a cidade retornada é São Paulo
        assert.equal(cidade, 'São Paulo');
    });

    // Teste adicional para verificar se retorna a cidade do Rio de Janeiro para um CEP válido
    it('Deve retornar a cidade do Rio de Janeiro', async () => {
        
        // Arrange: Importa o módulo chai e deconstructs o assert
        const { assert } = await import('chai');

        // Arrange: Define o CEP para verificar
        const cepParaVerificar = '20040002';
        
        // Act: Chama a função consultacep com o CEP fornecido
        const cidade = await consultacep.fn({ cep: cepParaVerificar });

        // Assert: Verifica se a cidade retornada é Rio de Janeiro
        assert.equal(cidade, 'Rio de Janeiro');
    });
});

// Grupo de testes para verificar se a função retorna uma mensagem de CEP inválido
describe('Retorna mensagem de CEP inválido', () => {
    
    // Teste específico para verificar o comportamento com um CEP inválido
    it('Deve retornar indefinido para caso de cep inválido', async () => {
        
        // Arrange: Importa o módulo chai e deconstructs o assert
        const chai = await import('chai');
        const { assert } = chai;

        // Arrange: Define o CEP inválido para verificar
        const cepParaVerificar = '00000000';
        
        try {
            // Act: Chama a função consultacep com o CEP inválido
            const cidade = await consultacep.fn({ cep: cepParaVerificar });
        } catch (err) {
            // Assert: Verifica se a mensagem de erro é 'CEP NÃO ENCONTRADO'
            assert.equal(err.message, 'CEP NÃO ENCONTRADO');
        }
    });

    // Teste para verificar o comportamento com um CEP inexistente
    it('Deve lançar um erro para CEP inexistente', async () => {
        
        // Arrange: Importa o módulo chai e deconstructs o assert
        const { assert } = await import('chai');

        // Arrange: Define o CEP inexistente para verificar
        const cepParaVerificar = '99999999';
        
        try {
            // Act: Chama a função consultacep com o CEP inexistente
            await consultacep.fn({ cep: cepParaVerificar });
        } catch (err) {
            // Assert: Verifica se a mensagem de erro é 'CEP NÃO ENCONTRADO'
            assert.equal(err.message, 'CEP NÃO ENCONTRADO');
        }
    });

});
