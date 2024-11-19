import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';

/**
* Este arquivo é somente para web e usado para configurar o HTML raiz para cada página da web durante a renderização estática.
* O conteúdo desta função só é executado em ambientes Node.js e não tem acesso ao DOM ou APIs do navegador.
*/
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        {/*
          Desabilite a rolagem do corpo na web. Isso faz com que os componentes ScrollView funcionem mais próximos de como funcionam no nativo.
          No entanto, a rolagem do corpo geralmente é boa para a web móvel. Se você quiser habilitá-la, remova esta linha.
        */}
        <ScrollViewStyleReset />

        {/* Usando estilos CSS brutos como uma saída de emergência para garantir que a cor de fundo nunca pisque no modo escuro. */}
        <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} />
        {/* Adicione quaisquer elementos <head> adicionais que você deseja disponibilizar globalmente na web... */}
      </head>
      <body>{children}</body>
    </html>
  );
}

const responsiveBackground = `
body {
  background-color: #fff;
}
@media (prefers-color-scheme: dark) {
  body {
    background-color: #000;
  }
}`;
