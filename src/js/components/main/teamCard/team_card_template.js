import developers from './jsonTeam.js'
import pic from '../../../../images/no-thumb_300.jpg'

const renderLinks = (links) => {
  return `
    <ul class="team__link-list">
      ${links.map(link => `
      <li>
        <a
          class="team__link"
          href="${link}"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img 
            class="team__icon"
            src="${pic}"
            alt="GitHub" width="30" height="30"
          /> 
        </a>
      </li>
      `).join('')}
    </ul>
  `;
}

const  teamCardsTemplate = () => `
        ${developers.map(developer => `
        <li class="team__list-item">
          <div class="img-team">
            <img
              src="${pic}" 
              alt="${developer.name}"
            />
          </div>
          <div class="team__list-content">
            <h3 class="team__list-content-title">${developer.name}</h3>
            <p class="team__list-content-text" lang="en">${developer.title}</p>
            ${renderLinks(developer.links)} 
          </div>

        </li>`).join('')}
      
      
`; 


  export default teamCardsTemplate