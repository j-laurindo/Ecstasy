import React, { useState } from 'react';

// Este componente "empurra" o conteúdo abaixo dele
function BotaoComCollapse() {
  // 1. O mesmo estado de "aberto/fechado"
  const [isAberto, setIsAberto] = useState(false);

  // 2. A função de toggle
  const handleToggle = () => {
    setIsAberto(!isAberto);
  };

  return (
    // 3. Não precisamos mais de um 'wrapper' especial.
    // Usamos um Fragment (<>) ou um <div> simples.
    <>
      <button onClick={handleToggle} className='button'>
        {isAberto ? "Ocultar Conteúdo" : "Mostrar Conteúdo"}
      </button>

      {/* 4. Renderização Condicional */}
      {/* Quando 'isAberto' é true, este div é renderizado */}
      {isAberto && (
        // 5. Este div NÃO tem 'position: absolute'.
        // Ele age como um div normal e empurra o que vem depois.
        <div className='collapseContent'>
          <p>Este é o seu conteúdo "collapse".</p>
          <p>
            Ele está no fluxo normal do documento, por isso
            empurra qualquer componente que venha depois dele
            no código.
          </p>
        </div>
      )}
    </>
  );
};

export default BotaoComCollapse;