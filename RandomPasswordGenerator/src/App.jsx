import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [numbersAllowed, setNumbersAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')
  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    // useCallback caches a function and does not loads a function again and again while re rendering a page 
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
    if (numbersAllowed) {
      str += "0123456789"
    }

    if (charAllowed) {
      str += "!@#$%^&*()_+"
    }

    for (let i = 1; i < length; i++){
      const index = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(index)
    }

    setPassword(pass)
  }, [length, numbersAllowed, charAllowed ])
  //We pass the dependency array and in this we pass the elements which should re runs the functions (ignoring the cache) after any one of it is changed.

  useEffect(() => {
    generatePassword()
  }, [length, numbersAllowed, charAllowed])
  //with useEffect dependency array, we want things to re run again as soon as something changes

   const copyPasswordToClipboard = () => {
      window.navigator.clipboard.writeText(password)
      passwordRef.current?.select() 
   }

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-60 bg-gray-800 text-orange-500'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>

      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly 
          ref={passwordRef}
          />

          <button
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          >Copy</button>
      </div>

      <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => setlength(e.target.value)}
            name='' />
            <label htmlFor="length">Length: {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={numbersAllowed}
            onChange={() => {
              setNumbersAllowed((prev) => !prev)
            }} />
            <label htmlFor="number">Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev)
            }} />
            <label htmlFor="charInput">Character</label>
          </div>
      </div>
    </div>
  )
}

export default App
