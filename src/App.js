import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

// 사용자 정의 태그 -> 컴퍼넌트
function Header(props) {
  console.log('props', props, props.title);
  return <header>
        <h1><a href="/" onClick={(event) => {
          event.preventDefault();   // 버튼 클릭 후 페이지가 리로드되는 것을 방지
          props.onChangeMode();
        }}>{props.title}</a></h1>
      </header>
}

function Nav(props) {
  const lis = []
  for(let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={(event) => {
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));
      }}>{t.title}</a>
      </li>)
  }
  return <nav>
  <ol>
    {lis}
  </ol>
</nav>
}

function Article(props) {
  return  <article>
  <h2>{props.title}</h2>
  {props.body}
</article>
}

function App() {
  // const _mode = useState('WELCOME');  //배열 구조, 0번째는 초기 state(WELCOME), 1번째는 state를 변경하기 위한 함수
  // const mode = _mode[0];
  // const setMode = _mode[1];
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  
  const topics = [
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'javascript', body:'javascript is ...'},
  ]
  let content = null;
  if(mode ==='WELCOME') {
    content = <Article title="Welcome" body="Hello, WEB"></Article>;
  }else if(mode === 'READ') {
    let title, body = null;
    for(let i = 0; i < topics.length; i++) {
      console.log(topics[i].id, id)
      if(topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>;
  }
  return (
    <div className="App">
      <Header title="WEB" onChangeMode={() => {
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id) => {
        setMode('READ');
        setId(_id);
      }}></Nav>
      {content}
    </div>
  );
}

export default App;

