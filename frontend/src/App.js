import React, { useState, useEffect } from 'react'
import axios from "axios"


const MusicEvents = (props) => {
  const [musicEvents, setMusicEvents] = useState([])
  const [pages, setPages] = useState(1)
  const [headerNextPage, setHeaderNextPage] = useState(null)
  const [headerPrevPage, setHeaderPrevPage] = useState(null)

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'http://localhost:3001/musicevents',
      params: {
        page: pages
      }
    }
    const getMusicEvents = () => {
       axios.request(options)
        .then((response) => {
          setHeaderNextPage(response.data.meta.next)
          setHeaderPrevPage(response.data.meta.previous)
          setMusicEvents(response.data)
        }
        ).catch((error) => {
          console.log(error)
        })
    }
    getMusicEvents();
    if(musicEvents.data !== undefined) {
      for (let step = 0; step < musicEvents.data.length; step++) {
        console.log(step)
      }
    }
   
    window.scrollTo(0, 0)
    
  }, [pages])

  if (musicEvents.length === 0) {
    return <div>Ei näytettävää</div>
  }
  else {
    return (
      <div>
        <ol style={{ textAlign: "center", listStyle: 'none' }}>
          <h1>Helsingin tapahtumat</h1>
          <h2>Musiikkitapahtumat</h2>
          {musicEvents.data.map(musicEvent => <ol style={{ textAlign: "center", listStyle: 'none' }}><MusicEventImage musicEventImage={musicEvent.images} /> <MusicEventName musicEventID={musicEvent.id} musicEventName={musicEvent} />
          <MusicEventStartingTime startingTime={musicEvent.start_time} /> <MusicEventDistrict location={musicEvent.location} /> <MusicEventStreetAddress address={musicEvent.location} /> />
          </ol>)} <PrevButton headerPrevPage={headerPrevPage} pages={pages} setPages={setPages} /> <NextButton headerNextPage={headerNextPage} pages={pages} setPages={setPages} /></ol>
      </div>
    )
  }
}

const PrevButton = (props) => {
  const headerPrevPage = props.headerPrevPage
  const setPages = props.setPages
  const pages = props.pages
  if (headerPrevPage != null) {
    return (
      <button onClick={() => { if (headerPrevPage !== null) { setPages(pages - 1) } }}>edellinen</button>
    )
  }
}

const NextButton = (props) => {
  const headerNextPage = props.headerNextPage
  const setPages = props.setPages
  const pages = props.pages
  if (headerNextPage != null) {
    return (
      <button onClick={() => { if (headerNextPage !== null) { setPages(pages + 1) } }}>seuraava</button>
    )
  }
}
const MusicEventName = (props) => {
  const musicEventID = props.musicEventID
  const musicEventName = props.musicEventName
  if (musicEventName !== null && musicEventName.name !== null && musicEventName.name.fi !== null) {
  return (
    <li key={musicEventID} style={{ fontSize: 25, fontWeight: 'bold' }}>{musicEventName.name.fi}</li>
  )
}
return (
  <li></li>
)
}
const MusicEventDistrict = (props) => {
  const location = props.location
  if (location.divisions[1] !== undefined && location.divisions[1].name.fi !== null) {
    return (
      <li style={{ fontSize: 22, fontWeight: 'bold' }}>{location.divisions[1].name.fi}</li>
    )
  }
  return (
    <li></li>
  )
}

const MusicEventStreetAddress = (props) => {
  const address = props.address
  if (address.street_address !== undefined && address.street_address !== null) {
    return (
      <li style={{ fontSize: 22, fontWeight: 'bold' }}>{address.street_address.fi}</li>
    )
  }
  return (
    <li></li>
  )

}


const MusicEventStartingTime = (props) => {
  const startingTime = props.startingTime
  if (startingTime !== null) {
    const localDateString = new Date(startingTime).toLocaleDateString('fi')
    const localTimeString = new Date(startingTime).toLocaleTimeString('fi')
    return (
      <li style={{ fontSize: 22, fontWeight: 'bold' }} >{localDateString} {localTimeString}</li>
    )
  }
  return (
    <li style={{ fontSize: 22, fontWeight: 'bold' }}>Ei aloitusaikaa</li>
  )
}
const MusicEventShortDescription = (props) => {
  const musicShortDescription = props.musicEventShortDescription
  if (musicShortDescription !== null && musicShortDescription.fi !== null) {
    return (
      <li style={{ fontSize: 22 }}>{musicShortDescription.fi}</li>
    )
  }
  else {
    return <li>Ei kuvaustatietoa</li>
  }

}
const MusicEventImage = (props) => {
  const musicEventImage = props.musicEventImage
  if (musicEventImage[0] !== undefined && musicEventImage[0] !== null) {
    return (
      <img src={musicEventImage[0].url} alt="Ei näytettävää kuvaa" style={{ objectFit: 'contain' }} />
    )
  }
}

const App = () => {

  return (
    <div>
      <MusicEvents />

    </div>
  )
}
export default App;
