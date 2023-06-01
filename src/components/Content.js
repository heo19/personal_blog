import React from 'react'
import './Content.css'

function Content(props) {

  return (
    <div className="invisibleBox">
        <div className = "contentBox" >
          <div className="contentTitle">
            <p className = "contentTitleText">{props.titleText}</p>
            <span className="editButton">
              <p className="editText">EDIT</p>
            </span>
            <span className="deleteButton" onClick={props.onDelete}>
              <p className="deleteText">X</p>
            </span>
          </div>
          <div className="postNote">
            <p className="previewNote">{props.noteText}</p>
          </div>

        </div>
      </div>
  )
}

export default Content