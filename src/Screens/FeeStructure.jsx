import React from 'react'
import MediaCard from '../Components/MediaCard'

const FeeStructure = () => {
  return (
    <>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }} >
        <MediaCard className="Class 1" fees="7000" />
        <MediaCard className="Class 2" fees="9000" />
        <MediaCard className="Class 3" fees="11000" />
        <MediaCard className="Class 4" fees="13000" />
        <MediaCard className="Class 5" fees="15000" />
        <MediaCard className="Class 6" fees="17000" />
        <MediaCard className="Class 7" fees="20000" />
        <MediaCard className="Class 8" fees="22000" />
        <MediaCard className="Class 9" fees="25000" />
        <MediaCard className="Class 10" fees="28000" />
      </div>
    </>
  )
}

export default FeeStructure