import './App.css';
import { useEffect } from 'react';
import { useState } from 'react';
import Content from './components/Content';
import DummyContent from './components/DummyContent';
import PopupNote from './components/PopupNote';
import { current } from '@reduxjs/toolkit';

function App() {
    let [numberOfNote, setNumberOfNote] = useState(0);
        
    let [postNoteInfoSet, setPostNoteInfoSet] = useState([]);
    let [editPopup, setEditPopup] = useState(false);
    let [currentValueSet, setCurrentValueSet] = useState({
        key: 0,
        titleText: "",
        noteText: "",
    })

    var dummySetsStart = [];
    var numInRow = Math.floor(window.innerWidth / 320);
    var numDummyNeed = ((postNoteInfoSet.length + 1) % numInRow);
    if (numDummyNeed !== 0) {
        numDummyNeed = numInRow - numDummyNeed;
    }
    for (var j = 0; j < numDummyNeed; j++) {
        dummySetsStart.push(j);
    }

    let [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        // Event handler function
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Attach event listener to window resize event
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        console.log("current key: " + currentValueSet.key);
        console.log("current title: " + currentValueSet.titleText);
        console.log("current note: " + currentValueSet.noteText);
    }, [currentValueSet]);

    function addNote() {
        console.log("Add Note Clicked");
        setNumberOfNote(++numberOfNote);
        
        const postNoteInfo = {
            key: Date.now(),
            titleText: "Title " + numberOfNote,
            isExist: true,
            noteText: "This is a Text in the Post Note" + numberOfNote,
        }
        setPostNoteInfoSet(prevInfos => [...prevInfos, postNoteInfo]);
    }

    function deleteNote(noteKey){
        console.log("Delete Note Clicked");
        setPostNoteInfoSet(prevInfos => prevInfos.filter(postNoteInfoSet => postNoteInfoSet.key !== noteKey));
        setNumberOfNote(--numberOfNote);
    }

    function editNote(titleText, noteText, noteKey){
        console.log("Edit Note Clicked");
        setCurrentValueSet(editCurrentValueSet(noteKey, titleText, noteText));
        setEditPopup(true);
    }

    function saveNote(titleText, noteText){
        for(var i = 0; i < postNoteInfoSet.length; i++){
            if(postNoteInfoSet[i].key == currentValueSet.key){
                console.log("NoteFound");
                postNoteInfoSet[i].titleText = titleText;
                postNoteInfoSet[i].noteText = noteText;
            }
        }
        
        setCurrentValueSet(editCurrentValueSet(0, "", ""));
        console.log("current value:" + currentValueSet.key + currentValueSet.titleText + currentValueSet.noteText)
        setPostNoteInfoSet(prevInfos => [...prevInfos]);
    }

    function editCurrentValueSet(key, titleText, noteText){
        const newSet = {
            key: key,
            titleText: titleText,
            noteText: noteText,
        }

        return newSet;
    }

    return (
        <div className="App">
            <div className="topBar">
                <h4 className="blogTitle">Hyeonwoo's Personal Blog</h4>
            </div>

            <div className="invisibleBox">
                <div className="addNoteButton" onClick={addNote}></div>
            </div>

            {postNoteInfoSet.map((postNoteInfo) => {
                return (
                    <Content key={postNoteInfo.key}
                        titleText={postNoteInfo.titleText}
                        isExist={postNoteInfo.isExist}
                        noteText={postNoteInfo.noteText}
                        onDelete={() => deleteNote(postNoteInfo.key)}
                        onEdit={() => editNote(postNoteInfo.titleText, postNoteInfo.noteText, postNoteInfo.key)}
                    />
                );
            })}

            {dummySetsStart.map((index) => {
                return <DummyContent key={index}></DummyContent>
            })}

            <PopupNote
                trigger={editPopup}
                onClose={setEditPopup}
                onSave={saveNote}
                titleText={currentValueSet.titleText}
                noteText={currentValueSet.noteText}
            ></PopupNote>
        </div>
    );
}

export default App;
