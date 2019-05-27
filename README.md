# Desafio 3

Crie uma aplicação do zero e configura as ferramentas: ESLint, Reactotron, Babel Root Import e EditorConfig.

Nesse desafio você utilizará mapas para construir uma interface de cadastro de localização de usuários do Github, o processo é simples, ao pressionar o mapa, um modal será aberto com o campo para digitar um usuário do Github, ao clicar em “Salvar”, uma requisição à API do Github deve ser feita buscando dados como nome, avatar e bio do usuário e aparecer no mapa com seu avatar, ao clicar em cima do usuário no mapa, deve aparecer uma caixa em cima do usuário exibindo seu nome e bio.

A interface da aplicação será como a seguinte:

![Telas da aplicação](/assets/screens.png)

## Regras

- Você pode utilizar a biblioteca [React Native Maps](https://github.com/react-native-community/react-native-maps) para criar o mapa, siga os passos de instalação [aqui](#passos-de-instala%C3%A7%C3%A3o) ou diretamente da documentação da lib, [nesse link](https://github.com/react-native-community/react-native-maps/blob/master/docs/installation.md);
- A localização inicial do mapa deve ser: Latitude: -27.2177659 e Longitude: -49.6451598, a latitudeDelta deve ser 0.0042 e longitudeDelta 0.0031. Você pode alterar esse valores caso ache melhor.
- O modal para cadastro de localidade só deve ser aberto após o usuário manter pressionado o mapa algum tempo (não é um simples clique).
- A localização utilizada para cadastro deve ser a mesma que o usuário pressionou no mapa.
- Deve-se buscar o nome, bio e avatar do usuário no Github ao cadastrar.
- Ao clicar em cima do avatar do usuário no mapa deve-se exibir seu nome e bio em uma caixa branca, isso pode ser utilizando o recurso de [Callout](https://github.com/react-native-community/react-native-maps/blob/master/docs/callout.md).
- A requisição à API deve ser feita utilizando Redux Saga;

### Passos de instalação

Para instalar e configurar o `react-native-maps` você pode seguir os passos abaixo de cada plataforma:

Os primeiros passos, que são comuns entre ambas plataformas é a execução dos comandos abaixo:

```bash
yarn add react-native-maps
// ou npm install react-native-maps

react-native link react-native-maps
```

#### iOS

No iOS após o `link` não é necessária mais nenhuma configuração, visto que a lib `react-native-maps` utiliza o `Apple Maps` que vem por padrão no iOS.

#### Android

No Android siga os passos abaixo:

1. No arquivo `android/settings.gradle` verifique se há o trecho abaixo, se não houver, adicione:

```groovy
include ':react-native-maps'
project(':react-native-maps').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-maps/lib/android')
```

2. No arquivo `android/build.gradle`, depois da última linha, adicione o trecho abaixo:

```groovy
subprojects {
  project.configurations.all {
    resolutionStrategy.eachDependency { details ->
      if (details.requested.group == 'com.android.support'
      && !details.requested.name.contains('multidex') ) {
        details.useVersion "26.1.0"
      }
    }
  }
}
```

3. No arquivo `android/app/build.gradle` procure pelo trecho:

```groovy
...
dependencies {
  ...
  implementation project(':react-native-maps')
}
```

E substitua por:

```groovy
implementation(project(':react-native-maps')){
  exclude group: 'com.google.android.gms', module: 'play-services-base'
  exclude group: 'com.google.android.gms', module: 'play-services-maps'
}
implementation 'com.google.android.gms:play-services-base:16.1.0'
implementation 'com.google.android.gms:play-services-maps:16.1.0'
```

4. Abra o arquivo `android/app/src/main/AndroidManifest.xml` e adicione o trecho abaixo substituindo `Sua chave da API aqui` pela chave obtida do link das **[dicas abaixo](#dicas)**.

```xml
<application>
   <!-- Restante do conteúdo -->
   <meta-data
     android:name="com.google.android.geo.API_KEY"
     android:value="Sua chave da API aqui"/>
</application>
```

Nesse ponto a lib `react-native-maps` já está configurada e pronta para uso ;)

## Dicas

- Você irá precisar obter a Chave da API de Maps do Google, para fazer isso você pode ver [esse link](https://developers.google.com/maps/documentation/android-api/signup).
- Para personalizar a marcação no mapa com o avatar do usuário, é necessária a utilização de uma tag Image dentro da tag Marker do Maps.
- Para detectar um clique longo em cima do mapa é necessária a utilização da função [onLongPress](https://github.com/react-native-community/react-native-maps/blob/master/docs/mapview.md#events) do MapView;
- Para criar o Modal, utilize o componente [Modal](https://facebook.github.io/react-native/docs/modal.html) do React Native.

## Entrega

Esse desafio **não precisa ser entregue** e não receberá correção, mas você pode ver o resultado do código do desafio feito por mim aqui: https://github.com/Rocketseat/bootcamp-react-native-desafio-03

_PS.: Tente fazer o desafio sem olhar o código antes :)_

_PS2.: Após concluir o desafio, adicionar esse código ao seu Github é uma boa forma de demonstrar seus conhecimentos para oportunidades futuras :D_

Booooooora dev!!!

“Não espere resultados brilhantes se suas metas não forem claras”!
