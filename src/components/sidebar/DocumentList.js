import CreateDocumentList from "./CreateDocumentList.js";
import { deleteDocument, getDocument, postDocument } from "../../api/api.js";
import { push } from "../../route/router.js";

export default function DocumentList({
  parent, 
  initialState,
}) {
  const documentListElement = document.createElement('div');
  const $ul = document.createElement('ul');
  documentListElement.id = 'document-list';
  
  parent.appendChild(documentListElement);
  documentListElement.appendChild($ul);

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  const getDocumentList = ( target, currentDom ) => {
    currentDom?.forEach(({ title, documents, id }) => {
      const { $li, $childDocument } = CreateDocumentList(title, id);
      const isChildDocuments = documents.length > 0;

      target.appendChild($li);

      if (isChildDocuments) {
        getDocumentList($childDocument, documents);
      } else {
        const noneChildDocument = $li.childNodes[1];
        noneChildDocument.innerHTML = '<div style="opacity: 0.7">하위 페이지 없음</div>';
      }
    })
  }

  this.render = () => {
    $ul.innerHTML = '';
    getDocumentList($ul, this.state);
  }

  this.render();

  const renderLowerDocument = (target) => {
    const parentDocument = target.closest('li');
    const childDocuments = parentDocument.childNodes[1];
    
    if (childDocuments.dataset.istoggled === "true") {
      childDocuments.setAttribute('data-isToggled', false);
    } else {
      childDocuments.setAttribute('data-isToggled', true);
    }
  
    if (childDocuments.dataset.istoggled === "true") {
      childDocuments.style = 'display: flex; flex-direction: column;';
      target.style = 'rotate: 90deg;';
    } else {
      childDocuments.style = 'display: none';
      target.style = 'rotate: 0deg;';
    }
  }
  
  parent.addEventListener('click', async (e) => {
    const $toggleChildDocument = e.target.closest('#toggle-child-document');
    const $documentTitle = e.target.closest('#document-title');
    const $deleteButton = e.target.closest('#delete-document-button');
    const $addChildDocumentButton = e.target.closest('#add-child-document-button');
    
    if ($documentTitle) {
      push(`/documents/${e.target.closest('li').dataset.id}`);
    } else if ($deleteButton) {
      const { id } = e.target.closest('li').dataset;
      if (window.location.pathname.split('/').at(-1) === id) {
        await deleteDocument(`/documents/${id}`);
        push('/');
      } else {
        await deleteDocument(`/documents/${id}`);
        this.setState(await getDocument('/documents'));
      }
    } else if ($addChildDocumentButton) {
      const { id } = await postDocument('/documents', e.target.closest('li').dataset.id);
      push(`/documents/${id}`);
      this.setState(await getDocument('/documents'));
    }

    if ($toggleChildDocument) {
      renderLowerDocument(e.target);
    }
  })
}
