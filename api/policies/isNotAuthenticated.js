/**
 * isNotAuthenticated
 *
 * Política para verificar se um usuário não está logado.
 */
module.exports = async function (req, res, proceed) {
    // Verifica se o cookie 'userID' está presente
    if (req.cookies.userID) {
      // Se o usuário estiver logado, responde com status proibido
      return res.forbidden('Você está logado.');
    }
    // Se o usuário não estiver logado, continua para a próxima política ou ação do controlador
    return proceed();
  };
  