import React, { useContext, useEffect, useState } from 'react'

import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/authContext';
import axios from 'axios';
import { BASE_URL } from '../helpers/url';
import { getConfig } from '../helpers/config';

const Home = () => {
    const { token, loggedin, reqUser, setReqUser, setLoggedIn } = useContext(AuthContext);
    const [sectors, setSectors] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedin == false) navigate('/login');

        const fetchSectors = async () => {
            const response = await axios.get(`${BASE_URL}/sectors`, getConfig(token));
            setSectors(response.data.data);
        }
        if (token) {
            fetchSectors()
        }
    }, [loggedin])


    const bookHandler = async (e, id) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${BASE_URL}/parking/${id}/start`, {}, getConfig(token));
            const updatedPlace = response.data.data;
            const updatedSector = [...sectors];
            const sector = updatedSector.find(sector => sector.id == updatedPlace.sector.id);
            sector.places = sector.places.map((place) => place.id == updatedPlace.id ? { ...place, ...updatedPlace } : place)
            setSectors(updatedSector)
        } catch (error) {
            console.error('error');
        }

    }

    const endHandler = async (e, id) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${BASE_URL}/parking/${id}/end`, {}, getConfig(token));
            const updatedPlace = response.data.data;
            const updatedSector = [...sectors];
            const sector = updatedSector.find(sector => sector.id == updatedPlace.sector.id);
            sector.places = sector.places.map((place) => place.id == updatedPlace.id ? { ...place, ...updatedPlace } : place)
            setSectors(updatedSector)
        } catch (error) {
            console.error('error');
        }
    }


    return (<>
        <div className="container">
            <div className='row mt-3'>
                {sectors?.map((sector) => (
                    <div className='col-md-4 text-center' key={sector.id}>
                        <div className="card">
                            <div className="card-body">
                                <h4>
                                    {sector.name} Sector
                                </h4>
                                <p>
                                    ${sector.hourly_price} per hour
                                </p>
                                <div className="my-2">
                                    {sector.places?.map((place) => (
                                        <div className="card my-2" key={place.id}>
                                            <div className="card-header">
                                                {place.name}
                                            </div>
                                            <div className="card-body" >
                                                <p>
                                                    Place Status : {place.available == 1 ? 'Available' : 'Not Available'}
                                                </p>
                                            </div>
                                            <div className="card-footer">
                                                {
                                                    place.available == 1 ? (<button onClick={(e) => bookHandler(e, place.id)} className="btn btn-primary">
                                                        Book Now
                                                    </button>) : (<>
                                                        {
                                                            place.user_id == reqUser.id ? (<button onClick={(e) => endHandler(e, place.id)} className="btn btn-primary">
                                                                End Now
                                                            </button>) : (<button className="btn btn-primary">
                                                                Not Now
                                                            </button>)
                                                        }</>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    </>)
}

export default Home