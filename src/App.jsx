import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [groupId, setGroupId] = useState('');
  const [modList, setModList] = useState(null);
  const [showGroupLink, setShowGroupLink] = useState(false);
  const [copyAnimation, setCopyAnimation] = useState(false);
  const [buttonText, setButtonText] = useState('Копи');

  const headerText = 'Отправляю список учеников, которые еще не подключились к уроку. Мы вас ждем:';
  const groupLink = `https://backoffice.algoritmika.org/group/view/${groupId}`;

  function updateValue(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson)
-   console.log(formJson.studList.split('\n').join(' '))
    listTransform(formJson.studList.split('\n').join(' '))
    setGroupId(formJson.groupId)
  }

  function listTransform(oldList) {
    setModList(oldList.split('трек').map((el)=>{ return el.split(' ').filter((el) => el != '' && isNaN(el)).slice(0,2).join(' ')})) 
  }

  function deleteStudent(ind) {
    setModList(modList.toSpliced(ind,1))
  }

  function copyToClipboard() {
    if (!modList) return;
    
    let textToCopy = `${headerText}\n\n`;
    
    if (showGroupLink && groupId) {
      textToCopy += `${groupLink}\n\n`;
    }
    
    textToCopy += modList.join('\n');
    
    navigator.clipboard.writeText(textToCopy);
    setCopyAnimation(true);
    setButtonText('Мэч');
    
    setTimeout(() => {
      setCopyAnimation(false);
      setButtonText('Копи');
    }, 2000);
  }

  const resultingList = (modList === null) 
    ? false 
    : modList.map((el,ind) => {return <div><span className="result__list-el"onClick={() => deleteStudent(ind)}>{el}</span></div>}) ;
 
  return (
    <>
      <h1>Спискоделатель</h1>
      <div className='main-container'>
        <div className='form-container'>
          <form onSubmit={updateValue}>
            <textarea name="studList" placeholder='Cкопируй сюда список из вкладки "ученики"' ></textarea>
            <div className="input-group">
              <input 
                name="groupId" 
                placeholder='id группы'
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
              />
              <label>
                <input type="checkbox" onChange={(e) => setShowGroupLink(e.target.checked)} />
                Показать ссылку
              </label>
            </div>
            <button type="submit">Тыц</button>
          </form>
        </div>
        <div className='result-container'>
          {modList && (
            <button 
              className={`copy-button ${copyAnimation ? 'copy-animation' : ''}`}
              onClick={copyToClipboard}
            >
              {buttonText}
            </button>
          )}
          {showGroupLink && groupId && <div className='group-link'>{groupLink}</div>}
          <h4>{headerText}</h4>
          {resultingList}
        </div>
      </div>
    </>
  )
}

export default App
