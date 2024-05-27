import { getDocument, postDocument } from "../../api/api.js";
import { push } from "../../route/router.js";
import DocumentList from "./DocumentList.js";
import LinkButton from "../linkbutton/LinkButton.js";
import SidebarHeader from "./SidebarHeader.js";

export default function SideNavbar({ parent, initialState }) {
  const sideNavbar = document.createElement('div');
  sideNavbar.id = 'documents-page';
  
  new SidebarHeader({ 
    parent: sideNavbar,
    closeSideNavbar: () => {
      sideNavbar.style = 'transform: translateX(-281px)';
    },
    openSideNavbar: () => {
      sideNavbar.style = 'transform: translateX(0px)';
    }
  })

  const documentList = new DocumentList({
    parent: sideNavbar,
    initialState,
  })

  new LinkButton({
    $target: sideNavbar,
    initialState: {
      text: '+ 페이지 추가',
      id: 'add-document-button'
    },
    onClick: async () => {
      const { id } = await postDocument('/documents');
      push(`/documents/${id}`);
      this.setState();
    }
  })
  
  this.setState = async () => {
    const documents = await getDocument('/documents');

    documentList.setState(documents);
  }

  this.render = () => {
    parent.appendChild(sideNavbar);
  }

  this.render();
}
