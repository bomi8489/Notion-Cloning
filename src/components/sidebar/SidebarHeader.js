import { push } from "../../route/router.js";

export default function SidebarHeader({ parent, closeSideNavbar, openSideNavbar }) {
  const sidebarHeader = document.createElement('div');
  sidebarHeader.id = 'sidebar-header';

  parent.appendChild(sidebarHeader);
  
  this.render = () => {
    sidebarHeader.innerHTML = `
      <div id="header-user-profile">
        <div>
          <img src="/src/images/profile.jpg" alt="profile" />
        </div>
        <div><b>기범</b>의 <b>Notion</b></div>
      </div>
      <div id="header-close">
        <div id="close-button">
          <<
        </div>
      </div>
      <div id = "header-open">
        <div id="open-button">
          >>
        </div>
      </div>
    `
  }

  this.render();

  parent.addEventListener('click', e => {
    const $headerButton = e.target.closest('#header-user-profile');
    const $closeSidebarButton = e.target.closest('#close-button');
    const $openSidebarButton = e.target.closest('#open-button');

    if ($headerButton) {
      push('/');
    }
    
    if ($closeSidebarButton) {
      closeSideNavbar();
    }

    if ($openSidebarButton) {
      openSideNavbar();
    }
  })
}
