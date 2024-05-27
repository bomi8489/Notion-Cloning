import SideNavbar from "./sidebar/SideNavbar.js";
import DocumentEditPage from "./editor/DocumentEditPage.js";
import { initRouter } from "../route/router.js";
import { putDocument } from "../api/api.js";

export default function App({ parent, initialState }) {
  const sideNavbar = new SideNavbar({ parent, initialState });

  let timer = null;
  const documentEditPage = new DocumentEditPage({
    parent,
    initialState: {
      documentId: 'new',
      documents: {
        title: '',
        content: ''
      }
    },
    onEditing: async (editedDocument) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      
      timer = setTimeout(async () => {
        await putDocument(`/documents/${editedDocument.id}`, editedDocument.title, editedDocument.content);
        sideNavbar.setState();
      }, 1000)
    }
  })

  this.route = async () => {
    const { pathname } = window.location;

    if (pathname === '/') {
      parent.innerHTML =  '';
      sideNavbar.render();
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , documentId] = pathname.split('/');
      await sideNavbar.setState();
      documentEditPage.setState({ documentId });
    }
  }

  this.route();

  initRouter(() => {
    sideNavbar.setState();
    this.route();
  });
  window.addEventListener('popstate', () => this.route());
}
