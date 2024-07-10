const emailFormatting = require('../../../api/helpers/emailformating'); // Ajusta o caminho conforme necessário

// Grupo de testes para verificar se a função converte emails válidos para minúsculas
describe('Verifica se converte emails válidos para minúsculas', () => {
    
    // Teste específico para verificar se converte um email válido para letras minúsculas
    it('Deve converter um email válido para letras minúsculas', async () => {
        
        // Arrange: Importa o módulo chai e deconstructs o assert
        const chai = await import('chai');
        const { assert } = chai;

        // Arrange: Define o email para verificar
        const emailParaVerificar = 'TeSt@ExAmPlE.com';
        
        // Act: Chama a função emailFormatting com o email fornecido
        const emailConvertido = await emailFormatting.fn({ email: emailParaVerificar });

        // Assert: Verifica se o email convertido está em letras minúsculas
        assert.equal(emailConvertido, 'test@example.com');
    });
});

// Grupo de testes para verificar se a função retorna uma mensagem de email inválido
describe('Retorna mensagem de email inválido', () => {
    
    // Teste específico para verificar o comportamento com um email inválido
    it('Deve lançar um erro para um email inválido', async () => {
        
        // Arrange: Importa o módulo chai e deconstructs o assert
        const chai = await import('chai');
        const { assert } = chai;

        // Arrange: Define o email inválido para verificar
        const emailParaVerificar = 'invalid-email';
        
        try {
            // Act: Chama a função emailFormatting com o email inválido
            const emailConvertido = await emailFormatting.fn({ email: emailParaVerificar });
        } catch (err) {
            // Assert: Verifica se a mensagem de erro é 'Email Inválido'
            assert.equal(err.message, 'Email Inválido');
        }
    });

    // Teste específico para verificar o comportamento com um email vazio
    it('Deve lançar um erro para um email vazio', async () => {
        
        // Arrange: Importa o módulo chai e deconstructs o assert
        const chai = await import('chai');
        const { assert } = chai;

        // Arrange: Define o email vazio para verificar
        const emailParaVerificar = '';
        
        try {
            // Act: Chama a função emailFormatting com o email vazio
            const emailConvertido = await emailFormatting.fn({ email: emailParaVerificar });
        } catch (err) {
            // Assert: Verifica se a mensagem de erro é 'Email Inválido'
            assert.equal(err.message, 'Email Inválido');
        }
    });

    // Teste específico para verificar o comportamento com ausência de input de email
    it('Deve lançar um erro para ausência de input de email', async () => {
        
        // Arrange: Importa o módulo chai e deconstructs o assert
        const chai = await import('chai');
        const { assert } = chai;

        // Arrange: Define um objeto vazio como input
        const input = {};
        
        try {
            // Act: Chama a função emailFormatting com o input vazio
            const emailConvertido = await emailFormatting.fn(input);
        } catch (err) {
            // Assert: Verifica se a mensagem de erro é 'Email Inválido'
            assert.equal(err.message, 'Email Inválido');
        }
    });
});
