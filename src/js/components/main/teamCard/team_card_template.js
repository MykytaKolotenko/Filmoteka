import developers from './jsonTeam.js'

import pic from '../../../../images/no-thumb_300.jpg'
import nik from '../../../../images/team/nikita.jpg'
import andy from '../../../../images/team/andy.jpg'
import yana from '../../../../images/team/yana.jpg'
import dim from '../../../../images/team/dima.jpg'
import alexk from '../../../../images/team/alex_k.jpg'
import alex from '../../../../images/team/alex.jpg'
import sofia from '../../../../images/team/sofia.jpg'
import alexs from '../../../../images/team/alex_s.jpg'
import mykola from '../../../../images/team/kolya.jpg'
import slava from '../../../../images/team/slava.jpg'

import git from '../../../../images/icons_link/github.svg'
import tel from '../../../../images/icons_link/telegram.svg'
import lin from '../../../../images/icons_link/linkedin.svg'



const renderLinks =  links => {
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
            class="team__link-icon"
            src="${git}"
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
            <img class="img_team"
              src="${developer.image}" 
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
console.log(teamCardsTemplate());

export default teamCardsTemplate
  

