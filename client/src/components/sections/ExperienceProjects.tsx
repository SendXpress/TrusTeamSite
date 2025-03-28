import React, { useEffect, useState } from 'react';
import { constants } from '@/utils/constants'; // Importando o array de empresas
import { useTranslation } from 'react-i18next'; // Importando o hook de tradução

export function ExperienceProjects() {
  const { t } = useTranslation(); // Usando o hook useTranslation para obter as traduções
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 6;
  
  const projects = constants.projects; // Agora pegamos os projetos diretamente do arquivo de constantes

  const totalPages = Math.ceil(projects.length / itemsPerPage);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
    }, 3000); // Troca a cada 3 segundos

    return () => clearInterval(interval);
  }, [totalPages]);

  const nextPage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
  };

  return (
    <section id="experience" className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-10">
          {t('CustomerSuccessStories.experience_title')} {/* Usando a chave de tradução */}
        </h2>
        <p className="text-lg text-center text-gray-700 mb-8">
          {t('CustomerSuccessStories.experience_description')} {/* Usando a chave de tradução */}
        </p>
        <div className="grid-container">
          {projects.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage).map((project) => (
            <div key={project.id} className="project-item">
              <img src={project.logo} alt={project.name} />
              <p>{project.name}</p>
            </div>
          ))}
        </div>
        {/* Navegação */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={prevPage}
            className="text-gray-600 hover:text-gray-900 font-bold text-2xl flex items-center"
          >
            <span className="mr-2">&lt;</span> {/* Setinha para a esquerda */}
            {t('CustomerSuccessStories.previous')} {/* Usando a chave de tradução */}
          </button>
          <button
            onClick={nextPage}
            className="text-gray-600 hover:text-gray-900 font-bold text-2xl flex items-center"
          >
            {t('CustomerSuccessStories.next')} {/* Usando a chave de tradução */}
            <span className="ml-2">&gt;</span> {/* Setinha para a direita */}
          </button>
        </div>
      </div>
      <style jsx>{`
        .grid-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr); /* 3 colunas por linha */
          grid-template-rows: repeat(2, 200px); /* 2 linhas */
          gap: 16px;
        }
        .project-item {
          background: #fff;
          padding: 16px;
          text-align: center;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
        }
        .project-item img {
          width: 100%;
          max-width: 150px;
          margin-bottom: 8px;
        }
      `}</style>
    </section>
  );
}
