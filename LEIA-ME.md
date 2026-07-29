# Site Ana & Maria — como manter

Site estático (HTML + CSS + JS puro). Hospedado no GitHub Pages.
Endereço: https://useanaemaria.com.br

## Estrutura

```
index.html   → o site inteiro (estrutura, estilo e scripts)
CNAME        → domínio próprio (não apagar!)
robots.txt   → libera o Google a indexar
sitemap.xml  → mapa do site para o Google
img/         → todas as imagens
```

## Tarefas comuns

### Mudar o preço de uma coleção
Abra `index.html`, procure (Ctrl+F) o nome da coleção e ajuste o bloco:

```html
<div class="preco">
  <span class="valor"><small>R$</small>99,00</span>
  <span class="parcela">ou em até 3x de R$ 33,00 no cartão</span>
</div>
```

Lembre de recalcular o valor da parcela (preço ÷ 3).

### Trocar/adicionar foto de uma coleção
1. Salve a imagem em `img/` com nome descritivo e minúsculo,
   ex: `nome-da-colecao-frente.jpg` (sem acento, sem espaço)
2. No card da coleção, dentro de `<div class="trilho">`, adicione ou troque:

```html
<img src="img/arquivo.jpg" alt="Coleção X — frente" loading="lazy" draggable="false">
```

As setas e bolinhas do carrossel se ajustam sozinhas à quantidade de fotos.

### Adicionar uma coleção nova
Copie um `<article class="card reveal">` inteiro e ajuste:
- as fotos do `trilho`
- o `<h3>` (nome) e o `.verso` (frase)
- a `.desc` (descrição da peça)
- o `.preco`
- o link do WhatsApp (o texto após `?text=` precisa estar codificado para URL)
- o `data-tab` do botão de medidas: `uni`, `over`, `gola`, `capuz`, `fem`
  (pode combinar: `data-tab="uni,fem"`)

### Otimizar imagens antes de subir
Fotos direto do celular são grandes demais. Antes de subir, reduza para
760px de largura e qualidade ~72%. Alvo: menos de 100 KB por foto.

## Observações

- Preço no site é compromisso: se mudar na loja, atualize aqui no mesmo dia.
- Não apague o arquivo `CNAME` — sem ele o domínio próprio para de funcionar.
- Após publicar, se o navegador mostrar a versão antiga, use Ctrl+F5.
