const formulario = document.getElementById('nova-receita-form');
formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    const imagem = document.getElementById('imagem').value
    const nomeReceitaInput = document.getElementById('nome-receita').value;
    const ingredientesInput = document.getElementById('minhaTextarea').value.replace(/\n/g, '<br>');
    const modoPreparoInput = document.getElementById('minhaTextarea').value.replace(/\n/g, '<br>');
    const Dica= document.getElementById('Dica').value.replace(/\n/g, '<br>');
    const rendimento = document.getElementById('Rendimento').value
    const tempoCozimentoInput = document.getElementById('tempo-cozimento').value;
    console.log(modoPreparoInput); // Exibe o texto formatado no console (você pode enviar para o servidor aqui)
    console.log(ingredientesInput); // Exibe o texto formatado no console (você pode enviar para o servidor aqui)
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Impede a quebra de linha padrão
      const textarea = event.target;
      const posicaoCursor = textarea.selectionStart; // Obtém a posição do cursor
      const conteudoAntes = textarea.value.substring(0, posicaoCursor);
      const conteudoDepois = textarea.value.substring(posicaoCursor);
      textarea.value = conteudoAntes + "\n" + conteudoDepois; // Insere a quebra de linha
  }
   
    const novaPagina = `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="Estilo.css" />
        <title>receita adicionada</title>
    </head>
    <body>
     <script>
      alert("Nova receita adicionada");
    </script>
    
    <header class="Cabeca">
      <div class="logo">
        <img style="border-radius: 100%" src="imagens/logo5.jpg" alt="logo" />
      </div>
      <nav>
        <ul class="lita_menu">
          <li><a href="receitas.html">Receitas</a></li>
          <li><a href="Adicionar.html">Adicionar Receitas</a></li>
           <li><a href="cadastro.html">Fazer Login ou cadastro</a></li>
        </ul>
      </nav>
    </header>



    <br /><br /><br /><br /><br /><br />
    <div class="tudo">
      <div class="container">
      <img src="${imagem}" alt="imagem">
      <h3><font size="5">${nomeReceitaInput}</font></h3><br />
      <h4><font size="4">Ingredientes</font></h4>
      <p><font size="3"> ${ingredientesInput}</font></p><br />
      <h4><font size="4">Modo de preparo</font></h4>
      <p> <font size="3">${modoPreparoInput}</font></p><br />
      <h4><font size="4">Dica:</font></h4>
      <p> <font size="3">Dica:${Dica}</font></p><br />
      <h4><font size="4">Rendimento</font></h4>
      <p> <font size="3">${rendimento}</font></p><br>
      <h4><font size="4">Tempo de cozimento</font></h4>
      <p><font size="3"> ${tempoCozimentoInput}</font></p>
      
<br><br>
 </div>
      </div>
      <div class="curtidas">
  <button onclick="curtir()">Curtir 👍</button>
  <button onclick="naoCurtir()">Não Curtir 👎</button>
  <p>Curtidas: <span id="curtidas">0</span></p>
  <p>Não Curtidas: <span id="naoCurtidas">0</span></p>
</div>

<button onclick="location.href='Adicionar.html'">Editar Receita</button>
<div class="comentario">
  <h1>Faça seu comentario</h1>
<form id="commentForm">
  <label for="username">Seu nome:</label><br>
  <input type="text" id="username" name="username" required><br><br>
  <label for="comment">Seu comentário:</label><br>
  <textarea id="comment" name="comment" rows="4" required></textarea><br><br>
  <button type="submit">Comentar</button>
</form>
<h1>Comentários Feitos</h1>
<div class="comment-list" id="commentList">
  <!-- Comentários serão adicionados dinamicamente aqui -->
</div>
      <div class="fim">
        <img src="imagens/logo5.jpg" alt="Logo" />
        <p>Um site com as melhores receitas que te permite explorar <br> e esperimentar diversos sabores de dar água na boca </p>
        </p>
      </div>
     
    </body>
    </html>
`;

