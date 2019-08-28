import React, { useState } from 'react'
import { Jumbotron, Button, Badge } from 'react-bootstrap'

function Datagrid(props) {
    const [data, setData] = useState([])
    const [validar, setValidar] = useState(false)
    let info = {}
    

    async function fetchData() {
        const datos = await fetch('https://cors-anywhere.herokuapp.com/https://dev.tuten.cl/TutenREST/rest/user/contacto%40tuten.cl/bookings?current=true', {
            method: 'GET',
            headers: {
                'token': props.token,
                'app': 'APP_BCK',
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'adminemail': 'testapis@tuten.cl'
            }
        });
        info = await datos.json()
        setValidar(true)
        setData(info)
    }

    function handleClick() {
        fetchData()

    }
    function ordenarFilas(){
        let filaOrdenada = data.reverse()
        setData(filaOrdenada)
        console.log('ordenando')
    }


    
    if (validar === false) {
        return (
            <Jumbotron className='text-center mt-5'>
                <h1>Bienvenido!</h1>
                <Button variant="primary" onClick={handleClick}>Desplegar DataGrid</Button>
            </Jumbotron>
        )
    } else return (

        <div className='container mt-5'>
            <table className="table table-bordered table-light text-center p-3 table-striped">
                <thead>
                    <tr>
                        <th>BookingId <Badge variant='warning' onClick={ordenarFilas} >&#x02195;</Badge></th>
                        <th>Cliente </th>
                        <th>Fecha de Creacion</th>
                        <th>Direccion</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((dato) => {
                        return (
                            <tr key={dato.bookingId}>
                                <th>{dato.bookingId}</th>
                                <th>{dato.locationId.tutenUser.firstName} {dato.locationId.tutenUser.lastName}</th>
                                <th > {dato.bookingTime} </th>
                                <th>{dato.locationId.streetAddress}</th>
                                <th>{dato.bookingPrice}</th>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>

    )
}

export default Datagrid
