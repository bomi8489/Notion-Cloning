export default function CreateDocumentList(title, id = null) {
  const $li = document.createElement('li');
  $li.id = 'list';
  if (id) {
    $li.setAttribute('data-id', id);
  }

  const $parentDocument = document.createElement('div');

  const $toggleAndTitle = document.createElement('div');

  const $toggleDocument = document.createElement('div');
  $toggleDocument.textContent = '>';
  $toggleDocument.id = 'toggle-child-document';

  const $documentTitle = document.createElement('div');
  $documentTitle.textContent = title;
  $documentTitle.id = 'document-title';

  $toggleAndTitle.appendChild($toggleDocument);
  $toggleAndTitle.appendChild($documentTitle);

  const $deleteAddButton = document.createElement('div');

  const $deleteButton = document.createElement('div');
  $deleteButton.textContent = 'x';
  $deleteButton.id = 'delete-document-button';

  const $addChildButton = document.createElement('div');
  $addChildButton.textContent = '+';
  $addChildButton.id = 'add-child-document-button';

  $deleteAddButton.appendChild($addChildButton);
  $deleteAddButton.appendChild($deleteButton);

  $parentDocument.appendChild($toggleAndTitle);
  $parentDocument.appendChild($deleteAddButton);

  const $childDocument = document.createElement('div');
  $childDocument.id = 'child-document';
  $childDocument.setAttribute('data-istoggled', false);

  $li.appendChild($parentDocument);
  $li.appendChild($childDocument);

  return { $li, $childDocument };
}
