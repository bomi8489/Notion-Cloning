import Editor from "./Editor.js";
import LinkButton from "../linkbutton/LinkButton.js";
import { getDocument } from "../../api/api.js";
import { push } from "../../route/router.js";

export default function DocumentEditPage({ parent, initialState, onEditing }) {
  const page = document.createElement('div');
  page.id = 'document-edit-page';

  this.state = initialState;

  const editor = new Editor({
    parent: page,
    initialState,
    onEditing
  })

  this.setState = async (nextState) => {
    if (this.state.documentId !== nextState.documentId) {
      this.state = nextState;
      const { documentId } = this.state;
      const documents = await getDocument(`/documents/${documentId}`);

      this.setState({
        ...this.state,
        documents
      })

      return;
    }
    
    const documents = await getDocument(`/documents/${nextState.documentId}`);
    this.render();

    editor.setState(documents || {
      title: '',
      content: ''
    });
  }

  this.render = () => {
    parent.appendChild(page);
  }
  
  new LinkButton({
    $target: page,
    initialState: {
      text: '목록으로 이동',
      id: 'home-button'
    },
    onClick: () => {
      push('/');
    }
  })
}
