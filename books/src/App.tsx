import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BookTable from './components/BookTable'
import Form from './components/Form'
function App() {
  return (
    <div className='container'>
      <BookTable></BookTable>
      <Form></Form>
    </div>
  )
}

export default App
