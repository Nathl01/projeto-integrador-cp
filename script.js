function clearSelection() {
  const fileInput = document.getElementById('imageFile');
  fileInput.value = '';
}

console.log()

AWS.config.update({
  accessKeyId: 'AKIA3AI3AAPLXMYN4KVU',
  secretAccessKey: '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',
  region: 'us-west-2'  // Defina a região do seu bucket
});

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: 'projetointegradortest001/ProjInt/' }  // Nome do seu bucket
});

function uploadImage() {
  const fileInput = document.getElementById('imageFile');
  const file = fileInput.files[0];
  if (!file) {
    document.getElementById('status').innerText = 'Selecione uma imagem antes de enviar!';
      return;
}

const fileName = file.name;
const uploadParams = {
  Key: fileName,
  Body: file,
  ContentType: file.type
};

s3.upload(uploadParams, function(err, data) {
  if (err) {
    console.log("Erro ao fazer upload", err);
    document.getElementById('status').innerText = 'Erro ao enviar: ' + err.message;
  }
  console.log("Upload bem-sucedido", data);
  document.getElementById('status').innerHTML = 'Upload realizado com sucesso! <a href="' + data.Location + '" target="_blank">Ver imagem</a>';
  });
}

