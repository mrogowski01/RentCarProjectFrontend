import { useState } from 'react'
import axios from 'axios'

export function Create() {
  const types = ['OFFER', 'INFORMATION', 'JOB']
  const locations = [
    'DOLNOSLASKIE',
    'KUJAWSKO_POMORSKIE',
    'LUBELSKIE',
    'LUBUSKIE',
    'LODZKIE',
    'MALOPOLSKIE',
    'MAZOWIECKIE',
    'OPOLSKIE',
    'PODKARPACKIE',
    'PODLASKIE',
    'POMORSKIE',
    'SLASKIE',
    'SWIETOKRZYSKIE',
    'WARMIŃSKO_MAZURSKIE',
    'WIELKOPOLSKIE',
    'ZACHODNIOPOMORSKIE'
  ]
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('')
  const [location, setLocation] = useState('')

  const createAnnouncement = async () => {
    const currentDate = new Date()
    const userId = localStorage.getItem('id')
    const dataJson = JSON.stringify({
      user: { id: userId },
      title: title,
      description: description,
      type: type,
      location: location,
      createdAt: currentDate.toISOString()
    })

    try {
      const accessToken = localStorage.getItem('token')

      const res = await axios.post(
        (import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080') +
          '/api/announcements',
        dataJson,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        }
      )

      if (res) {
        console.log
        window.location.reload()
      }
    } catch (err) {
      alert('Wrong login or password!')
      console.log(err)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createAnnouncement()
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="grid gap-5 place-items-center ">
        <h1 className="text-[#bbd5d8] text-xl">Dodaj nowe ogłoszenie</h1>
        <div>
          <p>Tytuł</p>
          <input
            type="text"
            defaultValue={title}
            size={50}
            className="p-1.5"
            onChange={(e) => {
              setTitle(e.target.value)
            }}
            required
          ></input>
        </div>
        <div>
          <p>Opis</p>
          <textarea
            className="p-1.5"
            rows={10}
            cols={50}
            onChange={(e) => {
              setDescription(e.target.value)
            }}
            required
          ></textarea>
        </div>
        <div>
          <p>Typ</p>
          <select
            className="block w-[20rem] p-2.5"
            onChange={(e) => {
              setType(e.target.value)
            }}
            required
          >
            <option value="">---wybierz typ---</option>
            {types.map((t, index) => (
              <option key={index} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p>Lokalizacja</p>
          <select
            className="block w-[20rem] p-2.5"
            onChange={(e) => {
              setLocation(e.target.value)
            }}
            required
          >
            <option value="">---wybierz lokalizację---</option>
            {locations.map((t, index) => (
              <option key={index} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-[#bbd5d8] p-2.5 mb-10 rounded">
          Dodaj
        </button>
      </div>
    </form>
  )
}
