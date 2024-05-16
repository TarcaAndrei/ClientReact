import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import * as React from "react";
import './Excursie.css'
// import closeButton from './close-button.png'
import closeButton from './close.png'


function Excursie(props){
    const[obiectiv_turistic, setObiectiv]=useState("");
    const[firma_transport, setFirma]=useState("");
    const[pret, setPret]=useState();
    const[id, setId]=useState(props.idExcursie);
    const[ora_plecarii, setOra]=useState();
    const[numar_locuri_disponibile, setLocuri]=useState();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetch("http://127.0.0.1:8000/mpp/excursie/" + id + "/")
            .then(res => res.json())
            .then(result => {
                setLocuri(result.numar_locuri_disponibile);
                setFirma(result.firma_transport);
                setPret(result.pret);
                setObiectiv(result.obiectiv_turistic);
                setOra(result.ora_plecarii)
            })
    }, []);

    const validate = () => {
        let tempErrors = {};
        tempErrors.obiectiv_turistic = obiectiv_turistic ? "" : "Introdu Obiectivul Turistic!";
        tempErrors.firma_transport = firma_transport ? "" : "Introdu Firma Transport!";
        tempErrors.pret = pret && pret > 0 ? "" : "Pretul trebuie sa fie un numar pozitiv!";
        tempErrors.ora_plecarii = ora_plecarii ? "" : "Selecteaza Ora Plecarii!";
        tempErrors.numar_locuri_disponibile = numar_locuri_disponibile && numar_locuri_disponibile >= 0 ? "" : "Numar Locuri Disponibile trebuie sa fie un numar pozitiv!";
        setErrors(tempErrors);
        // Return true if there are no errors
        return Object.values(tempErrors).every(x => x === "");
    };

    const handleSave=(e)=>{
        e.preventDefault();
        if(validate()) {
            const excursie = {obiectiv_turistic, firma_transport, pret, ora_plecarii, numar_locuri_disponibile};
            fetch("http://127.0.0.1:8000/mpp/excursii/", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(excursie)
                }
            ).then(response => {
                if (!response.ok) {
                    alert("Nu o mers!");
                }
                props.onClose();
            });
        }
    }

    const handleUpdate=(e)=>{
        e.preventDefault();
        if(validate()) {
            const excursie = {obiectiv_turistic, firma_transport, pret, ora_plecarii, numar_locuri_disponibile};
            fetch("http://127.0.0.1:8000/mpp/excursie/" + id + "/", {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(excursie)
                }
            ).then(response => {
                if (!response.ok) {
                    alert("Nu o mers!");
                }
                props.onClose();
            });
        }
    }

    return (
        // <Box
        //     component="form"
        //     sx={{
        //         '& > :not(style)': { m: 1, width: 'auto' },
        //     }}
        //     noValidate
        //     autoComplete="off"
        // >
            <div className="container_excursie">
                <img src={closeButton} alt="Close button" className="close" onClick={props.onClose}></img>
                <TextField className="field" id="obiectiv-save" label="Obiectiv Turistic" variant="outlined" InputLabelProps={{shrink: true,}} error={!!errors.obiectiv_turistic} helperText={errors.obiectiv_turistic} value={obiectiv_turistic} InputProps={{readOnly: props.view,}} onChange={(e) => setObiectiv(e.target.value)} sx={{ padding: '10px', width: '300px'}} />
                <TextField className="field" id="firma-save" label="Firma Transport" variant="outlined" InputLabelProps={{shrink: true,}} error={!!errors.firma_transport} helperText={errors.firma_transport} value={firma_transport} InputProps={{readOnly: props.view,}} onChange={(e) => setFirma(e.target.value)} sx={{ padding: '10px', width: '300px' }} />
                <TextField className="field" id="pret-save" label="Pret" variant="outlined" type="number" InputLabelProps={{shrink: true,}} error={!!errors.pret} helperText={errors.pret} value={pret} InputProps={{readOnly: props.view,}} onChange={(e) => setPret(e.target.value)} sx={{ padding: '10px', width: '300px' }} />
                <TextField className="field" id="ora-save" label="Ora Plecarii" variant="outlined" type="time" InputLabelProps={{shrink: true,}} error={!!errors.ora_plecarii} helperText={errors.ora_plecarii} InputProps={{readOnly: props.view,}} value={ora_plecarii} onChange={(e) => setOra(e.target.value)} sx={{ padding: '10px', width: '300px' }} />
                <TextField className="field" id="numarlocuri-save" label="Numar Locuri Disponibile" variant="outlined" type="number" error={!!errors.numar_locuri_disponibile} helperText={errors.numar_locuri_disponibile} InputLabelProps={{ shrink: true,}} InputProps={{readOnly: props.view,}} value={numar_locuri_disponibile} onChange={(e) => setLocuri(e.target.value)} sx={{ padding: '10px' , width: '300px'}} />
                <br/>

                <div className="cntbttns">
                {props.idExcursie === -1 && <Button onClick={handleSave}>Save</Button>}
                {!props.view && props.idExcursie !== -1 && <Button onClick={handleUpdate}>Update</Button>}
                </div>
            </div>
        // </Box>
    )

}

export default Excursie;