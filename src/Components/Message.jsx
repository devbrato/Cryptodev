import React from 'react'

function Message({ error, success }) {
  return (
    <div>
          {error && <p className="error" style={{ color: 'red' }}>{error}</p> }
          {success && <p className="success" style={{ color: 'green' }}>{success}</p>}
    </div>
  )
}

export default Message