import * as React from 'react';
import Button from '@mui/material/Button';
import {useEffect, useState} from "react";
import Excursie from "./Excursie";
import './MainApp.css';

function MainApp() {

    const [showComponent, setShowComponent] = useState(false);

    const[view, setView]=useState(true);
    const[idView, setIdView]=useState(-1);

    const[excursii, setExcursii]=useState([]);

    const handleSave=(e)=>{
        e.preventDefault();
        setIdView(-1);
        setView(false)
        setShowComponent(true);
    }

    const refreshPage=()=>{
        fetch("http://127.0.0.1:8000/mpp/excursii/")
            .then(res=>res.json())
            .then((result)=>{setExcursii(result);})
    }

    useEffect(refreshPage);


    const handleView=(e, id)=>{
        e.preventDefault();
        setView(true)
        setIdView(id);
        setShowComponent(true);
    }

    const handleUpdate=(e, id)=>{
        e.preventDefault();
        setView(false)
        setIdView(id);
        setShowComponent(true);
    }

    const handleDelete=(e, id)=>{
        e.preventDefault();
        fetch("http://127.0.0.1:8000/mpp/excursie/" + id + "/",{
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                // body:JSON.stringify(excursie)
            }
        ).then(response => {
            if (!response.ok) {
                alert("Nu o mers!");
            }
            refreshPage();
            // props.onClose();
        });
    }


    return (
        <>
        <div className="container">
            <div className="btnctn">
            <Button onClick={(e)=>handleSave(e)}>Adauga Excursie Noua</Button>
            </div>
            <div className="grid">
                {excursii.map(excursie=>(
                    <div className="item" id={excursie.id}>
                        <p>{excursie.obiectiv_turistic}</p>
                        <Button id={excursie.id} onClick={(e)=>handleView(e, excursie.id)}>View</Button>
                        <Button onClick={(e)=>handleUpdate(e, excursie.id)}>Update</Button>
                        <Button onClick={(e) =>handleDelete(e, excursie.id)}>Delete</Button>
                    </div>
                ))}
            </div>
        </div>
            { showComponent &&
        <div className="popup">
            <Excursie idExcursie={idView} view={view} onClose={()=>{setShowComponent(false); refreshPage();}}/>
        </div>
            }
        </>
    );
}

export default MainApp;