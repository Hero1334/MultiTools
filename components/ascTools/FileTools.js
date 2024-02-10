import * as FileSystem from 'expo-file-system'
export const writeData = async (file,content,callBack) => {
  const pastaCompartilhada = FileSystem.documentDirectory + 'data/';
  const nomeArquivo = file;
  const caminhoCompleto = pastaCompartilhada + nomeArquivo;
  try {
    // Verificar se a pasta existe
    const infoPasta = await FileSystem.getInfoAsync(pastaCompartilhada);
    if (!infoPasta.exists || !infoPasta.isDirectory) {
      // Se a pasta não existe, crie-a
      await FileSystem.makeDirectoryAsync(pastaCompartilhada, { intermediates: true });
    }
    // Agora você pode criar ou manipular o arquivo
    let dataContent = await FileSystem.readAsStringAsync(caminhoCompleto)
    if (typeof callBack == 'function') {
      const cbCalled = callBack(dataContent)
      if (cbCalled != undefined && cbCalled != dataContent) dataContent = cbCalled
    }
    await FileSystem.writeAsStringAsync(caminhoCompleto, content);
    return true;
  } catch (error) {
    console.error('Erro ao criar o arquivo:', error);
    return false;
  }
};
export const readData = async (file) => {
  const pastaCompartilhada = FileSystem.documentDirectory + 'data/';
  const nomeArquivo = file;
  const caminhoCompleto = pastaCompartilhada + nomeArquivo;
  
  const infoPasta = await FileSystem.getInfoAsync(pastaCompartilhada);
    if (!infoPasta.exists || !infoPasta.isDirectory) {
      // Se a pasta não existe, crie-a
      await FileSystem.makeDirectoryAsync(pastaCompartilhada, { intermediates: true });
    }
  try {
    const conteudo = await FileSystem.readAsStringAsync(caminhoCompleto);
    return conteudo;
  } catch (error) {
    console.error('Erro ao ler o arquivo:', error);
    return false;
  }
};