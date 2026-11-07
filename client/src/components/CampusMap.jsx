import './CampusMap.css'
const blocks = [
  { id: 'A', x: 18, y: 28 },
  { id: 'B', x: 42, y: 28 },
  { id: 'C', x: 68, y: 28 },
  { id: 'D', x: 18, y: 62 },
  { id: 'E', x: 42, y: 62 },
  { id: 'F', x: 68, y: 62 },
]

export default function CampusMap({ buildings, onBuildingClick }) {
  return (
    <div className="campus-map">
      <div className="map-heading">
        <h2>FAST NUCES Lahore</h2>
        <p>Campus Directory · Blocks A–F</p>
      </div>

      <div className="map-entrance">MAIN CAMPUS ENTRANCE</div>

      <div className="map-road horizontal-road" />
      <div className="map-road vertical-road" />

      <div className="map-parking">PARKING</div>

      <div className="map-blocks">
        {blocks.map((block) => {
          const building = buildings.find(
            (item) =>
              item.name?.toUpperCase() === `BLOCK ${block.id}`
          )

          return (
            <button
              key={block.id}
              className="map-block"
              style={{
                left: `${block.x}%`,
                top: `${block.y}%`,
              }}
              disabled={!building}
              onClick={() => onBuildingClick(building._id)}
            >
              <strong>BLOCK {block.id}</strong>
              <span>
                {building ? 'View rooms →' : 'Data not added yet'}
              </span>
            </button>
          )
        })}
      </div>

      <div className="map-facilities">
        <span>LIBRARY</span>
        <span>CAFETERIA</span>
        <span>CIVIL ENGINEERING</span>
        <span>ELECTRICAL ENGINEERING</span>
        <span>SPORTS AREA</span>
      </div>

      <p className="map-disclaimer">
        Layout is a directory-style representation.
        Exact building positions require verification.
      </p>
    </div>
  )
}
