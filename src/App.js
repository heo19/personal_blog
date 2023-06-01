import './App.css';
import { useEffect } from 'react';
import { useState } from 'react';
import Content from './components/Content';
import DummyContent from './components/DummyContent';
//import PopupNote from './components/PopupNote';

function App() {
    let [numberOfNote, setNumberOfNote] = useState(0);
        
    let [postNoteInfoSet, setPostNoteInfoSet] = useState([]);

    var dummySetsStart = [];
    var numInRow = Math.floor(window.innerWidth / 320);
    var numDummyNeed = ((postNoteInfoSet.length + 1) % numInRow);
    if (numDummyNeed !== 0) {
        numDummyNeed = numInRow - numDummyNeed;
    }
    console.log("Num Dummy Need: " + numDummyNeed);
    for (var j = 0; j < numDummyNeed; j++) {
        dummySetsStart.push(j);
    }

    let [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        // Event handler function
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            console.log('Window width:', windowWidth);
        };

        // Attach event listener to window resize event
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function addNote() {
        console.log("Add Note Clicked");
        setNumberOfNote(++numberOfNote);
        
        const postNoteInfo = {
            key: Date.now(),
            titleText: "Title " + numberOfNote,
            isExist: true,
            noteText: "This is a Text in the Post Note",
        }
        setPostNoteInfoSet(prevInfos => [...prevInfos, postNoteInfo]);
    }

    function deleteNote(noteKey){
        console.log("Delete Note Clicked");
        setPostNoteInfoSet(prevInfos => prevInfos.filter(postNoteInfoSet => postNoteInfoSet.key !== noteKey))
        setNumberOfNote(--numberOfNote);
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
                    />
                );
            })}

            {dummySetsStart.map((index) => {
                return <DummyContent key={index}></DummyContent>
            })}
        </div>
    );
}

export default App;
