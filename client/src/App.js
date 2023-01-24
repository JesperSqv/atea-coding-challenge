import React, { useEffect, useState } from 'react'
import './App.css';

function App() {

  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>TUF-2000M sensor</h1>
          <tbody style={{border: "3px solid rgb(0, 0, 0)"}}>
            <tr style={{border: "3px solid rgb(0, 0, 0)"}}>
              <th style={{border: "3px solid rgb(0, 0, 0)"}}>Name</th>
              <th style={{border: "3px solid rgb(0, 0, 0)"}}>Value</th>
              <th style={{border: "3px solid rgb(0, 0, 0)"}}>Unit</th>
            </tr>
            {(typeof backendData.measurements === 'undefined') ? (
              <>
                <td>Loading…</td>
                <td>Loading…</td>
                <td>Loading…</td>
              </>
            ) : (
            backendData.measurements.map((item, index) => (
              <tr style={{border: "3px solid rgb(0, 0, 0)"}} key={index}>
                <td style={{border: "3px solid rgb(0, 0, 0)", textAlign: "start"}}>{item.title}</td>
                <td style={{border: "3px solid rgb(0, 0, 0)", textAlign: "end"}}>{item.data}</td>
                <td style={{border: "3px solid rgb(0, 0, 0)"}}>{item.unit}</td>
              </tr>
            )))}
          </tbody>
          <p>Made by Jesper Sundqvist 2023</p>
      </header>
    </div>
  );
}

export default App;
