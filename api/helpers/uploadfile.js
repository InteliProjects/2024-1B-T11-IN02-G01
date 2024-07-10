const cloudinary = require("cloudinary").v2;
module.exports = {
  friendlyName: 'Uploadfile',
  description: 'Uploadfile something.',
  inputs: {
    req: {
      type: 'ref',
      required: true,
    },
    inputName:{
      type: 'string',
      required: true,
    }
  },
  exits: {
    success: {
      description: 'All done.',
    },
  },
  fn: async (inputs, exits) => {
    try {
      const { req , inputName} = inputs;

      const files = await new Promise((resolve, reject) => {
        req.file(inputName).upload((err, uploadedFiles) => {
          if (err) return reject(err);
          if (!uploadedFiles || uploadedFiles.length === 0) return reject(new Error("Arquivo é obrigatório"));
          resolve(uploadedFiles);
        });
      });
      const file = files[0];
      cloudinary.config({
        cloud_name: "dviandops",
        api_key: "579385778892255",
        api_secret: "LFBEDIGD_EGeLgESMZwSEz-BJBg",
      });
      const result = await cloudinary.uploader.upload(file.fd);
      return exits.success(result.url);
    } catch (err) {
      console.log(err);
      return exits.error(err.message);
    }
  }
};