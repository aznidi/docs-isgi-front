import React from 'react'

function ContentDoc({ document }) {
  return (
    <>
        <div
            className="prose "
            dangerouslySetInnerHTML={{ __html: document.content }}
            >
        </div>
    </>
  )
}

export default ContentDoc
