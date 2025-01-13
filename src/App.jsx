import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [groupId, setGroupId] = useState(false);
  const [modList, setModList] = useState(null);
  function updateValue(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson)
    console.log(formJson.studList.split('\n').join(' '))
    listTransform(formJson.studList.split('\n').join(' '))
    setGroupId(formJson.groupId)
  }
  function listTransform(oldList) {
    setModList(oldList.split('трек').map((el)=>{ return el.split(' ').filter((el) => el != '' && isNaN(el)).slice(0,2).join(' ')})) 
  }
 function deleteStudent(ind) {
  setModList(modList.toSpliced(ind,1))
 }


  const resultingList = (modList === null) ? false : modList.map((el,ind) => {return <div><span className="result__list-el"onClick={() => deleteStudent(ind)}>{el}</span></div>}) ;
 
 
  return (
    <>
      <h1>Спискоделатель</h1>
      <div className='main-container'>
        <div className='form-container'>
          <form  onSubmit={updateValue} >
            <textarea name="studList" placeholder='Cкопируй сюда список из вкладки "ученики"' ></textarea>
            <input name="groupId" placeholder='id группы'></input>
            <button type="submit" >Тыц</button>
          </form>
        </div>
        <div className='result-container'>
        <div className='group-link'>https://backoffice.algoritmika.org/group/view/{groupId}</div>
        <h4>Отправляю список ребят, которые еще не подключились к уроку. Мы вас ждем: 
        </h4>
        {resultingList}
        </div>
      </div>
    </>
  )
}

export default App
