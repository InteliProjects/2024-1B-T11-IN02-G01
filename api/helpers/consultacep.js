module.exports = {


  friendlyName: 'Consulta cep',


  description: '',


  inputs: {
    cep: {
      type: 'string',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },

//Cria uma função para conseguir a cidade do usuário a partir do CEP
  fn: async function (inputs) {
    try {
      console.log(inputs.cep);
      const response = await fetch(`https://viacep.com.br/ws/${inputs.cep}/json/`);
      //Depois de discutir com o grupo, decidimos utilizar esta API por dois principais motivos: A API já verifica se o usuário cadastra um endereço válido e,
      //Principalmente, o serviço já retorna a cidade do Usuário, sem precisar que nós tenhamos uma lista com todas as cidades do país na nossa solução. Isso nos salva
      //tempo de desenvolvimento e evita possíveis erros de lógica que poderiam ocorrer.
      const data = await response.json();
      console.log(data);
      return data.localidade;
    } catch (err) {
      throw new Error(err.message);
    }
  }

};

