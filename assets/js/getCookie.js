//Cria uma váriavel com o ID do usuário para ser utilizado em outras funções
var userID = getCookie('userID'); 
//Função para retornar cookie do usuário; pode ser utilizado para manter usuário logado e outros diversos cookies
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