// Abre a nova página em uma nova aba
const novaAba = window.open('', '_blank');
novaAba.document.write(novaPagina);
    });


    let show = true;
    const menuContent = document.querySelector('.Cabeca');
    const menuToggle = menuContent.querySelector('.me-toggle');
    
    menuToggle.addEventListener('click', () => {
      menuContent.classList.toggle('on', show);
      show = !show;
    });
























    
  document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('comment-form');
    const commentList = document.getElementById('comment-list');

    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const comment = document.getElementById('comment').value;

        if (name.trim() === '' || comment.trim() === '') {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const commentData = {
            name: name,
            comment: comment,
            timestamp: new Date().toLocaleString()
        };

        // Adiciona o comentário à lista
        addComment(commentData);

        // Limpa o formulário
        document.getElementById('name').value = '';
        document.getElementById('comment').value = '';

        // Salva os comentários no localStorage
        saveComments();
    });

    // Função para adicionar um comentário à lista
    function addComment(commentData) {
        const commentItem = document.createElement('li');
        commentItem.classList.add('comment');
        commentItem.innerHTML = `
            <strong>${commentData.name}</strong> disse:
            <p>${commentData.comment}</p>
            <span>${commentData.timestamp}</span>
            <button class="delete-btn">Excluir</button>
        `;
        commentList.appendChild(commentItem);

        // Adiciona evento de clique para o botão de exclusão
        const deleteBtn = commentItem.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function() {
            deleteComment(commentItem);
        });
    }

    // Função para deletar um comentário da lista e do localStorage
    function deleteComment(commentItem) {
        commentItem.remove();
        saveComments(); // Salva novamente os comentários após a remoção
    }

    // Função para salvar os comentários no localStorage
    function saveComments() {
        const comments = document.querySelectorAll('.comment');
        const commentsArray = Array.from(comments).map(comment => comment.innerHTML);
        localStorage.setItem('comments', JSON.stringify(commentsArray));
    }

    // Função para carregar os comentários salvos do localStorage
    function loadComments() {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.forEach(commentHTML => {
            const commentItem = document.createElement('li');
            commentItem.classList.add('comment');
            commentItem.innerHTML = commentHTML;
            commentList.appendChild(commentItem);

            // Adiciona evento de clique para o botão de exclusão
            const deleteBtn = commentItem.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', function() {
                deleteComment(commentItem);
            });
        });
    }

    // Carrega os comentários salvos ao carregar a página
    loadComments();
});











  // Funções para manipular os botões de curtir e não curtir
  function curtir() {
      // Incrementa o contador de curtidas
      let curtidas = parseInt(localStorage.getItem('curtidas')) || 0;
      curtidas++;
      localStorage.setItem('curtidas', curtidas);
      atualizarCurtidas();
  }
  
  function naoCurtir() {
      // Incrementa o contador de não curtidas
      let naoCurtidas = parseInt(localStorage.getItem('naoCurtidas')) || 0;
      naoCurtidas++;
      localStorage.setItem('naoCurtidas', naoCurtidas);
      atualizarNaoCurtidas();
  }
  
  // Função para atualizar a exibição de curtidas
  function atualizarCurtidas() {
      let curtidas = parseInt(localStorage.getItem('curtidas')) || 0;
      document.getElementById('curtidas').textContent = curtidas;
  }
  
  // Função para atualizar a exibição de não curtidas
  function atualizarNaoCurtidas() {
      let naoCurtidas = parseInt(localStorage.getItem('naoCurtidas')) || 0;
      document.getElementById('naoCurtidas').textContent = naoCurtidas;
  }
  
 
  














//Script para area de edição de receitas
        // scripts.js
document.addEventListener('DOMContentLoaded', function() {
    const editButton = document.getElementById('edit-button');
    const editForm = document.getElementById('edit-form');
    const recipeContent = document.getElementById('recipe-content');
    const cancelButton = document.getElementById('cancel-edit');
    const recipeForm = document.getElementById('recipe-form');

    editButton.addEventListener('click', function() {
        // Mostra o formulário de edição e esconde o conteúdo da receita
        editForm.classList.remove('hidden');
        recipeContent.classList.add('hidden');

    });

    cancelButton.addEventListener('click', function() {
        // Esconde o formulário de edição e mostra o conteúdo da receita
        editForm.classList.add('hidden');
        recipeContent.classList.remove('hidden');
    });

    recipeForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Atualiza os elementos da receita com os dados do formulário
        const recipeImage = document.getElementById('recipe-image').value;
        const recipeName = document.getElementById('recipe-name').value;
        const recipeIngredients = document.getElementById('recipe-ingredients').value;
        const recipeInstructions = document.getElementById('recipe-instructions').value;
        const recipeTips = document.getElementById('recipe-tips').value;
        const recipeYield = document.getElementById('recipe-yield').value;
        const recipePrepTime = document.getElementById('recipe-preptime').value;

        // Atualiza o conteúdo da receita
        document.getElementById('recipe-image').src = recipeImage;
        document.getElementById('recipe-name').textContent = recipeName;
        // Atualize outros elementos da receita conforme necessário...

        // Esconde o formulário de edição e mostra o conteúdo da receita
        editForm.classList.add('hidden');
        recipeContent.classList.remove('hidden');
    });
});

    
 // { name: 'Salada de Verão', category: 'entrada', prepTime: 15, link: 'exe.html' },
  //{ name: 'Strogonoff de Frango', category: 'prato_principal', prepTime: 30, link: 'exe.html' },