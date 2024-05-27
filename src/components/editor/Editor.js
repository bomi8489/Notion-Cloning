export default function Editor({ 
  parent, 
  initialState,
  onEditing
}) {
  const editorElement = document.createElement('div');
  editorElement.id = 'editor-element-container';
  
  editorElement.innerHTML = `
    <div>
      <input id="editor-element-title" type="text" name="title" placeholder="제목 없음"/>
    </div>
    <div>
      <div name="content" contentEditable="true" placeholder="내용 작성"></div>
    </div>
  `

  parent.appendChild(editorElement);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    const richContent = (this.state.content || '')
      .split('\n')
      .map((line) => {
        if (line === "") return "";
        if (line.indexOf('# ') === 0) {
          return `<div><h1>${line.substring(2)}</h1></div>`;
        } else if (line.indexOf('## ') === 0) {
          return `<div><h2>${line.substring(3)}</h2></div>`;
        } else if (line.indexOf('### ') === 0) {
          return `<div><h3>${line.substring(4)}</h3></div>`;
        } else {
          line = `<div>${line}</div>`;
        }
        return line;
      }).join('');
    editorElement.querySelector('[name=title]').value = this.state.title;
    editorElement.querySelector('[name=content]').innerHTML = richContent;
    (this.state.conent || '').replace(/\n/g, '<br>');
  }
  this.render();

  editorElement.querySelector('[name=title]').addEventListener('keyup', (e) => {
    const nextState = {
      ...this.state,
      title: e.target.value
    }

    this.setState(nextState);
    onEditing(this.state);
  })

  editorElement.querySelector('[name=content]').addEventListener('keyup', (e) => {
    const nextState = {
      ...this.state,
      content: e.target.innerHTML
    }

    onEditing(nextState);
  })

  editorElement.querySelector('[name=content]').addEventListener('blur', (e) => {
    const nextState = {
      ...this.state,
      content: e.target.innerText
    }

    this.setState(nextState);
    onEditing(nextState);
  })
}
