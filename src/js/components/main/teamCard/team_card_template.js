import developers from './jsonTeam.js';
import svg from '../../../../images/symbol-defs.svg';

const renderLinks = (links, icons) => {
  const template = [];
  const socials = [
    svg + '#icon-github',
    svg + '#icon-telegram',
    svg + '#icon-linkedin',
  ];
  console.log(svg + '#icon-github');
  for (let i = 0; i < links.length; i++) {
    const link = `<li>
        <a
          class="team__link"
          href="${links[i]}"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg class="team__link-icon" width="32px" height="32px"><use href="${socials[i]}" ></use></svg>
        </a>
      </li>  `;
    template.push(link);
  }

  return `
    <ul class="team__link-list">
      ${template.join('')}
    </ul>
  `;
};

const teamCardsTemplate = () => `
        ${developers
          .map(
            ({ image, name, title, links, icons }) => `
        <li class="team__list-item">
          <div class="team__images">
            <img class="team__img"
              src="${image}" 
              alt="${name}"
            />
          </div>
          <div class="team__list-content">
            <h3 class="team__list-content-title">${name}</h3>
            <p class="team__list-content-text" lang="en">${title}</p>
            ${renderLinks(links, icons)} 
          </div>

        </li>`
          )
          .join('')}
      
      
`;

export default teamCardsTemplate;
