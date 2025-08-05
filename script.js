/*
 * SCRIPT FINAL COM ESTRATÉGIA DE ENVIO ALTERNATIVA
 * Última atualização: 05/08/2025
 * Funcionalidade: Menu mobile e Geração de Link de Confirmação para WhatsApp.
 */
document.addEventListener('DOMContentLoaded', () => {
  // --- LÓGICA DO MENU NAVEGACIONAL ---
  const botaoMenu = document.querySelector('.menu-toggler');
  const listaDeLinks = document.querySelector('.nav-list');

  if (botaoMenu && listaDeLinks) {
    botaoMenu.addEventListener('click', () => {
      botaoMenu.classList.toggle('open');
      listaDeLinks.classList.toggle('active');
    });
  }

  // --- PROCESSAMENTO DE FORMULÁRIOS PARA WHATSAPP ---
  const numeroWhatsAppDestino = '5583999685451';
  const todosOsFormularios = document.querySelectorAll('form');

  const prepararLinkWhatsApp = (evento) => {
    // 1. Impede o recarregamento da página
    evento.preventDefault();

    const formulario = evento.target;
    let mensagemFormatada = '';

    // 2. Monta o título da mensagem
    const tituloDaSecao = formulario.closest('.elemento, #contato')?.querySelector('h3, h2')?.textContent.trim();
    mensagemFormatada += `*${tituloDaSecao || 'Contato pelo Site'}*\n\n`;

    const campos = formulario.elements;

    // 3. Percorre todos os campos para montar a mensagem
    for (let i = 0; i < campos.length; i++) {
      const campo = campos[i];
      if (!campo.id || campo.type === 'submit' || campo.type === 'button' || campo.type === 'reset') {
        continue;
      }
      if (campo.tagName === 'SELECT' && campo.value === 'selecione') {
        continue;
      }
      const labelDoCampo = formulario.querySelector(`label[for="${campo.id}"]`);
      if (labelDoCampo) {
        const textoDaLabel = labelDoCampo.textContent.trim();
        const valorDoCampo = campo.value.trim();
        mensagemFormatada += `*${textoDaLabel}*: ${valorDoCampo}\n`;
      }
    }

    // 4. Codifica a mensagem para o link
    const linkApiWhatsApp = `https://wa.me/${numeroWhatsAppDestino}?text=${encodeURIComponent(mensagemFormatada)}`;
    
    /*
     * NOVA ESTRATÉGIA DE ENVIO:
     * Em vez de window.open, vamos substituir o botão por um link de confirmação.
     * Isso evita bloqueios do navegador e bugs na comunicação com o App do WhatsApp.
     */
    const botaoSubmit = formulario.querySelector('button[type="submit"]');
    
    if (botaoSubmit) {
      // Cria um novo elemento de link <a>
      const linkDeConfirmacao = document.createElement('a');
      linkDeConfirmacao.href = linkApiWhatsApp;
      linkDeConfirmacao.target = '_blank';
      linkDeConfirmacao.textContent = '✅ MENSAGEM PRONTA! CLIQUE AQUI PARA ABRIR O WHATSAPP';
      
      // Aplica estilos para o novo link parecer um botão
      linkDeConfirmacao.style.display = 'inline-block';
      linkDeConfirmacao.style.padding = '0.7rem';
      linkDeConfirmacao.style.backgroundColor = '#25D366'; // Cor do WhatsApp
      linkDeConfirmacao.style.color = 'white';
      linkDeConfirmacao.style.textAlign = 'center';
      linkDeConfirmacao.style.textDecoration = 'none';
      linkDeConfirmacao.style.fontWeight = '500';
      linkDeConfirmacao.style.fontSize = '18px';
      linkDeConfirmacao.style.borderRadius = '0.4rem';
      linkDeConfirmacao.style.marginTop = '0.3rem';
      linkDeConfirmacao.style.border = '1px solid #25D366';

      // Substitui o botão antigo pelo novo link
      formulario.replaceChild(linkDeConfirmacao, botaoSubmit);
    }
  };

  // Associa a nova função de preparação do link a cada formulário
  todosOsFormularios.forEach(formulario => {
    formulario.addEventListener('submit', prepararLinkWhatsApp);
  });
});