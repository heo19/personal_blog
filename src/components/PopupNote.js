import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import './PopupNote.css'

function PopupNote(props) {
    const [titleValue, setTitleValue] = useState("");

    const handleTitleChange = (event) => {
        setTitleValue(event.target.value);
    };

    const [noteValue, setNoteValue] = useState("");

    const handleNoteChange = (event) => {
        setNoteValue(event.target.value);
    };

    useEffect(() => {
        console.log("useEffectCalled");
        console.log("titleValue: " + props.titleText);
        console.log("noteValue: " + props.noteText);
        setTitleValue(props.titleText);
        setNoteValue(props.noteText);
    }, [props.trigger]);

    function onSave() {
        console.log("SaveClicked!");
        console.log("titleValue: " + titleValue);
        console.log("noteValue: " + noteValue);
        props.onClose(false);
        props.onSave(titleValue, noteValue);
        setTitleValue("");
        setNoteValue("");
    }

    function onCloseButton() {
        props.onClose(false);
        setTitleValue("");
        setNoteValue("");
    }

    return (props.trigger) ? (
        <div className="editPage">
            <div className="innerEditPage">
                <div className="editPageTitle">
                    <input className="titleInput" value={titleValue} onChange={handleTitleChange}></input>
                    <div className="saveButton">
                        <p className="saveText" onClick={onSave}>SAVE</p>
                    </div>
                    <div className="closeButton" onClick={onCloseButton}>
                        <p className="closeText">X</p>
                    </div>
                </div>
                <div className="editInnerNoteText">
                    <textarea className="noteInput" value={noteValue} onChange={handleNoteChange}></textarea>
                </div>
            </div>
        </div>
    ) : "";
}

export default PopupNote