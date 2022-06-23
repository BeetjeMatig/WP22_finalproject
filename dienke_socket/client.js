//client side
// implementation from https://jaygould.co.uk/2020-10-24-big-data-pt-2-socket-progress-bar/
//nmp i socket.io-client

import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';

const thisSessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 9);

function Dashboard() {
    const [uploadProgress, setUploadProgress] = useState(null);

    useEffect(() => {
        const socket = io('http://localhost:5555/api');
        socket.emit('connectInit', thisSessionId);
        socket.on('uploadProgress', (data) => {
            setUploadProgress(data);
        });
    }, []);


    return (
    <div>
        {uploadProgress ? (
            <div className={css.progress-bar}>
                <div
                    className={css.progress-bar__completed}
                    style={{width: `${uploadProgress.percentage}%`}}
                    >
                    <div className={css.progress-bar__display}>
                        {uploadProgress ? uploadProgress.display : null}
                        </div>
                    </div>
                <div className={css.progress-bar__display}>
                    {uploadProgress.percentage === 0 ? uploadProgress.display : null}
                </div>
            </div>
        ) : null}
    </div>
    )
}